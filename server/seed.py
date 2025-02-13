#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Pet, AdoptionForm

if __name__ == '__main__':
    fake = Faker()
    
    with app.app_context():
        print("Starting seed...")

        AdoptionForm.query.delete()
        Pet.query.delete()
        User.query.filter(User.email != "admin@example.com").delete()

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


        # Generate 10 random non-admin users
        for i in range(10):
            user = User(
                name=fake.name(),
                email=fake.unique.email(),
                age=randint(18, 65),
                is_admin=False
            )
            user.password = "password123"  # Default password for all users
            db.session.add(user)
        
        db.session.commit()
        print("10 random users created!")


        # Predefined list of unique cat image URLs
        cat_images = [
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf9fTVDFL7KGGz5J-UeAFSsOMYGICdyHPqAA&s',
            'https://live.staticflickr.com/7085/7215121222_75299b861b_z.jpg',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsjAuIr7UwYW6w-UA0ecQozgebmkEMI5me8Q&s',
            'https://pbs.twimg.com/media/Dd6rQssV0AMZQeO.jpg:large',
            'https://i.etsystatic.com/18172150/r/il/1c91c2/3962580509/il_570xN.3962580509_ln3c.jpg',
            'https://www.sparklecat.com/wp-content/uploads/Summer052920cDSC09997.jpg',
            'https://www.garagejournal.com/forum/media/i-wanted-a-new-avatar-so-i-googled-cat-and-bikini-this-is-what-i-got.67858/full',
            'https://www.sparklecat.com/wp-content/uploads/Summer060720bIMG_7160.jpg',
            'https://www.sparklecat.com/wp-content/uploads/Summer021522eDSC04150.jpg',
            'https://files.idyllic.app/files/static/2198668?width=1080&optimizer=image',
            'https://i.imgur.com/M6md8Mi_d.webp?maxwidth=520&shape=thumb&fidelity=high',
            'https://avatars.mds.yandex.net/get-shedevrum/11473245/3818fc06b9d111ee8f749e327a4c855e/orig',
            'https://m.media-amazon.com/images/I/71toevslMGL.jpg',
            'https://www.sparklecat.com/wp-content/uploads/Summer100821fDSC08769.jpg',
            'https://allcatsgood.com/cdn/shop/products/21824094.jpg?v=1661008362&width=1445',
                    ]

        dog_images = [
            'https://i.imgur.com/8kGQnpx.jpg',
            'https://lh3.googleusercontent.com/S2w5kk2QAM84OsTAVNH-r-YbSN1YO-KTc_DPkVYBIwp3n3gISnF7genRUUECp9sIGFqFYL_z7v9CwMNdAuVT_aS_=s900',
            'https://i.redd.it/5jb8yc7u80n31.jpg',
            'https://i.pinimg.com/474x/08/be/9d/08be9d836968e3e9023c832cf6ea8943.jpg',
            'https://i.ebayimg.com/images/g/K4sAAOSw849jYDaf/s-l1200.jpg',
            'https://img.buzzfeed.com/buzzfeed-static/static/2019-04/18/17/asset/buzzfeed-prod-web-05/sub-buzz-27054-1555622322-2.png?downsize=900:*&output-format=auto&output-quality=auto',
            'https://us.123rf.com/450wm/masarik512/masarik5122305/masarik512230503040/204505669-seductive-passionate-dog-with-tongue-in-hoodie-with-devil-horns-on-red-background-puppy-in-fancy.jpg',
            'https://m.media-amazon.com/images/I/61xBOOI760S.jpg',
            'https://i.redd.it/u71z08ujmnwb1.jpg',
            'https://m.media-amazon.com/images/I/71DCLvQSFuL._AC_UF1000,1000_QL80_.jpg',
            'https://i.pinimg.com/736x/ed/fd/6d/edfd6d150f4966d57f4f17956330ba2c.jpg',
            'https://i.pinimg.com/736x/98/c5/a2/98c5a2845b435c2162de8c428feaf842.jpg',
            'https://img-va.myshopline.com/image/store/1690274988467/-4.jpeg?w=1200&h=1200',
            'https://i.pinimg.com/736x/45/4b/21/454b21f7aa054d5e44f2527b25145a52.jpg',
            'https://i.insider.com/5088100aeab8eaca7300000c?width=600&format=jpeg&auto=webp',
            '',
            
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
                img_url = dog_images[i % len(dog_images)]  # Use predefined dog image URLs
            random_pet = Pet(
                name=fake.first_name(),
                age=randint(1, 15),
                animal_type=animal,
                breed=rc(breeds[animal]),
                img_url=img_url,
                adoption_status=rc(['Available', 'Adoption pending']),
                is_favorite=False # Add this line
            )
            db.session.add(random_pet)
        
        db.session.commit()
        print("30 pets have been created!")

        # Generate 6 adoption applications with non-admin users only
        non_admin_users = User.query.filter_by(is_admin=False).all()
        pets = Pet.query.filter(Pet.adoption_status == 'Available').all()

        if len(non_admin_users) == 0 or len(pets) == 0:
            print("You need some users and pets in the database first.")
        else:
            for _ in range(6):  # Generate 6 adoption applications
                applicant = rc(non_admin_users)
                pet_to_adopt = rc(pets)

                new_application = AdoptionForm(
                    full_name=applicant.name,
                    age=applicant.age,
                    email=applicant.email,
                    phone_number=fake.phone_number(),
                    address=fake.address(),
                    city=fake.city(),
                    state=fake.state_abbr(),
                    zip_code=fake.zipcode(),
                    residence_type=rc(["House", "Apartment", "Townhouse"]),
                    family_members=randint(1, 6),
                    has_other_pets=rc([True, False]),
                    pet_alone_hours=randint(0, 8),
                    pet_sleeping_place=rc(["Inside", "Outside", "Pet House"]),
                    has_previous_adoption=rc([True, False]),
                    reason_for_adoption=fake.text(max_nb_chars=100),
                    landlord_permission=rc([True, False]),
                    user_id=applicant.id,
                    pet_id=pet_to_adopt.id,
                    submitted_at=fake.date_time_this_year(),
                    status=rc(["pending", "approved", "rejected"])
                )
                db.session.add(new_application)

            db.session.commit()
            print("6 adoption applications have been created!")

        db.session.commit()
        print("Seeding complete!")
