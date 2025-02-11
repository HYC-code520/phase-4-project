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

        Pet.query.delete()

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

        # Predefined list of unique cat image URLs
        cat_images = [
            'https://media.istockphoto.com/id/1443562748/photo/cute-ginger-cat.jpg?s=612x612&w=0&k=20&c=vvM97wWz-hMj7DLzfpYRmY2VswTqcFEKkC437hxm3Cg=',
            'https://media.istockphoto.com/id/1325997570/photo/bengal-cat-lying-on-sofa-and-smiling.jpg?s=612x612&w=0&k=20&c=U6HBa06jHDDZ4Wbd1GylTEybkvUCUaMf7blxCr-bon0=',
            'https://www.shutterstock.com/image-photo/tabby-cat-raising-his-paw-600nw-2527053247.jpg',
            'https://thumbs.dreamstime.com/b/funny-kitten-cat-standing-dancing-isolated-white-97402399.jpg',
            'https://pbs.twimg.com/media/GSbK3FRWwAAiQTk?format=jpg&name=900x900',
            'https://pbs.twimg.com/media/GFnyXaAWoAAlwFt?format=jpg&name=large',
            'https://i.chzbgr.com/full/9675430400/h0E3A32E8/cat',
            'https://i.pinimg.com/236x/15/a1/b3/15a1b3bd6ea045efdcbe9c14ee71ca6d.jpg',
            'https://preview.redd.it/my-sisters-fucked-up-thing-v0-zue465liy63e1.jpg?width=640&crop=smart&auto=webp&s=ee479830d3fab7c464d512aa97f813ec7ad47c4c',
            'https://assets.tiltify.com/uploads/media_type/image/203025/blob-09636982-a21a-494b-bbe4-3692c2720ae3.jpeg',
            'https://i.redd.it/show-me-your-silly-cats-v0-wplu39sp6l1d1.jpg?width=4032&format=pjpg&auto=webp&s=9970c7152419d80629bc8a7e94ea556b9779f833',
            'https://pethelpful.com/.image/w_3840,q_auto:good,c_fill,ar_4:3,g_xy_center,x_556,y_388/MjA4NDAwNTI1ODExNTI1MjY0/shutterstock_2251137885-1.png',
            'https://img.freepik.com/free-photo/adorable-white-cat-sunglasses-shirt-lies-fabric-hammock-ai-generated_268835-10929.jpg',
            'https://media.tenor.com/mNj1Gs5Kp-kAAAAM/cat-funny.gif',
            'https://img-va.myshopline.com/image/store/1679367631642/image-(13).png?w=1024&h=1024'
        ]

        # Generate random cats and dogs
        animals = ['Cat', 'Dog']
        breeds = {
            'Cat': ['Siamese', 'Persian', 'Maine Coon', 'Ragdoll', 'Bengal', 'Tabby', 'Unknown'],
            'Dog': ['Labrador', 'Poodle', 'Bulldog', 'Beagle', 'Rottweiler', 'Dachshund', 'Chihuahua', 'Mixed']
        }

        for i in range(30):  # Generate 30 random pets
            animal = rc(animals)
            if animal == "Cat":
                img_url = cat_images[i % len(cat_images)]  # Use predefined cat image URLs
            else:
                img_url = f'https://placedog.net/200/300?id={randint(1, 50)}'
            random_pet = Pet(
                name=fake.first_name(),
                age=randint(1, 15),
                animal_type=animal,
                breed=rc(breeds[animal]),
                img_url=img_url,
                adoption_status=rc(['Available', 'Adopted', 'Adoption pending'])
            )
            db.session.add(random_pet)

        db.session.commit()
        print("Seeding complete!")
