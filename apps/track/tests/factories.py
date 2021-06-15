import factory

from apps.track.models import Entry


class EntryFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Entry

    day = factory.Faker("date")
    day_type = factory.Faker("random_element", elements=Entry.DayType)
