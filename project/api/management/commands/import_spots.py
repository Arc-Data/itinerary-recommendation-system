import os
import csv
from django.conf import settings
from datetime import timedelta, time
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
                
                opening_time_str = row.get('OpeningTime', '00:00:00')
                closing_time_str = row.get('ClosingTime', '00:00:00')
                
                if opening_time_str:
                    opening_time_parts = opening_time_str.split(':')
                    opening_time = time(int(opening_time_parts[0]), int(opening_time_parts[1]), int(opening_time_parts[2]))
                else:
                    opening_time = None

                if closing_time_str:
                    closing_time_parts = closing_time_str.split(':')
                    closing_time = time(int(closing_time_parts[0]), int(closing_time_parts[1]), int(closing_time_parts[2]))
                else:
                    closing_time = None

                spot = Spot(
                    name=row['Name'],
                    address=row['Address'],
                    latitude=float(row['Latitude']),
                    longitude=float(row['Longitude']),
                    fees=0,
                    is_closed=is_closed,
                    opening_time=opening_time,
                    closing_time=closing_time 
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
