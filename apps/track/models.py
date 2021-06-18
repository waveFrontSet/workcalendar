from django.db import models


class Entry(models.Model):
    """Calendar entry tracking information about a given day"""

    class DayType(models.TextChoices):
        HOMEOFFICE = "homeoffice", "Day spent in homeoffice"
        WORK = "work", "Commuted to work"
        SICK = "sick", "Called in sick"
        VACATION = "vacation", "Took the day off"
        HOLIDAY = "holiday", "Day off because of a holiday"

    day = models.DateField(unique=True)
    day_type = models.CharField(max_length=20, choices=DayType.choices)

    def __str__(self):
        return f"{self.day}: {self.day_type}"
