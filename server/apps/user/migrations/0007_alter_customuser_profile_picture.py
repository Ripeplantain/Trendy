# Generated by Django 4.2.4 on 2023-10-06 01:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0006_alter_customuser_profile_picture'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='profile_picture',
            field=models.CharField(blank=True, null=True),
        ),
    ]
