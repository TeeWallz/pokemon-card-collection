from rest_framework import serializers
from ..pokemon_collection.models import Card, Sets


class CardSerializer(serializers.ModelSerializer):

    class Meta:
        model = Card
        fields = '__all__'
        read_only_fields = (
            "id",
            "set",
            "number",
            "name",
            "supertype",
            "hp",
            "convertedretreatcost",
            "artist",
            "rarity",
            "flavortext",
            "legality_unlimited",
            "legality_standard",
            "legality_expanded",
            "image_small",
            "image_large",
        )

class SetSerializer(serializers.ModelSerializer):

    class Meta:
        model = Sets
        fields = '__all__'
        read_only_fields = (
            "id",
            "name",
            "series",
            "printedtotal",
            "total",
            "ptcgocode",
            "releasedate",
            "symbol",
            "logo",
            "legality_unlimited",
            "legality_standard",
            "legality_expanded",
        )