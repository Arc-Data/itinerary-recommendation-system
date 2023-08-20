# Generated by Django 4.2.4 on 2023-08-20 04:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_alter_location_image'),
    ]

    operations = [
        migrations.CreateModel(
            name='Tag',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
            ],
        ),
        migrations.RemoveField(
            model_name='spot',
            name='activity_focus',
        ),
        migrations.RemoveField(
            model_name='spot',
            name='art_focus',
        ),
        migrations.RemoveField(
            model_name='spot',
            name='historical_relevance',
        ),
        migrations.DeleteModel(
            name='Activity',
        ),
    ]
