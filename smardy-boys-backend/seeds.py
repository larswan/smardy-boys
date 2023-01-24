from app import app
from models import db, User, Message
from faker import Faker


def run_seeds():
    fake = Faker()
    print('Seeding database ... 🌱')
    # Add your seed data here
    with app.app_context():
      user1 = User('canweplease', 'talkaboutpussy')
      user2 = User('colter', '1111')
      user3 = User('larson', '2222')
      db.session.add_all([user1, user2, user3])
      db.session.commit()
      user = User.query.first()
      seeded_messages = []
      for _ in range(5):
        message = Message(fake.text(), 1)
        seeded_messages.append(message)
      db.session.add_all(seeded_messages)
      db.session.commit()
      print('Done! 🌳')


run_seeds()