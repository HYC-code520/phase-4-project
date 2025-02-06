#!/usr/bin/env python3
# Standard library imports
from models import User, Pet, Favorite
# Remote library imports
from flask import request, make_response, jsonify
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports


#ROUTES NEEDED
# POST /users NEEDS WORK

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

@app.get ('/users')
def all_users():
    users = User.query.all()
    users_json = [user.to_dict() for user in users]
    return make_response(jsonify(users_json), 200)

@app.get ('/users/<int:id>')
def user_by_id(id):
    user = User.query.get(id)
    if user:
        return make_response(jsonify(user.to_dict()), 200)
    else:
        return make_response(jsonify({'error': 'User not found'}), 404)


# @app.post ('/users')
# def create_user():
#         body = request.jsonify
#         new_user = User(
#             name=body.get('name'),
#             email=body.get('email')
#             #HOW DO WE CREATE A NEW PASSWORD HERE?
#         )
#         return make_response(jsonify(new_user.to_dict()), 201)


@app.post('/favorites')
def create_favorite():
    try:
        body = request.json
        new_favorite = Favorite(
            user_id=body.get('user_id'),
            pet_id=body.get('pet_id')
        )
        db.session.add(new_favorite)
        db.session.commit()
        return make_response(jsonify(new_favorite.to_dict()), 201)
    except Exception:
        return make_response(jsonify({'error': 'Invalid request'}), 400)

@app.delete('/favorites/<int:id>')
def delete_favorite(id):
    favorite = Favorite.query.get(id)
    if favorite:
        db.session.delete(favorite)
        db.session.commit()
        return make_response(jsonify({'message': 'Favorite deleted'}), 200)
    else:
        return make_response(jsonify({'error': 'Favorite not found'}), 404)

@app.get('/favorites')
def all_favorites():
    favorites = Favorite.query.all()
    favorites_json = [favorite.to_dict() for favorite in favorites]
    return make_response(jsonify(favorites_json), 200)

@app.get('/pets')
def all_pets():
    pets = Pet.query.all()
    pets_json = [pet.to_dict() for pet in pets]
    return make_response(jsonify(pets_json), 200)

@app.get('/pets/<int:id>')
def pet_by_id(id):
    pet = Pet.query.get(id)
    if pet:
        return make_response(jsonify(pet.to_dict()), 200)
    else:
        return make_response(jsonify({'error': 'Pet not found'}), 404)

@app.get('/pets/<string:animal_type>')
def pet_by_type(animal_type):
    pets = Pet.query.filter_by(animal_type=animal_type).all()
    pets_json = [pet.to_dict() for pet in pets]
    return make_response(jsonify(pets_json), 200)

@app.patch('/pets/<int:id>')
def update_pet(id):
    pet = Pet.query.get(id)
    if pet:
        try:
            body = request.json
            for key in body:
                setattr(pet, key, body[key])
            db.session.add(pet)
            db.session.commit
            return pet.to_dict(), 200
        except Exception:
            return make_response(jsonify({'error': 'Invalid request'}), 400)

@app.post('/pets')
def create_pet():
    try:
        body = request.json
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
        return make_response(jsonify(new_pet.to_dict()), 201)
    except Exception:
        return make_response(jsonify({'error': 'Invalid request'}), 400)





if __name__ == '__main__':
    app.run(port=5555, debug=True)

