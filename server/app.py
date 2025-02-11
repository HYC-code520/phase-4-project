#!/usr/bin/env python3

# Standard library imports
from flask import request, jsonify, session
from flask_restful import Api, Resource
from sqlalchemy.exc import IntegrityError

# Local imports
from config import app, db, api
from models import User, Pet, Favorite

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

# Create a new user (password is hashed using Flask-Bcrypt via the property setter)
@app.post('/api/users')
def create_user():
    try:
        body = request.get_json()
        new_user = User(
            name=body.get('name'),
            email=body.get('email'),
            age=body.get('age')
        )
        new_user.password = body.get('password')  # Uses the Flask-Bcrypt setter
        db.session.add(new_user)
        db.session.commit()
        return jsonify(new_user.to_dict(rules=("-password_hash",))), 201
    except IntegrityError:
        db.session.rollback()  # Rollback changes if a duplicate entry occurs
        return jsonify({'error': 'User with this email or name already exists'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 400

# Admin login route - stores user session
@app.post('/api/login')
def login():
    body = request.get_json()
    user = User.query.filter_by(email=body.get('email')).first()

    if user and user.authenticate(body.get('password')):
        session['user_id'] = user.id  # Store user ID in session
        return jsonify({"message": "Login successful", "is_admin": user.is_admin}), 200

    return jsonify({'error': 'Invalid credentials'}), 401

# Logout route - clears session
@app.delete('/logout')
def logout():
    session.pop('user_id', None)  # Remove user session
    return {}, 204

# Create a new favorite pet for a user
@app.post('/favorites')
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
@app.delete('/favorites/<int:id>')
def delete_favorite(id):
    favorite = Favorite.query.get(id)
    if favorite:
        db.session.delete(favorite)
        db.session.commit()
        return {}, 204  # No content response
    return jsonify({'error': 'Favorite not found'}), 404

# Retrieve all pets
@app.get('/pets')
def all_pets():
    pets = Pet.query.all()
    pets_json = [pet.to_dict() for pet in pets]
    return jsonify(pets_json), 200

# Retrieve a pet by ID
@app.get('/pets/<int:id>')
def pet_by_id(id):
    pet = Pet.query.get(id)
    if pet:
        return jsonify(pet.to_dict()), 200
    return jsonify({'error': 'Pet not found'}), 404

# Create a new pet (Only admin can add pets)
@app.post('/pets')
def create_pet():
    user_id = session.get('user_id')  # Get logged-in user from session
    user = User.query.get(user_id)

    if not user or not user.is_admin:
        return jsonify({'error': 'Only the admin can add pets'}), 403  # Forbidden

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
@app.delete('/pets/<int:id>')
def delete_pet(id):
    user_id = session.get('user_id')  # Get logged-in user
    user = User.query.get(user_id)

    if not user or not user.is_admin:
        return jsonify({'error': 'Only the admin can delete pets'}), 403  # Forbidden

    pet = Pet.query.get(id)
    if pet:
        db.session.delete(pet)
        db.session.commit()
        return {}, 204  # No Content
    return jsonify({'error': 'Pet not found'}), 404

def find_adoption_form_by_id(id):
    return AdoptionForm.get(id)

@app.get('/adoption_forms')
def all_adoption_form():
    adoption_form = AdoptionForm.query.all()
    user_json = [adoption_form.to_dict() for adoption_form in adoption_forms]
    return jsonify(adoption_forms_json), 200


@app.get('/adoption_forms/<int:id>')
def adoption_form_by_id(id):
    adoption_form = find_adoption_form_by_id(id)
    if user:
        return jsonify(user.to_dict()), 200
    return jsonify({'error': 'From not found'}), 404


@app.post('/adoption_forms')
def create_adoption_form():
    try:
        body = request.get_json()

        #To ensure required fields are presented
        required_field = ['full_name', 'email', 'phone_number', 'address', 'user_id', 'pet_id']
        for field in required_field:
            if not body.get(field):
                return jsonify({'error': f'{field} is required'}), 400


        new_adoption_form = AdoptionForm(
            full_name=body.get('full_name'),
            email=body.get('email'),
            phone_number=body.get('phone_number'),
            address=body.get('address'),
            residence_type=body.get('residence_type'),
            family_members=body.get('householdMembers'),
            has_other_pets=body.get('otherPets') == 'yes',
            pet_alone_hours=body.get('petAloneHours'),
            pet_sleeping_place=body.get('petSleepingPlace'),
            has_previous_adoption=body.get('previousAdoption') == 'yes',
            user_id=body.get('user_id'),  # Ensure this is passed or set properly
            pet_id=body.get('pet_id')        
            submitted_at=datetime.now(),  # Automatically set the submission time
            status='pending'  # Default status    
        )
        db.session.add(new_adoption_form)
        db.session.commit()
        return jsonify(new_adoption_form.to_dict()), 201
        
    except Exception:
        db.session.rollback()  # Rollback in case of error
        print(f"Error creating adoption form: {e}")  # Log the error for debugging
        return jsonify({'error': 'Invalid request'}), 400

if __name__ == '__main__':
    app.run(port=5555, debug=True)
