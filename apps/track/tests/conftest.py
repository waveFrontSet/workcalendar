import pytest
from pytest_factoryboy import register
from rest_framework.test import APIClient

from . import factories

register(factories.EntryFactory)


@pytest.fixture
def authed_client(admin_user):
    client = APIClient()
    client.force_authenticate(user=admin_user)
    return client
