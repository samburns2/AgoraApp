# Authors: Sam Burns, Simran Judge, Jack Ryan
# models.py: Describes the two models (classes), Event and Alumni, that will be stored in the database.

from django.db import models


# Class Name: Event
# Parameters: Model
# Description: This defines our model, Event, and specifies that it is a Django model which can be stored in the database.
class Event(models.Model):
    """Model representing an Event."""
    name = models.CharField(max_length=200, help_text='Enter an event name')
    description = models.TextField(
        max_length=1500, help_text='Enter an event description')
    location = models.CharField(
        max_length=75, help_text='Enter location of event')
    date = models.DateField()
    time = models.TimeField()
    numAttend = models.IntegerField(default=0)
    approved = models.BooleanField(default=False)

    event_fName = models.CharField(
        max_length=45, help_text='Enter your first name', null=True)
    event_lName = models.CharField(
        max_length=45, help_text='Enter your last name', null=True)
    event_email = models.EmailField(null=True)
    event_school = models.CharField(
        max_length=50, help_text='Enter school graduated from', null=True)
    event_yearGrad = models.PositiveSmallIntegerField(
        help_text='Enter graduation year', null=True)
    event_major = models.CharField(
        max_length=70, help_text='Enter your major', null=True)

    def __str__(self):
        """String for representing the Model object."""
        return self.name


# Class Name: Alumni
# Parameters: Model
# Description: This defines our model, Alumni, and specifies that it is a Django model which can be stored in the database.
class Alumni(models.Model):
    fName = models.CharField(max_length=45, help_text='Enter your first name')
    lName = models.CharField(max_length=45, help_text='Enter your last name')
    email = models.EmailField()
    school = models.CharField(
        max_length=50, help_text='Enter school graduated from')
    yearGrad = models.PositiveSmallIntegerField(
        help_text='Enter graduation year')
    major = models.CharField(max_length=70, help_text='Enter your major')
    attended = models.ForeignKey(Event, on_delete=models.CASCADE)

    def __str__(self):
        return self.fName + ' ' + self.lName
