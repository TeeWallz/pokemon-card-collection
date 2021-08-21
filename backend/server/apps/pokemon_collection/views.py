from rest_framework import viewsets
from ..pokemon_collection.models import Card, Sets
from ..pokemon_collection.serializers import CardSerializer, SetSerializer

class CardViewSet(viewsets.ModelViewSet):

    serializer_class = CardSerializer
    queryset = Card.objects.all()[:10]

    def perform_create(self, serializer):
        serializer.save()

    def get_queryset(self):
        return self.queryset.filter()

class SetViewSet(viewsets.ModelViewSet):

    serializer_class = SetSerializer
    queryset = Sets.objects.all().order_by('-releasedate')
    def perform_create(self, serializer):
        serializer.save()

    def get_queryset(self):
        return self.queryset.filter()






# import django_filters
# from rest_framework import viewsets
# from ..pokemon_collection.models import Card
# from ..pokemon_collection.serializers import CardSerializer
#
# class CardViewSet(viewsets.ModelViewSet):
#     serializer_class = CardSerializer
#     queryset = Card.objects.all()
#     filter_fields = ('id', 'set')
#     filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
#
#     def perform_create(self, serializer):
#         serializer.save(created_by=self.request.user)
#
#     def get_queryset(self):
#         return self.queryset.filter()