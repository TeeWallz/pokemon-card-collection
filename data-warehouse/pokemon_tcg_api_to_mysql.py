import json
import os
from io import BytesIO
from pathlib import Path
import urllib.request
from zipfile import ZipFile
import tempfile 

data_source_location = os.path.join(tempfile.gettempdir(), "tcg_api")
force_download = False

data_sources = {
    "pokedex": {
        "url": "https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/pokedex.json",
    },
    "tcg": {
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

        if not Path(destination_file).is_file():
            Path(destination_directory).mkdir(parents=True, exist_ok=True)
            with urllib.request.urlopen(url) as downloaded_data:
                with open(destination_file,'wb') as output:
                    output.write(downloaded_data.read())
        
        #Load file into memory here
        with open(destination_file) as downloaded_data:
            if url.endswith("json"):
                data = json.load(downloaded_data)
                data_sources[data_source_name]['data'] = data_dict

            elif url.endswith("zip"):
                destination_directory_data = os.path.join(destination_directory, 'data')
                data_sources[data_source_name]['data'] = json.load(f)

                with ZipFile(BytesIO(f.read())) as zfile:
                    zfile.extractall(destination_directory_data)

                    for filename in os.listdir(destination_directory_data):
                        full_path = os.path.join(destination_directory_data, filename)
                        with open(full_path):
                            data_sources[data_source_name]['data']['filename'] = json.load(f)



def main():
    download_data()
    kek = 1

if __name__ == "__main__":
    download_data()