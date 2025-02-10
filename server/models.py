from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin
from config import db, bcrypt

# User model
class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False, unique=True)
    email = db.Column(db.String(50), nullable=False, unique=True)
    password_hash = db.Column(db.String(128), nullable=False)
    age = db.Column(db.Integer, nullable=False)
    is_admin = db.Column(db.Boolean, default=False, nullable=False)  # Admin flag

    favorites = db.relationship('Favorite', back_populates='user', cascade='all, delete-orphan')

    serialize_rules = ("-favorites.user", "-password_hash")

    @property
    def password(self):
        raise AttributeError('Password is not readable')

    @password.setter
    def password(self, new_password):
        self.password_hash = bcrypt.generate_password_hash(new_password).decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(self.password_hash, password)

# Pet model (Added `favorites` relationship)
class Pet(db.Model, SerializerMixin):
    __tablename__ = 'pets'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    age = db.Column(db.Integer, nullable=False)
    animal_type = db.Column(db.String(50), nullable=False)
    breed = db.Column(db.String(50), nullable=False)
    img_url = db.Column(db.String(255), nullable=False)
    adoption_status = db.Column(db.String(50), nullable=False)

    # FIX: Added relationship with Favorite
    favorites = db.relationship('Favorite', back_populates='pet', cascade='all, delete-orphan')

# Favorite model (Many-to-Many between Users and Pets)
class Favorite(db.Model, SerializerMixin):
    __tablename__ = 'favorites'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    pet_id = db.Column(db.Integer, db.ForeignKey('pets.id', ondelete='CASCADE'), nullable=False)

    user = db.relationship('User', back_populates='favorites')
    pet = db.relationship('Pet', back_populates='favorites')
