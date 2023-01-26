from app import app
from models import db, User, Message, Room
from faker import Faker


def run_seeds():
    fake = Faker()
    print('Seeding database ... 🌱')
    # Add your seed data here
    with app.app_context():
      user1 = User('Michael', '0000')
      user2 = User('Colter', '1111')
      user3 = User('Larson', '2222')
      user4 = User('Ritter', 'bone')
      db.session.add_all([user1, user2, user3, user4])
      db.session.commit()
      room1 = Room(1,2)
      room2 = Room(2,3)
      room3 = Room(2,4)
      room4 = Room(1,3)
      db.session.add_all([room1, room2, room3, room4])
      db.session.commit()
      print('Done! 🌳')


run_seeds()