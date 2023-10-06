# Generated by Django 4.2.4 on 2023-10-06 02:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('social', '0012_remove_post_file_post_image'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='post',
            name='image',
        ),
        migrations.AddField(
            model_name='post',
            name='file',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
