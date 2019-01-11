# Generated by Django 2.1.2 on 2018-10-12 01:42

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('attendance', '0004_auto_20181011_1821'),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='image',
            field=models.ImageField(default=django.utils.timezone.now, upload_to=''),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='event',
            name='location',
            field=models.CharField(help_text='Enter location of event', max_length=75),
        ),
    ]
