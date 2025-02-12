#!/usr/bin/env python3

# Standard library imports
from flask import request, jsonify, session
from flask_restful import Api, Resource
from sqlalchemy.exc import IntegrityError
from datetime import datetime

# Local imports
from config import app, db, api
from models import User, Pet, Favorite, AdoptionForm

# Helper function to find a user by ID
def find_user_by_id(id):
    return User.query.get(id)

# Root route to verify the server is running
@app.route('/api')
def index():
    return '<h1>Project Server</h1>'

# Retrieve all users (excluding password hashes for security)
@app.get('/api/users')
def all_users():
    users = User.query.all()
    users_json = [user.to_dict(rules=("-password_hash",)) for user in users]
    return jsonify(users_json), 200

# Retrieve a specific user by ID
@app.get('/api/users/<int:id>')
def user_by_id(id):
    user = find_user_by_id(id)
    if user:
        return jsonify(user.to_dict(rules=("-password_hash",))), 200
    return jsonify({'error': 'User not found'}), 404

# Create a new user (password is hashed using Flask-Bcrypt)
@app.post('/api/users')
def create_user():
    try:
        body = request.get_json()
        new_user = User(
            name=body.get('name'),
            email=body.get('email'),
            age=body.get('age')
        )
        new_user.password = body.get('password')  # Uses the password setter
        db.session.add(new_user)
        db.session.commit()
        
        # Store user session after successful signup
        session['user_id'] = new_user.id

        return jsonify(new_user.to_dict(rules=("-password_hash",))), 201
    except IntegrityError:
        db.session.rollback()
        return jsonify({'error': 'User with this email or name already exists'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 400

# Login route - validates user and starts a session
@app.post('/api/login')
def login():
    body = request.get_json()
    user = User.query.filter_by(email=body.get('email')).first()

    if user and user.authenticate(body.get('password')):
        session['user_id'] = user.id  # Store user ID in session
        return jsonify(user.to_dict(rules=("-password_hash",))), 200

    return jsonify({'error': 'Invalid credentials'}), 401

# Logout route - clears session
@app.delete('/api/logout')
def logout():
    session.pop('user_id', None)  # Remove user session
    return {}, 204  # No content response

# Retrieve the current logged-in user
@app.get("/api/session")
def get_session():
    user_id = session.get("user_id")
    if user_id:
        user = User.query.get(user_id)
        return jsonify(user.to_dict(rules=("-password_hash",))), 200
    return jsonify({"error": "Unauthorized"}), 401

# Create a new favorite pet for a user
@app.post('/api/favorites')
def create_favorite():
    try:
        body = request.get_json()
        new_favorite = Favorite(
            user_id=body.get('user_id'),
            pet_id=body.get('pet_id')
        )
        db.session.add(new_favorite)
        db.session.commit()
        return jsonify(new_favorite.to_dict()), 201
    except Exception:
        return jsonify({'error': 'Invalid request'}), 400

# Delete a favorite pet from a user's list
@app.delete('/api/favorites/<int:id>')
def delete_favorite(id):
    favorite = Favorite.query.get(id)
    if favorite:
        db.session.delete(favorite)
        db.session.commit()
        return {}, 204  # No content response
    return jsonify({'error': 'Favorite not found'}), 404

# Retrieve all pets
@app.get('/api/pets')
def all_pets():
    pets = Pet.query.all()
    pets_json = [pet.to_dict() for pet in pets]
    return jsonify(pets_json), 200

# Retrieve a pet by ID
@app.get('/api/pets/<int:id>')
def pet_by_id(id):
    pet = Pet.query.get(id)
    if pet:
        return jsonify(pet.to_dict()), 200
    return jsonify({'error': 'Pet not found'}), 404

# Create a new pet (Only admin can add pets)
@app.post('/api/pets')
def create_pet():
    user_id = session.get('user_id')  # Get logged-in user from session
    user = User.query.get(user_id)

    if not user or not user.is_admin:
        return jsonify({'error': 'Only the admin can add pets'}), 403

    try:
        body = request.get_json()
        new_pet = Pet(
            name=body.get('name'),
            age=body.get('age'),
            animal_type=body.get('animal_type'),
            breed=body.get('breed'),
            img_url=body.get('img_url'),
            adoption_status=body.get('adoption_status')
        )
        db.session.add(new_pet)
        db.session.commit()
        return jsonify(new_pet.to_dict()), 201
    except Exception:
        return jsonify({'error': 'Invalid request'}), 400

# Delete a pet (Only admin can delete pets)
@app.delete('/api/pets/<int:id>')
def delete_pet(id):
    user_id = session.get('user_id')  # Get logged-in user
    user = User.query.get(user_id)

    if not user or not user.is_admin:
        return jsonify({'error': 'Only the admin can delete pets'}), 403

    pet = Pet.query.get(id)
    if pet:
        db.session.delete(pet)
        db.session.commit()
        return {}, 204
    return jsonify({'error': 'Pet not found'}), 404

# Retrieve the list of all adoption forms
@app.get('/api/adoption_forms')
def all_adoption_forms():
    adoption_forms = AdoptionForm.query.all()
    adoption_forms_json = [adoption_form.to_dict() for adoption_form in adoption_forms]
    return jsonify(adoption_forms_json), 200

# Retrieve a specific adoption form by ID
@app.get('/api/adoption_forms/<int:id>')
def adoption_form_by_id(id):
    adoption_form = AdoptionForm.query.get(id)
    if adoption_form:
        return jsonify(adoption_form.to_dict()), 200
    return jsonify({'error': 'Form not found'}), 404

# Create a new adoption form
@app.post('/api/adoption_forms')
def create_adoption_form():
    try:
        body = request.get_json()

        # Ensure required fields are present
        required_fields = ['full_name', 'age', 'email', 'phone_number', 'address', 'user_id', 'pet_id']

        for field in required_fields:
            if body.get(field) in [None, ""]:
                return jsonify({'error': f'{field} is required'}), 400

        new_adoption_form = AdoptionForm(
            full_name=body.get('full_name'),
            age=body.get('age'),
            email=body.get('email'),
            phone_number=body.get('phone_number'),
            address=body.get('address'),
            user_id=body.get('user_id'),
            pet_id=body.get('pet_id'),
            submitted_at=datetime.now(),
            status='pending'
        )

        db.session.add(new_adoption_form)
        db.session.commit()
        return jsonify(new_adoption_form.to_dict()), 201

    except Exception:
        db.session.rollback()
        return jsonify({'error': 'Invalid request'}), 400

# Start the Flask app
if __name__ == '__main__':
    app.run(port=5555, debug=True)
