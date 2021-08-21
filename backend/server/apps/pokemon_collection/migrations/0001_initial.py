# Generated by Django 3.1.2 on 2021-08-21 11:20

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Card',
            fields=[
                ('id', models.CharField(max_length=20, primary_key=True, serialize=False)),
                ('number', models.CharField(blank=True, max_length=10, null=True)),
                ('name', models.CharField(blank=True, max_length=70, null=True)),
                ('supertype', models.CharField(blank=True, max_length=20, null=True)),
                ('hp', models.CharField(blank=True, max_length=10, null=True)),
                ('convertedretreatcost', models.IntegerField(blank=True, db_column='convertedRetreatCost', null=True)),
                ('artist', models.CharField(blank=True, max_length=50, null=True)),
                ('rarity', models.CharField(blank=True, max_length=30, null=True)),
                ('flavortext', models.CharField(blank=True, db_column='flavorText', max_length=200, null=True)),
                ('legality_unlimited', models.CharField(blank=True, max_length=10, null=True)),
                ('legality_standard', models.CharField(blank=True, max_length=10, null=True)),
                ('legality_expanded', models.CharField(blank=True, max_length=10, null=True)),
                ('image_small', models.CharField(blank=True, max_length=100, null=True)),
                ('image_large', models.CharField(blank=True, max_length=100, null=True)),
            ],
            options={
                'db_table': 'card',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Pokemon',
            fields=[
                ('nationaldexnumber', models.IntegerField(db_column='nationalDexNumber', primary_key=True, serialize=False)),
                ('name', models.CharField(blank=True, max_length=45, null=True)),
            ],
            options={
                'db_table': 'pokemon',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Sets',
            fields=[
                ('id', models.CharField(max_length=10, primary_key=True, serialize=False)),
                ('name', models.CharField(blank=True, max_length=30, null=True)),
                ('series', models.CharField(blank=True, max_length=30, null=True)),
                ('printedtotal', models.IntegerField(blank=True, db_column='printedTotal', null=True)),
                ('total', models.IntegerField(blank=True, null=True)),
                ('ptcgocode', models.TextField(blank=True, db_column='ptcgoCode', null=True)),
                ('releasedate', models.DateField(blank=True, db_column='releaseDate', null=True)),
                ('updatedat', models.DateTimeField(blank=True, db_column='updatedAt', null=True)),
                ('symbol', models.CharField(blank=True, max_length=100, null=True)),
                ('logo', models.CharField(blank=True, max_length=100, null=True)),
                ('legality_unlimited', models.CharField(blank=True, max_length=10, null=True)),
                ('legality_standard', models.CharField(blank=True, max_length=10, null=True)),
                ('legality_expanded', models.CharField(blank=True, max_length=45, null=True)),
            ],
            options={
                'db_table': 'sets',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Subtypes',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=20, unique=True)),
            ],
            options={
                'db_table': 'subtypes',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Types',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=20, unique=True)),
            ],
            options={
                'db_table': 'types',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Collection',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('name', models.CharField(max_length=40)),
                ('api_query', models.CharField(max_length=300)),
                ('binder_slot_count', models.IntegerField()),
                ('binder_double_sided', models.BooleanField()),
                ('collect_as_singles', models.BooleanField()),
                ('collect_reverse_holoes', models.BooleanField()),
                ('dollar_amount_limit', models.IntegerField()),
                ('is_set_collection', models.BooleanField()),
                ('created_by', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='CardEvolvesto',
            fields=[
                ('card', models.OneToOneField(on_delete=django.db.models.deletion.DO_NOTHING, primary_key=True, serialize=False, to='pokemon_collection.card')),
            ],
            options={
                'db_table': 'card_evolvesTo',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='CardNationalpokedexnumbers',
            fields=[
                ('card', models.OneToOneField(on_delete=django.db.models.deletion.DO_NOTHING, primary_key=True, serialize=False, to='pokemon_collection.card')),
            ],
            options={
                'db_table': 'card_nationalPokedexNumbers',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='CardSubtypes',
            fields=[
                ('card', models.OneToOneField(on_delete=django.db.models.deletion.DO_NOTHING, primary_key=True, serialize=False, to='pokemon_collection.card')),
            ],
            options={
                'db_table': 'card_subtypes',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='CardTypes',
            fields=[
                ('card', models.OneToOneField(on_delete=django.db.models.deletion.DO_NOTHING, primary_key=True, serialize=False, to='pokemon_collection.card')),
            ],
            options={
                'db_table': 'card_types',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='CollectionCard',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('collection_number', models.IntegerField()),
                ('card', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='pokemon_collection.card')),
                ('collection', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='pokemon_collection.collection')),
            ],
        ),
    ]