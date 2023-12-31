# Generated by Django 4.2.4 on 2023-10-06 03:12

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='FileUpload',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('file', models.FileField(upload_to='uploads/')),
                ('purpose', models.CharField(blank=True, choices=[('PROFILE_PICTURE', 'PROFILE_PICTURE'), ('POST', 'POST')], max_length=255, null=True)),
                ('type', models.CharField(default='image', max_length=255)),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
