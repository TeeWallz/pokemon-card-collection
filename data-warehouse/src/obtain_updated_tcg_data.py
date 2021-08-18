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


print("Connecting to mysql")
import mysql.connector
db=mysql.connector.connect(host=sql_host,user=sql_username,
                  passwd=sql_password,db=sql_database)
cursor = db.cursor()
print("Done")

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

        print("Done")

def load_cards():
    for filename in os.listdir(os.path.join(tcg_json_destination_path, 'pokemon-tcg-data-master/cards/en/')):
        full_filename = os.path.join(tcg_json_destination_path, 'pokemon-tcg-data-master/cards/en/', filename)
        with open(os.path.join(tcg_json_destination_path, 'pokemon-tcg-data-master/sets/en.json')) as json_file:
            data = json.load(json_file)

        for card in data:
            ass = 1
            # types

            # subtype

            # card

            # card_subtypes

            # card_types

            # card_evolvesTo

            # card_nationalPokedexNumbers



def main():
    # get_tcg_data()
    # load_sets()
    load_cards()

if __name__ == "__main__":
    main()