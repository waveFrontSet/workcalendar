from pytest_factoryboy import register

from apps.track.tests import factories

register(factories.EntryFactory)
