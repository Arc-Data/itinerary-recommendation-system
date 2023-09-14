import os
import csv
from django.conf import settings
from datetime import time
from django.core.management.base import BaseCommand
from api.models import Spot, Tag
from project.api.models import CustomFee

class Command(BaseCommand):
    help = 'Import data from CSV to Spot model'

    def get_time_str(time_str):
        if not time_str:
            return None
        
        time_str_parts = time_str.split(":")
        return time(int(time_str_parts[0]), int(time_str_parts[1]), int(time_str_parts[2]))
        
    def handle(self, *args, **options):
        csv_file = os.path.join(settings.BASE_DIR, 'Spot.csv')

        with open(csv_file, 'r') as file:
            reader = csv.DictReader(file)
            for row in reader:
                is_closed = bool(int(row.get('IsClosed', 0)))
                
                opening_time_str = row.get('OpeningTime', '00:00:00')
                closing_time_str = row.get('ClosingTime', '00:00:00')
                
                opening_time = self.get_time_str(opening_time_str)
                closing_time = self.get_time_str(closing_time_str)
                
                spot = Spot(
                    name=row['Name'],
                    address=row['Address'],
                    is_closed=is_closed,
                    latitude=float(row['Latitude']),
                    longitude=float(row['Longitude']),
                    fees=row['Fees'] if row['Fees'] != '' else None,
                    opening_time=opening_time,
                    closing_time=closing_time 
                )
                spot.save()

                if spot.fees == None:
                    min_cost = float(row.get('min_cost', 0.0))  # Provide a default value of 0.0 if 'min_cost' is missing
                    max_cost = float(row.get('max_cost', 0.0))  # Provide a default value of 0.0 if 'max_cost' is missing
                    CustomFee.objects.create(
                        spot=spot,
                        min_cost=min_cost,
                        max_cost=max_cost
                    )

                tags = []  
                tag_names = ['Historical', 'Nature', 'Religious', 'Art', 'Activities', 'Entertainment', 'Culture']

                for tag_name in tag_names:
                    tag_value = int(row[tag_name])
                    if tag_value == 1:
                        tag, created = Tag.objects.get_or_create(name=tag_name)
                        tags.append(tag)

                spot.tags.set(tags) 

        self.stdout.write(self.style.SUCCESS('Data imported successfully'))
