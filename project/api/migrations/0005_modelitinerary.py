# Generated by Django 4.2.4 on 2023-09-17 09:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_alter_locationimage_image'),
    ]

    operations = [
        migrations.CreateModel(
            name='ModelItinerary',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('locations', models.ManyToManyField(to='api.spot')),
            ],
        ),
    ]