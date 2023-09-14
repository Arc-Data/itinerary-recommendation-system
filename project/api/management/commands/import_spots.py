import os
import csv
from django.conf import settings
from datetime import timedelta
from django.core.management.base import BaseCommand
from api.models import Spot, Tag

class Command(BaseCommand):
    help = 'Import data from CSV to Spot model'

    def handle(self, *args, **options):
        csv_file = os.path.join(settings.BASE_DIR, 'Spot.csv')

        with open(csv_file, 'r') as file:
            reader = csv.DictReader(file)
            for row in reader:
                is_closed = bool(int(row.get('IsClosed', 0)))
                spot = Spot(
                    name=row['Name'],
                    address=row['Address'],
                    latitude=float(row['Latitude']),
                    longitude=float(row['Longitude']),
                    fees=0,
                    is_closed=is_closed
                )
                spot.save()

                tags = []  # Create a list to store tags
                tag_names = ['Historical', 'Nature', 'Religious', 'Art', 'Activities', 'Entertainment', 'Culture']

                for tag_name in tag_names:
                    tag_value = int(row[tag_name])
                    if tag_value == 1:
                        tag, created = Tag.objects.get_or_create(name=tag_name)
                        tags.append(tag)

                spot.tags.set(tags)  # Associate tags with the Spot instance

        self.stdout.write(self.style.SUCCESS('Data imported successfully'))
