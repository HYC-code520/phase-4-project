#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, Pet

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")

        # Clear existing data
        Pet.query.delete()

        # Add specific dogs and cats
        specific_dog1 = Pet(
            name='Penard',
            age=5,
            animal_type='dog',
            breed='Chiweenie',
            img_url='/public/images/penard.jpg',
            adoption_status='adopted'
        )
        specific_dog2 = Pet(
            name='Jalebi',
            age=3,
            animal_type='dog',
            breed='Chihuahua',
            img_url='/public/images/jalebi.jpg',
            adoption_status='available'
        )
        specific_cat1 = Pet(
            name='Aaloo',
            age=2,
            animal_type='cat',
            breed='Scottish Fold',
            img_url='/public/images/aaloo.jpg',
            adoption_status='available'
        )
        specific_cat2 = Pet(
            name='Ripper',
            age=4,
            animal_type='cat',
            breed='Siamese',
            img_url='/public/images/ripper.jpg',
            adoption_status='available'
        )
        specific_cat3 = Pet(
            name='Dawi',
            age=1,
            animal_type='cat',
            breed='Bengal',
            img_url='/public/images/dawi.jpg',
            adoption_status='available'
        )
        specific_cat4 = Pet(
            name=fake.first_name(),
            age=3,
            animal_type='cat',
            breed='Siamese',
            img_url='/public/images/arielle_cat1.jpg',
            adoption_status='available'
        )
        specific_cat5 = Pet(
            name=fake.first_name(),
            age=4,
            animal_type='cat',
            breed='Maine Coon',
            img_url='/public/images/arielle_cat2.jpg',
            adoption_status='available'
        )
        specific_cat6 = Pet(
            name=fake.first_name(),
            age=2,
            animal_type='cat',
            breed='Ragdoll',
            img_url='/public/images/arielle_cat3.jpg',
            adoption_status='available'
        )
        db.session.add_all([specific_dog1, specific_dog2, specific_cat1, specific_cat2, specific_cat3,
        specific_cat4, specific_cat5, specific_cat6])

        # Generate 30 cats and 30 dogs
        animals = ['cat', 'dog']
        breeds = {
            'cat': ['Siamese', 'Persian', 'Maine Coon', 'Ragdoll', 'Bengal', 'Tabby', 'Unknown'],
            'dog': ['Labrador', 'Poodle', 'Bulldog', 'Beagle', 'Rottweiler', 'Dachshund', 'Chihuahua', 'Mixed']
        }

        for _ in range(23):  # 23 because we already added 6 specific cats and 2 specific dogs
            for animal in animals:
                img_url = 'https://placekitten.com/200/300' if animal == 'cat' else 'https://placedog.net/200/300'
                pet = Pet(
                    name=fake.first_name(),
                    age=randint(1, 15),
                    animal_type=animal,
                    breed=rc(breeds[animal]),
                    img_url=img_url,
                    adoption_status=rc(['available', 'adopted', 'adoption pending'])
                )
                db.session.add(pet)

        db.session.commit()
        print("Seeding complete!")
