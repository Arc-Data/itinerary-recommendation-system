# Generated by Django 4.2.4 on 2023-11-12 12:28

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_itinerary_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='bookmark',
            name='datetime_created',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
    ]
