import json
import os
import urllib.request
import zipfile
from pathlib import Path

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
                    sets_dict = data_sources[data_source_name]['data']['sets']

                    set_path = os.path.join(destination_directory_data, "pokemon-tcg-data-master/sets")
                    for filename in os.listdir(set_path):
                        langauge_code = filename.replace(".json", "")
                        set_language_file = os.path.join(set_path, filename)
                        sets_dict[langauge_code] = {}

                        with open(set_language_file) as set_language_downloaded_data:
                            data_dict = json.load(set_language_downloaded_data)
                            for set in data_dict:
                                sets_dict[langauge_code][set['id']] = set

                    for object_type in ('cards', 'decks'):
                        object_dir = os.path.join(destination_directory_data, "pokemon-tcg-data-master", object_type)
                        data_sources[data_source_name]['data'][object_type] = {}
                        object_dict = data_sources[data_source_name]['data'][object_type]

                        # For each language
                        for language in os.listdir(object_dir):
                            language_dir = os.path.join(object_dir, language)
                            object_dict[language] = {}

                            # For each file in language
                            for object_filename in os.listdir(language_dir):
                                object_filename_full = os.path.join(language_dir, object_filename)
                                set_code = object_filename.replace('.json', '')
                                object_dict[language][set_code] = {}

                                with open(object_filename_full) as object_f:
                                    object_data = json.load(object_f)
                                    sets_dict[language][set_code][object_type] = {}

                                    for single_object in object_data:
                                        if 'id' in single_object:
                                            object_dict[language][set_code][single_object['id']] = single_object
                                            sets_dict[language][set_code][object_type][single_object['id']] = object_dict[language][set_code][single_object['id']]
                                        else:
                                            print("Skipping {}/{}/{} due to having no unique ID from the tcg api.".format(object_type, set_code, single_object['name']))
    return data_sources

def generate_sql(data_sources):


    pass


def main():
    data_sources = download_data()
    generate_sql(data_sources)
    kek = 1

if __name__ == "__main__":
    main()