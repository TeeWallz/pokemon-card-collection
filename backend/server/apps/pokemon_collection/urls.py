from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter
from apps.pokemon_collection.views import CardViewSet, SetViewSet

router = DefaultRouter()
router.register("cards", CardViewSet, basename="cards")
router.register("sets", SetViewSet, basename="sets")
pokemon_collection_urlpatterns = [url("api/v1/", include(router.urls))]
