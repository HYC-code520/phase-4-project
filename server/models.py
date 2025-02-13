from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin
from config import db, bcrypt

# User model - Stores user details and handles authentication
class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False, unique=True)
    email = db.Column(db.String(50), nullable=False, unique=True)
    password_hash = db.Column(db.String(128), nullable=False)
    age = db.Column(db.Integer, nullable=False)
    is_admin = db.Column(db.Boolean, default=False, nullable=False)  # Admin flag

    # Relationships
    favorites = db.relationship('Favorite', back_populates='user', cascade='all, delete-orphan')
    adoption_forms = db.relationship('AdoptionForm', back_populates='user')

    # Exclude password hash from serialization for security reasons
    serialize_rules = ("-favorites.user", "-password_hash")

    # Property to prevent direct access to password hash
    @property
    def password(self):
        raise AttributeError('Password is not readable')

    # Setter to hash the password before storing it in the database
    @password.setter
    def password(self, new_password):
        self.password_hash = bcrypt.generate_password_hash(new_password).decode('utf-8')

    # Method to authenticate user by checking password hash
    def authenticate(self, password):
        return bcrypt.check_password_hash(self.password_hash, password)

    #  Exclude recursive fields when serializing
    serialize_rules = ("-favorites.user", "-password_hash")

# Pet model - Represents animals available for adoption
class Pet(db.Model, SerializerMixin):
    __tablename__ = 'pets'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    age = db.Column(db.Integer, nullable=False)
    animal_type = db.Column(db.String(50), nullable=False)
    breed = db.Column(db.String(50), nullable=False)
    img_url = db.Column(db.String(255), nullable=False)
    adoption_status = db.Column(db.String(50), nullable=False)

    # Relationships
    favorites = db.relationship('Favorite', back_populates='pet', cascade='all, delete-orphan')
    adoption_forms = db.relationship('AdoptionForm', back_populates='pet')

    #  Exclude recursive fields when serializing
    serialize_rules = ("-favorites.pet", "-adoption_forms.pet")


# Favorite model - Stores favorite pets saved by users (Many-to-Many relationship)
class Favorite(db.Model, SerializerMixin):
    __tablename__ = 'favorites'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    pet_id = db.Column(db.Integer, db.ForeignKey('pets.id', ondelete='CASCADE'), nullable=False)

    # Relationships
    user = db.relationship('User', back_populates='favorites')
    pet = db.relationship('Pet', back_populates='favorites')

     # Prevent circular reference when serializing
    serialize_rules = ("-user.favorites", "-pet.favorites")

# AdoptionForm model - Stores adoption application details submitted by users
class AdoptionForm(db.Model, SerializerMixin):
    __tablename__ = 'adoption_forms'

    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String, nullable=False)
    age = db.Column(db.Integer, nullable=False)
    email = db.Column(db.String, nullable=False)
    phone_number = db.Column(db.String, nullable=False)
    address = db.Column(db.String, nullable=False)
    city = db.Column(db.String)  # New field
    state = db.Column(db.String)  # New field
    zip_code = db.Column(db.String)  # New field
    residence_type = db.Column(db.String, nullable=False, default="house")  # Renamed from house_type
    family_members = db.Column(db.Integer)
    has_other_pets = db.Column(db.Boolean, nullable=False, default=False)  # New field
    pet_alone_hours = db.Column(db.Integer)  # New field
    pet_sleeping_place = db.Column(db.String)  # New field
    has_previous_adoption = db.Column(db.Boolean, nullable=False, default=False)  # New field
    reason_for_adoption = db.Column(db.Text, nullable=False)  # New field
    landlord_permission = db.Column(db.Boolean, nullable=False)
    submitted_at = db.Column(db.DateTime, nullable=False, default=db.func.now())
    status = db.Column(db.String, nullable=False, default='pending')

    # Foreign keys
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    pet_id = db.Column(db.Integer, db.ForeignKey('pets.id'), nullable=False)

    # Relationships
    user = db.relationship('User', back_populates='adoption_forms')
    pet = db.relationship('Pet', back_populates='adoption_forms')

    # Exclude recursive serialization loops
    serialize_rules = ("-user.adoption_forms", "-pet.adoption_forms")
