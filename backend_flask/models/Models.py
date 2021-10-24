from sqlalchemy import create_engine, Column, Integer, String, ForeignKey, Table, Date, DateTime, MetaData, \
    ForeignKeyConstraint, UniqueConstraint
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import relationship, backref
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import logging

from src.database_objects.base import Base

logger = logging.getLogger(__name__)
logging.basicConfig(
    level=logging.INFO,
    format='[%(asctime)s] {%(pathname)s:%(lineno)d}\t%(levelname)s - \t%(message)s',
    datefmt='%H:%M:%S'
)


class TcgData:
    engine = None

    def __init__(self, engine_string):
        self.engine = create_engine(engine_string)

        Session = sessionmaker()
        Session.configure(bind=self.engine)
        self.session = Session()
        # Base.query = self.session.query_property()

    def drop_and_reflect_database(self):
        logger.info("Wiping and refreshing database")
        Base.metadata.drop_all(bind=self.engine, checkfirst=True)
        Base.metadata.create_all(self.engine)


# Parent Attributes / Enums
class Series(Base):
    __tablename__ = "series"
    name = Column(String(50), primary_key=True)

    def __init__(self, name):
        self.name = name


class Language(Base):
    __tablename__ = "language"
    code = Column(String(20), primary_key=True)
    name = Column(String(50))

    def __init__(self, code):
        self.code = code


class Legality(Base):
    __tablename__ = "legality"
    name = Column(String(20), primary_key=True)

    def __init__(self, name):
        self.name = name




class Rarity(Base):
    __tablename__ = "rarity"
    name = Column(String(20), primary_key=True)

    def __init__(self, name):
        self.name = name


class SuperType(Base):
    __tablename__ = "supertype"
    name = Column(String(20), primary_key=True)

    def __init__(self, name):
        self.name = name


class Artist(Base):
    __tablename__ = "artist"
    name = Column(String(50), primary_key=True)

    def __init__(self, name):
        self.name = name


# Main Objects
class Set(Base):
    __tablename__ = "set"
    id = Column(String(20), primary_key=True)
    series = Column(String(50), ForeignKey('series.name'))
    printedTotal = Column(Integer)
    total = Column(Integer)
    ptcgoCode = Column(String(20))
    releaseDate = Column(Date)
    updatedAt = Column(DateTime)


# Localization and many-to-many junctions
class SetLocalisation(Base):
    __tablename__ = "set_localisation"
    language = Column(String(20), ForeignKey('language.code'), primary_key=True)
    set = Column(String(20), ForeignKey('set.id'), primary_key=True)
    name = Column(String(50))


class SetLegality(Base):
    __tablename__ = "set_legality"
    set = Column(String(20), ForeignKey('set.id'), primary_key=True)
    legality = Column(String(20), ForeignKey('legality.name'), primary_key=True)


class SetImageType(Base):
    __tablename__ = "set_image_type"
    name = Column(String(20), primary_key=True)

    def __init__(self, name):
        self.name = name


class SetImage(Base):
    __tablename__ = "set_image"
    set = Column(String(20), ForeignKey('set.id'), primary_key=True)
    imageType = Column(String(20), ForeignKey('set_image_type.name'), primary_key=True)
    language = language = Column(String(20), ForeignKey('language.code'), primary_key=True)
    url = Column(String(200))


# Card and constituent fields
class Card(Base):
    __tablename__ = "card"
    id = Column(String(20), primary_key=True, comment="generated field from '{set}-{number}'")
    set = Column(String(20), ForeignKey('set.id'))
    number = Column(String(20))
    hp = Column(String(20))
    supertype = Column(String(20), ForeignKey('supertype.name'))
    rarity = Column(String(20), ForeignKey('rarity.name'))


# Localization and many-to-many junctions
class CardLocalisation(Base):
    __tablename__ = "card_localisation"
    card = Column(String(20), ForeignKey('card.id'), primary_key=True)
    language = Column(String(20), ForeignKey('language.code'), primary_key=True)
    name = Column(String(100))
    flavor_text = Column(String(100))


class CardEnergyType(Base):
    __tablename__ = "card_energytype"
    card = Column(String(20), ForeignKey('card.id'), primary_key=True)
    energy = Column(String(20), ForeignKey('energy_type.name'), primary_key=True)


class CardImageType(Base):
    __tablename__ = "card_image_type"
    name = Column(String(20), primary_key=True)

    def __init__(self, name):
        self.name = name


class CardImage(Base):
    __tablename__ = "card_image"
    card = Column(String(20), ForeignKey('card.id'), primary_key=True)
    imageType = Column(String(20), ForeignKey('card_image_type.name'), primary_key=True)
    language = language = Column(String(20), ForeignKey('language.code'), primary_key=True)
    url = Column(String(200))


