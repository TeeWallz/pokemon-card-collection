import json
import os
from io import BytesIO
from pathlib import Path
import urllib.request
from zipfile import ZipFile
import zipfile
import tempfile 

# data_source_location = os.path.join(tempfile.gettempdir(), "tcg_api")
data_source_location = os.path.join(os.path.dirname(os.path.realpath(__file__)), "tcg_api")
force_download = False

data_sources = {
    "pokedex": {
        "url": "https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/pokedex.json",
    },
    "tcg_api": {
        "url": "https://github.com/PokemonTCG/pokemon-tcg-data/archive/refs/heads/master.zip"
    },
}

database = {
    'pokemon': {},
    'cards': {},

}

def download_data():
    for data_source_name, value in data_sources.items():
        url = value['url']
        extension = Path(url).suffix
        destination_directory = os.path.join(data_source_location, data_source_name)
        destination_file = os.path.join(destination_directory, f"{data_source_name}{extension}")

        if not Path(destination_file).is_file() or (Path(destination_file).is_file() and force_download):
            Path(destination_directory).mkdir(parents=True, exist_ok=True)
            with urllib.request.urlopen(url) as downloaded_data:
                with open(destination_file,'wb') as output:
                    output.write(downloaded_data.read())
        
        #Load file into memory here
        with open(destination_file) as downloaded_data:
            if extension == ".json":
                data_dict = json.load(downloaded_data)
                data_sources[data_source_name]['data'] = data_dict

            elif extension == ".zip":
                destination_directory_data = os.path.join(destination_directory, 'data')

                with zipfile.ZipFile(destination_file, 'r') as zip_ref:
                    zip_ref.extractall(destination_directory_data)

                if data_source_name == 'tcg_api':
                    data_sources[data_source_name]['data'] = {}

                    # sets
                    data_sources[data_source_name]['data']['sets'] = {}
                    set_path = os.path.join(destination_directory_data, "pokemon-tcg-data-master/sets")
                    for filename in os.listdir(set_path):
                        langauge_code = filename.replace(".json", "")
                        set_language_file = os.path.join(set_path, filename)
                        data_sources[data_source_name]['data']['sets'][langauge_code] = {}

                        with open(set_language_file) as set_language_downloaded_data:
                            data_dict = json.load(set_language_downloaded_data)
                            for set in data_dict:
                                data_sources[data_source_name]['data']['sets'][langauge_code][set['id']] = set

                    #cards
                    cards_path = os.path.join(destination_directory_data, "pokemon-tcg-data-master/cards")

                    # For each language
                    for cards_language in os.listdir(cards_path):
                        cards_language_dir = os.path.join(cards_path, cards_language)

                        # For each set in language
                        for set_in_language in os.listdir(cards_language_dir):
                            set_in_language_dir = os.path.join(cards_language_dir, set_in_language)
                            set_code = set_in_language.replace(".json", "")

                            with open(set_in_language_dir) as set_data:
                                set_data = json.load(set_data)
                                data_sources[data_source_name]['data']['sets'][langauge_code][set['id']]['cards'] = {}

                                for card in set_data:
                                    data_sources[data_source_name]['data']['sets'][langauge_code][set['id']]['cards'][card['id']] = card
                                ke = 1

                    #decks
                    decks_path = os.path.join(destination_directory_data, "pokemon-tcg-data-master/decks")


                    for filename in os.listdir(destination_directory_data):
                        full_path = os.path.join(destination_directory_data, filename)
                        with open(full_path) as f:
                            data_sources[data_source_name]['data']['filename'] = json.load(f)



def main():
    download_data()
    kek = 1

if __name__ == "__main__":
    download_data()