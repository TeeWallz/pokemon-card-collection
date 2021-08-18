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
sql_username = "pokemon-card-collection"
sql_password = "pokemon-card-collection"
sql_database = "pokemon-card-collection"


# Load Pokemon
# Load raw json into dictionary
# print(f"Downloading Pokedex via {tcg_json_url}")
#
# with urllib.request.urlopen(tcg_json_url) as url:
#     raw_pokemon = json.loads(url.read().decode())
# print("Done")

# Process data
print("Processing Pokedex")
print("Connecting to mysql")
import mysql.connector
db=mysql.connector.connect(host=sql_host,user=sql_username,
                  passwd=sql_password,db=sql_database)
cursor = db.cursor()
print("Done")

# data-warehouse/src/obtain_updated_tcg_data.py:36



# cursor.close()
lel = os.path.join(tcg_json_destination_path, "pokemon-tcg-data-master/README.md")
if not os.path.isfile(os.path.join(tcg_json_destination_path, "pokemon-tcg-data-master/README.md")):
    print(f"Downloading {github_url} to {tcg_json_destination_path}")
    with urlopen(github_url) as zipresp:
        with ZipFile(BytesIO(zipresp.read())) as zfile:
            zfile.extractall('/tmp/pokemon-tcg-data')
else:
    print("TCG Data present, skipping download")

# Read sets data
# Opening JSON file
with open(os.path.join(tcg_json_destination_path, 'pokemon-tcg-data-master/sets/en.json')) as json_file:
    data = json.load(json_file)

set_sql = """
INSERT INTO pokemon-card-collection.sets (id, name, series, printedTotal, total, ptcgoCode, releaseDate, updatedAt, symbol, logo, legality_unlimited, legality_standard, legality_expanded)
VALUES ( %s, %s, %s, %s, %s, %s, %s, %s, %s, %s);
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

print("Done")
# Load Sets

