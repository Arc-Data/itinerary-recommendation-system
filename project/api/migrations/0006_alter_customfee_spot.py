# Generated by Django 4.2.4 on 2023-09-17 09:31

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_modelitinerary'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customfee',
            name='spot',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='custom_fee', to='api.spot'),
        ),
    ]