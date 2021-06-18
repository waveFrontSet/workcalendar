import pytest
from django.urls import reverse

from apps.track.models import Entry

pytestmark = pytest.mark.django_db


def test_get_entries(authed_client, entry):
    response = authed_client.get(reverse("track:entry-list"))
    assert response.json() == [
        {"id": entry.pk, "day": entry.day, "day_type": entry.day_type.value}
    ]


def test_get_single_entry(authed_client, entry):
    response = authed_client.get(reverse("track:entry-detail", kwargs={"pk": entry.pk}))
    assert response.json() == {
        "id": entry.pk,
        "day": entry.day,
        "day_type": entry.day_type.value,
    }


@pytest.mark.parametrize("day_type", Entry.DayType.values)
def test_create_entry(authed_client, day_type):
    response = authed_client.post(
        reverse("track:entry-list"), data={"day": "2021-01-01", "day_type": day_type}
    )
    assert response.status_code == 201
