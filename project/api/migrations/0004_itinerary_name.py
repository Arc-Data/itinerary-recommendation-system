# Generated by Django 4.2.4 on 2023-11-09 03:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_alter_day_color'),
    ]

    operations = [
        migrations.AddField(
            model_name='itinerary',
            name='name',
            field=models.CharField(default='My Trip', max_length=60),
        ),
    ]