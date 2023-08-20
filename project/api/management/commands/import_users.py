import os
import csv
from django.conf import settings
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model

User = get_user_model()

class Command(BaseCommand):
    help = 'Import users from CSV'

    def handle(self, *args, **options):
        csv_file = os.path.join(settings.BASE_DIR, 'User.csv')

        with open(csv_file, 'r') as file:
            reader = csv.DictReader(file)
            for row in reader:
                user = User(
                    username=row['username'],
                    email=row['email'],
                    first_name=row['first_name'],
                    last_name=row['last_name'],
                )
                user.set_password(row['password'])
                user.save()

        self.stdout.write(self.style.SUCCESS('Data imported successfully'))
