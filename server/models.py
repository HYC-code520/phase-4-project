from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db

# Models go here!
class Favorite(db.Model, SerializerMixin):
    __tablename__ = 'favorite_table'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user_table.id'))
    pet_id = db.Column(db.Integer, db.ForeignKey('pet_table.id'))

    users = db.relationship('User', back_populates='favorites')
    pets = db.relationship('Pet', back_populates='favorites')

class Admin(db.Model, SerializerMixin):
    __tablename__ = 'admin_table'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user_table.id'))

class User(db.Model, SerializerMixin):
    __tablename__ = 'user_table'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False, unique=True)
    email = db.Column(db.String(50), nullable=False)
    password_hash = db.Column(db.String(50), nullable=False)
    
    favorites = db.relationship('Favorite', back_populates='users')
    pets = association_proxy('favorites', 'pet')

class Pet(db.Model, SerializerMixin):
    __tablename__ = 'pet_table'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    age = db.Column(db.Integer)
    animal_type = db.Column(db.String(50))
    breed = db.Column(db.String(50))
    img_url = db.Column(db.String(50))
    adoption_status = db.Column(db.String(50))

    favorites = db.relationship('Favorite', back_populates='pets')
    users = association_proxy('favorites', 'user')


