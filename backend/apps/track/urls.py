from rest_framework import routers

from .views import EntryViewSet

router = routers.SimpleRouter(trailing_slash=False)
router.register(r"entries", EntryViewSet)

app_name = "track"
urlpatterns = router.urls
