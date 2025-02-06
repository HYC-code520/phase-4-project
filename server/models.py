from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db

# Models go here!
class Favorite(db.Model, SerializerMixin):
    __tablename__ = 'favorite_table'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    pet_id = db.Column(db.Integer, db.ForeignKey('pets.id'))

class Admin(db.Model, SerializerMixin):
    __tablename__ = 'admin_table'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False, unique=True)
    email = db.Column(db.String(50), nullable=False)
    password_hash = db.Column(db.String(50), nullable=False)

class Pet(db.Model, SerializerMixin):
    __tablename__ = 'pets'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable)
    age = db.Column(db.Integer)
    animal_type = db.Column(db.String(50))
    breed = db.Column(db.String(50))
    img_url = db.Column(db.String(50))
    adoption_status = db.Column(db.String(50))


