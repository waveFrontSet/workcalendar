import pytest

pytestmark = pytest.mark.django_db


def test_entry_str(entry):
    entry_str = str(entry)
    assert str(entry.day) in entry_str
    assert str(entry.day_type) in entry_str
