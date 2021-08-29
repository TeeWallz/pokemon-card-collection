from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.


class Card(models.Model):
    id = models.CharField(primary_key=True, max_length=20)
    set = models.ForeignKey('Sets', models.DO_NOTHING, blank=True, null=True)
    set_order_number = models.IntegerField(blank=True, null=True)
    number = models.CharField(max_length=10, blank=True, null=True)
    name = models.CharField(max_length=70, blank=True, null=True)
    supertype = models.CharField(max_length=20, blank=True, null=True)
    hp = models.CharField(max_length=10, blank=True, null=True)
    convertedretreatcost = models.IntegerField(db_column='convertedRetreatCost', blank=True,
                                               null=True)  # Field name made lowercase.
    artist = models.CharField(max_length=50, blank=True, null=True)
    rarity = models.CharField(max_length=30, blank=True, null=True)
    flavortext = models.CharField(db_column='flavorText', max_length=200, blank=True,
                                  null=True)  # Field name made lowercase.
    legality_unlimited = models.CharField(max_length=10, blank=True, null=True)
    legality_standard = models.CharField(max_length=10, blank=True, null=True)
    legality_expanded = models.CharField(max_length=10, blank=True, null=True)
    image_small = models.CharField(max_length=100, blank=True, null=True)
    image_large = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'card'


class CardEvolvesto(models.Model):
    card = models.OneToOneField(Card, models.DO_NOTHING, primary_key=True)
    evolvesto_nationaldexnumber = models.ForeignKey('Pokemon', models.DO_NOTHING,
                                                    db_column='evolvesTo_nationalDexNumber')  # Field name made lowercase.

    class Meta:
        managed = True
        db_table = 'card_evolvesTo'
        unique_together = (('card', 'evolvesto_nationaldexnumber'),)


class CardNationalpokedexnumbers(models.Model):
    card = models.OneToOneField(Card, models.DO_NOTHING, primary_key=True)
    pokemon_nationaldexnumber = models.ForeignKey('Pokemon', models.DO_NOTHING,
                                                  db_column='pokemon_nationalDexNumber')  # Field name made lowercase.

    class Meta:
        managed = True
        db_table = 'card_nationalPokedexNumbers'
        unique_together = (('card', 'pokemon_nationaldexnumber'),)


class CardSubtypes(models.Model):
    card = models.OneToOneField(Card, models.DO_NOTHING, primary_key=True)
    subtype = models.ForeignKey('Subtypes', models.DO_NOTHING)

    class Meta:
        managed = True
        db_table = 'card_subtypes'
        unique_together = (('card', 'subtype'),)


class CardTypes(models.Model):
    card = models.OneToOneField(Card, models.DO_NOTHING, primary_key=True)
    types = models.ForeignKey('Types', models.DO_NOTHING)

    class Meta:
        managed = True
        db_table = 'card_types'
        unique_together = (('card', 'types'),)


class Pokemon(models.Model):
    nationaldexnumber = models.IntegerField(db_column='nationalDexNumber',
                                            primary_key=True)  # Field name made lowercase.
    name = models.CharField(max_length=45, blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'pokemon'


class Sets(models.Model):
    id = models.CharField(primary_key=True, max_length=10)
    name = models.CharField(max_length=30, blank=True, null=True)
    series = models.CharField(max_length=30, blank=True, null=True)
    printedtotal = models.IntegerField(db_column='printedTotal', blank=True, null=True)  # Field name made lowercase.
    total = models.IntegerField(blank=True, null=True)
    ptcgocode = models.TextField(db_column='ptcgoCode', blank=True, null=True)  # Field name made lowercase.
    releasedate = models.DateField(db_column='releaseDate', blank=True, null=True)  # Field name made lowercase.
    updatedat = models.DateTimeField(db_column='updatedAt', blank=True, null=True)  # Field name made lowercase.
    symbol = models.CharField(max_length=100, blank=True, null=True)
    logo = models.CharField(max_length=100, blank=True, null=True)
    legality_unlimited = models.CharField(max_length=10, blank=True, null=True)
    legality_standard = models.CharField(max_length=10, blank=True, null=True)
    legality_expanded = models.CharField(max_length=45, blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'sets'


class Subtypes(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(unique=True, max_length=20)

    class Meta:
        managed = True
        db_table = 'subtypes'


class Types(models.Model):
    name = models.CharField(unique=True, max_length=20)

    class Meta:
        managed = True
        db_table = 'types'




class Collection(models.Model):
    id = models.IntegerField(primary_key=True)
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(User, on_delete=models.DO_NOTHING)
    name = models.CharField(max_length=40)
    api_query = models.CharField(max_length=300)
    binder_slot_count = models.IntegerField()
    binder_double_sided = models.BooleanField()
    collect_as_singles = models.BooleanField()
    collect_reverse_holoes = models.BooleanField()
    dollar_amount_limit = models.IntegerField()
    is_set_collection = models.BooleanField()

    class Meta:
        managed = True

class CollectionCard(models.Model):
    collection = models.ForeignKey(Collection, on_delete=models.DO_NOTHING)
    card = models.ForeignKey(Card, on_delete=models.DO_NOTHING)
    collection_number = models.IntegerField()

    class Meta:
        managed = True
