import random
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model

from api.models import *

User = get_user_model()

class Command(BaseCommand):
    help = 'Calculate user ratings to achieve a desired final average'

    def add_arguments(self, parser):
        parser.add_argument('final_rating', type=float, help='Desired final average rating')
        parser.add_argument('total_users', type=int, help='Total number of users')
        parser.add_argument('location_id', type=int, help='Enter Location Id')

    def handle(self, *args, **options):
        random.seed()
        final_rating = options['final_rating']
        total_users = options['total_users']
        location_id = options['location_id']

        location = Location.objects.get(id=location_id)

        if final_rating < 1 or final_rating > 5:
            self.stdout.write(self.style.ERROR('Final rating must be between 1 and 5'))
            return

        # Adjust weights to favor rating 5 and control the distribution
        # [ 0.62, 0.23, 0.11, 0.02, 0.02]
     
        weights = [0.02, 0.02, 0.11, 0.23, 0.62]
        ratings = [1, 2, 3, 4, 5]
        distribution = [0] * 5

        while sum(distribution) < total_users:
            user_rating = random.choices(ratings, weights=weights)[0]
            distribution[user_rating - 1] += 1

        print("Final Distribution (out of {} users):".format(total_users))
        for i, count in enumerate(distribution, 1):
            print("Rating {}: {} users".format(i, count))

        current_average = sum(r * d for r, d in zip(ratings, distribution)) / total_users
        print("Final Average Rating: {:.2f}".format(current_average))
        
        # Get a list of existing users and shuffle them
        users = list(User.objects.all())
        random.shuffle(users)
        
        # Loop through shuffled users and assign ratings for the specified location
        i = 0
        for user in users[:total_users]:
            if distribution[i] == 0:
                i + 1
            
            distribution[i] -= 1
            Review.objects.create(location=location, user=user, rating=i + 1)
            
            # user_ratings = random.choices(ratings, k=distribution[users.index(user)])
            # # Create Review objects for each rating assigned