class CardLegalityOverride(Base):
    __tablename__ = "card_legality_override"
    card = Column(String(20), ForeignKey('card.id'), primary_key=True)
    legality = Column(String(20), ForeignKey('legality.name'), primary_key=True)


class CardEvolution(Base):
    __tablename__ = "card_evolution"
    card = Column(String(20), ForeignKey('card.id'), primary_key=True)
    pokemonName = Column(String(100), primary_key=True)
    nationalPokedexNumber = Column(String(5))

class CardAbility(Base):
    __tablename__ = "card_ability"
    card = Column(String(20), ForeignKey('card.id'), primary_key=True)
    index = Column(Integer, primary_key=True, index=True)
    convertedEnergyCost = Column(Integer)
    abilityType = Column(String(20))


class CardAbilityLocalisation(Base):
    __tablename__ = "card_ability_localisation"
    pk = Column(Integer, primary_key=True, autoincrement=True, default=0)
    card = Column(String(20), ForeignKey('card_ability.card'), index=True)
    ability_index = Column(Integer, ForeignKey('card_ability.index'), index=True)
    language = Column(String(20), ForeignKey('language.code'), index=True)
    text = Column(String(1000))
    __table_args__ = (
        UniqueConstraint('ability_index', 'language', 'card'),
    )


class CardAttack(Base):
    __tablename__ = "card_attack"
    card = Column(String(20), ForeignKey('card.id'), primary_key=True)
    index = Column(Integer, primary_key=True, index=True)
    damage = Column(String(200))
    convertedEnergyCost = Column(Integer)


class CardAttackLocalisation(Base):
    __tablename__ = "card_attack_localisation"
    pk = Column(Integer, primary_key=True, autoincrement=True, default=0)
    language = Column(String(20), ForeignKey('language.code'), index=True)
    card = Column(String(20), ForeignKey('card_attack.card'), index=True)
    attack_index = Column(Integer, ForeignKey('card_attack.index'), index=True)
    text = Column(String(500))
    __table_args__ = (
        UniqueConstraint('language', 'card', 'attack_index'),
    )



class CardAttackCost(Base):
    __tablename__ = "card_attack_cost"
    pk = Column(Integer, primary_key=True, autoincrement=True)
    card = Column(String(20), ForeignKey('card_attack.card'), index=True)
    attack_index = Column(Integer, ForeignKey('card_attack.index'), index=True)
    energy_type = Column(String(20), ForeignKey('energy_type.name'), index=True)
    amount = Column(Integer)
    __table_args__ = (
        UniqueConstraint('card', 'attack_index', 'energy_type'),
    )


class EnergyType(Base):
    __tablename__ = "energy_type"
    name = Column(String(20), primary_key=True)

    def __init__(self, name):
        self.name = name

class CardRetreatCost(Base):
    __tablename__ = "card_retreat_cost"
    pk = Column(Integer, primary_key=True, autoincrement=True)
    card = Column(String(20), ForeignKey('card.id'), index=True)
    energy_type = Column(String(20), ForeignKey('energy_type.name'), index=True)
    amount = Column(Integer)
    __table_args__ = (
        UniqueConstraint('card', 'energy_type'),
    )

class CardWeakness(Base):
    __tablename__ = "card_weakness"
    pk = Column(Integer, primary_key=True, autoincrement=True)
    card = Column(String(20), ForeignKey('card.id'), index=True)
    energy_type = Column(String(20), ForeignKey('energy_type.name'), index=True)
    value = Column(String(10))
    __table_args__ = (
        UniqueConstraint('card', 'energy_type'),
    )


class CardNationalPokedexNumbers(Base):
    __tablename__ = "card_NationalPokedexNumbers"
    card = Column(String(20), ForeignKey('card.id'), primary_key=True)
    nationalPokedexNumber = Column(Integer, primary_key=True)


# Deck and constituent fields
class Deck(Base):
    __tablename__ = "deck"
    id = Column(String(20), primary_key=True)
    set = Column(String(20), ForeignKey('set.id'))


class DeckLocalisation(Base):
    __tablename__ = "deck_localisation"
    deck = Column(String(20), ForeignKey('deck.id'), primary_key=True)
    language = Column(String(20), ForeignKey('language.code'), primary_key=True)
    name = Column(String(20))


class DeckType(Base):
    __tablename__ = "deck_type"
    deck = Column(String(20), ForeignKey('deck.id'), primary_key=True)
    energy = Column(String(20), ForeignKey('energy_type.name'), primary_key=True)


class DeckCard(Base):
    __tablename__ = "deck_card"
    deck = Column(String(20), ForeignKey('deck.id'), primary_key=True)
    id = Column(String(20), primary_key=True)
    card = Column(String(20), ForeignKey('card.id'))
    rarity = Column(String(20), ForeignKey('rarity.name'))

# ed_user = Series('hehe')
# session.merge(ed_user)
# session.commit()
#
# results = session.query(Series).all()
# logger.info(results)
