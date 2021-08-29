import datetime
from io import BytesIO
from urllib.request import urlopen
from zipfile import ZipFile
import json
import os
import urllib.request

github_url = "https://github.com/PokemonTCG/pokemon-tcg-data/archive/refs/heads/master.zip"
tcg_json_url = "https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/pokedex.json"
tcg_json_destination_path = "/tmp/pokemon-tcg-data"

sql_host = "localhost"
sql_username = "pokemon_card_collection"
sql_password = "pokemon_card_collection"
sql_database = "pokemon_card_collection"

insert_card_sql = """
INSERT INTO `pokemon_card_collection`.`card`
(`id`, `set_id`, set_order_number, `number`, `name`, `supertype`, `hp`, `convertedRetreatCost`, `artist`,`rarity`,
`flavorText`,`legality_unlimited`,`legality_standard`,`legality_expanded`,`image_small`,`image_large`)
VALUES (%s, %s,%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s) as new
ON DUPLICATE KEY UPDATE
	name=new.name, set_order_number=new.set_order_number, supertype=new.supertype, hp=new.hp, convertedRetreatCost=new.convertedRetreatCost,artist=new.artist,rarity=new.rarity,
	flavorText=new.flavorText,legality_unlimited=new.legality_unlimited,legality_standard=new.legality_standard,
	legality_expanded=new.legality_expanded,image_small=new.image_small,image_large=new.image_large

"""


print("Connecting to mysql")
import mysql.connector
db=mysql.connector.connect(host=sql_host,user=sql_username,
                  passwd=sql_password,db=sql_database)
cursor = db.cursor(dictionary=True)
print("Done")


#MySQL Functions
def get_query_result(sql):
    cursor.execute(sql)
    kek =  cursor.fetchall()
    return kek


def load_pokedex():
    # Load Pokemon
    # Load raw json into dictionary
    print(f"Downloading Pokedex via {tcg_json_url}")

    with urllib.request.urlopen(tcg_json_url) as url:
        raw_pokemon = json.loads(url.read().decode())
    print("Done")

    # Process data
    print("Processing Pokedex")


def get_tcg_data():
    lel = os.path.join(tcg_json_destination_path, "pokemon-tcg-data-master/README.md")
    if not os.path.isfile(os.path.join(tcg_json_destination_path, "pokemon-tcg-data-master/README.md")):
        print(f"Downloading {github_url} to {tcg_json_destination_path}")
        with urlopen(github_url) as zipresp:
            with ZipFile(BytesIO(zipresp.read())) as zfile:
                zfile.extractall('/tmp/pokemon-tcg-data')
    else:
        print("TCG Data present, skipping download")


def load_sets():
    # Opening JSON file
    with open(os.path.join(tcg_json_destination_path, 'pokemon-tcg-data-master/sets/en.json')) as json_file:
        data = json.load(json_file)

    set_sql = """
    INSERT INTO pokemon_card_collection.sets (id, name, series, printedTotal, total, ptcgoCode, releaseDate, updatedAt, symbol, logo, legality_unlimited, legality_standard, legality_expanded)
    VALUES ( %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s) as new
    ON DUPLICATE KEY UPDATE name=new.name, series=new.series, printedTotal=new.printedTotal, total=new.total, ptcgoCode=new.ptcgoCode, releaseDate=new.releaseDate, updatedAt=new.updatedAt, symbol=new.symbol, logo=new.logo, legality_unlimited=new.legality_unlimited, legality_standard=new.legality_standard, legality_expanded=new.legality_expanded
    ;
    """
    for set in data:
        insert_values = [
            set['id'],
            set['name'],
            set['series'],
            set['printedTotal'],
            set['total'],
            None if 'ptcgoCode' not in set else set['ptcgoCode'],
            datetime.datetime.strptime(set['releaseDate'], "%Y/%m/%d"),
            set['updatedAt'],
            set['images']['symbol'],
            set['images']['logo'],
            None if 'unlimited' not in set['legalities'] else set['legalities']['unlimited'],
            None if 'standard' not in set['legalities'] else set['legalities']['standard'],
            None if 'expanded' not in set['legalities'] else set['legalities']['expanded'],
        ]
        cursor.execute(set_sql, insert_values)

    db.commit()
    print("Done")

def load_cards():
    type_insert_sql = "INSERT IGNORE INTO `pokemon_card_collection`.`types` (`name`) VALUES (%s);"
    subtype_insert_sql = "INSERT IGNORE INTO `pokemon_card_collection`.`subtypes` (`name`) VALUES (%s);"

    # Sets to loop through
    sets = get_query_result("SELECT * FROM `pokemon_card_collection`.`sets`")
    # Current types, to check if we need to insert a new type
    saved_types = get_query_result("SELECT * FROM `pokemon_card_collection`.`types`")
    saved_subtypes = get_query_result("SELECT * FROM `pokemon_card_collection`.`subtypes`")

    i = 1
    for set in sets:
        with open(os.path.join(tcg_json_destination_path, 'pokemon-tcg-data-master/cards/en/', "{}.json".format(set['id']))) as json_file:
            cards = json.load(json_file)

        set_order_number = 0
        for card in cards:
            set_order_number = set_order_number + 1
            # Check if any types are new
            if 'types' in card.keys():
                for type in card['types']:
                    if not any(saved_type['name'] == type for saved_type in saved_types):
                        cursor.execute(type_insert_sql, (type,))
                        db.commit()
                        saved_types = get_query_result("SELECT * FROM `pokemon_card_collection`.`types`")

            # Check if any subtypes are new
            if 'subtypes' in card.keys():
                for subtype in card['subtypes']:
                    if not any(saved_subtype['name'] == subtype for saved_subtype in saved_subtypes):
                        cursor.execute(subtype_insert_sql, (subtype,))
                        db.commit()
                        saved_subtypes = get_query_result("SELECT * FROM `pokemon_card_collection`.`subtypes`")


            card_insert_values = [
                card['id'],
                set['id'],
                set_order_number,
                card['number'],
                card['name'],
                card['supertype'],
                None if 'hp' not in card else card['hp'],
                None if 'convertedRetreatCost' not in card else card['convertedRetreatCost'],
                None if 'artist' not in card else card['artist'],
                None if 'rarity' not in card else card['rarity'],
                None if 'flavorText' not in card else card['flavorText'],
                None if 'unlimited' not in card['legalities'] else card['legalities']['unlimited'],
                None if 'standard' not in card['legalities'] else card['legalities']['standard'],
                None if 'expanded' not in card['legalities'] else card['legalities']['expanded'],
                card['images']['small'],
                card['images']['large'],
            ]
            cursor.execute(insert_card_sql, card_insert_values)
            kek = 1
            # card_subtypes

            # card_types

            # card_evolvesTo

            # card_nationalPokedexNumbers
        print("{}/{}".format(i, len(sets)))
        i = i + 1
    db.commit()


def main():
    get_tcg_data()
    load_sets()
    load_cards()

if __name__ == "__main__":
    main()