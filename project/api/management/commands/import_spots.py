import os
import csv
from django.conf import settings
from datetime import time, datetime
from django.core.management.base import BaseCommand
from api.models import Spot, Tag, CustomFee, LocationImage

class Command(BaseCommand):
    help = 'Import data from CSV to Spot model'

    def get_time_str(self, time_str):
        if not time_str:
            return None

        try:
            time_formats = ['%H:%M:%S', '%I:%M %p', '%I:%M%p']
            for format_str in time_formats:
                try:
                    return datetime.strptime(time_str, format_str).time()
                except ValueError:
                    pass

            return None
        except Exception as e:
            return None

    def handle(self, *args, **options):
        csv_file = os.path.join(settings.BASE_DIR, 'TravelPackage - Spot.csv')

        with open(csv_file, 'r') as file:
            reader = csv.DictReader(file)
            count = 0;
            for row in reader:
                count += 1
                is_closed = bool(int(row.get('IsClosed', 0)))
                
                opening_time_str = row.get('Start')
                closing_time_str = row.get('End')
                
                opening_time = self.get_time_str(opening_time_str)
                closing_time = self.get_time_str(closing_time_str)

                spot = Spot.objects.create(
                    name=row['Place'],
                    address=row['Address'],
                    is_closed=is_closed,
                    latitude=float(row['Latitude']),
                    longitude=float(row['Longitude']),
                    fees=row['Fee'] if row['Fee'] != '' else None,
                    opening_time=opening_time,
                    location_type='1',
                    closing_time=closing_time 
                )

                if spot.fees == None:
                    min_cost = float(row.get('MinFee', 0.0)) 
                    max_cost = float(row.get('MaxFee', 0.0))  
                    CustomFee.objects.create(
                        spot=spot,
                        min_cost=min_cost,
                        max_cost=max_cost
                    )

                image_links = row['Image'].split(',') 

                if image_links:
                    primary_image_url = image_links[0]
                    LocationImage.objects.create(
                        location=spot,
                        image=primary_image_url,
                        is_primary_image=True
                    )

                    for secondary_image_url in image_links[1:]:
                        LocationImage.objects.create(
                            location=spot,
                            image=secondary_image_url,
                            is_primary_image=False
                        )

                tags = []  
                tag_names = ['Historical', 'Nature', 'Religious', 'Art', 'Activities', 'Entertainment', 'Culture']

                for tag_name in tag_names:
                    tag_value = int(row[tag_name])
                    if tag_value == 1:
                        tag, created = Tag.objects.get_or_create(name=tag_name)
                        tags.append(tag)

                spot.tags.set(tags) 

                print("Imported " + spot.name)

        self.stdout.write(self.style.SUCCESS('Data imported successfully'))
