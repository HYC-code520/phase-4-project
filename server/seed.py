#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Pet

if __name__ == '__main__':
    fake = Faker()
    
    with app.app_context():
        print("Starting seed...")

        # Create admin user (only if not already present)
        admin_email = "admin@example.com"
        admin = User.query.filter_by(email=admin_email).first()

        if not admin:
            admin = User(
                name="Admin",
                email=admin_email,
                age=30,
                is_admin=True  # Ensure this user is the admin
            )
            admin.password = "adminpassword"  # Uses the Flask-Bcrypt setter
            db.session.add(admin)
            print("Admin user created!")

        # Add specific dogs and cats (keeping existing ones)
        specific_pets = [
            Pet(name='Penard', age=5, animal_type='dog', breed='Chiweenie',
                img_url='/public/images/penard.jpg', adoption_status='adopted'),
            Pet(name='Jalebi', age=3, animal_type='dog', breed='Chihuahua',
                img_url='/public/images/jalebi.jpg', adoption_status='available'),
            Pet(name='Aaloo', age=2, animal_type='cat', breed='Scottish Fold',
                img_url='/public/images/aaloo.jpg', adoption_status='available'),
            Pet(name='Ripper', age=4, animal_type='cat', breed='Siamese',
                img_url='/public/images/ripper.jpg', adoption_status='available'),
            Pet(name='Dawi', age=1, animal_type='cat', breed='Bengal',
                img_url='/public/images/dawi.jpg', adoption_status='available'),
            Pet(name=fake.first_name(), age=3, animal_type='cat', breed='Siamese',
                img_url='/public/images/arielle_cat1.jpg', adoption_status='available'),
            Pet(name=fake.first_name(), age=4, animal_type='cat', breed='Maine Coon',
                img_url='/public/images/arielle_cat2.jpg', adoption_status='available'),
            Pet(name=fake.first_name(), age=2, animal_type='cat', breed='Ragdoll',
                img_url='/public/images/arielle_cat3.jpg', adoption_status='available'),
        ]

        # Check if these pets already exist before adding (to avoid duplicates)
        for pet in specific_pets:
            existing_pet = Pet.query.filter_by(name=pet.name, breed=pet.breed).first()
            if not existing_pet:
                db.session.add(pet)

        # Generate random cats and dogs
        animals = ['cat', 'dog']
        breeds = {
            'cat': ['Siamese', 'Persian', 'Maine Coon', 'Ragdoll', 'Bengal', 'Tabby', 'Unknown'],
            'dog': ['Labrador', 'Poodle', 'Bulldog', 'Beagle', 'Rottweiler', 'Dachshund', 'Chihuahua', 'Mixed']
        }

        for _ in range(23):  # 23 because 7 specific cats and 2 specific dogs are already added
            for animal in animals:
                img_url = 'https://placekitten.com/200/300' if animal == "cat" else 'https://placedog.net/200/300'
                random_pet = Pet(
                    name=fake.first_name(),
                    age=randint(1, 15),
                    animal_type=animal,
                    breed=rc(breeds[animal]),
                    img_url=img_url,
                    adoption_status=rc(['available', 'adopted', 'adoption pending'])
                )
                db.session.add(random_pet)

        db.session.commit()
        print("Seeding complete!")
