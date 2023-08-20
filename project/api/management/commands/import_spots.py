import os
import csv
from django.conf import settings
from datetime import timedelta
from django.core.management.base import BaseCommand
from api.models import Spot

class Command(BaseCommand):
    help = 'Import data from CSV to Spot model'

    def handle(self, *args, **options):
        csv_file = os.path.join(settings.BASE_DIR, 'Spot.csv')

        with open(csv_file, 'r') as file:
            reader = csv.DictReader(file)
            for row in reader:
                spot = Spot(
                    name=row['Name'],
                    address=row['Address'],
                    latitude=float(row['Latitude']),
                    longitude=float(row['Longitude']),
                    historical_relevance=int(row['HistoricalRelevance']),
                    art_focus=int(row['ArtFocused']),
                    activity_focus=int(row['ActivityFocused']),
                    fees=0,
                )
                spot.save()

        self.stdout.write(self.style.SUCCESS('Data imported successfully'))
