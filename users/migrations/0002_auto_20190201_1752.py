# Generated by Django 2.1.1 on 2019-02-01 17:52

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='user',
            old_name='isStudent',
            new_name='is_student',
        ),
        migrations.RenameField(
            model_name='user',
            old_name='isTeacher',
            new_name='is_teacher',
        ),
    ]
