import pytest
from django.urls import resolve, reverse

pytestmark = pytest.mark.django_db


def test_all_entries():
    assert reverse("track:entry-list") == "/api/v1/track/entries"
    assert resolve("/api/v1/track/entries").view_name == "track:entry-list"


def test_single_entry(entry):
    assert (
        reverse("track:entry-detail", kwargs={"pk": entry.pk})
        == f"/api/v1/track/entries/{entry.pk}"
    )
    assert (
        resolve(f"/api/v1/track/entries/{entry.pk}").view_name == "track:entry-detail"
    )
