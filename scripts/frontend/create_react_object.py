import os
from shutil import copyfile
from pathlib import Path

db_obj_dir = os.listdir("../../frontend/src/components/database_objects/")

print(dir)
new_name = input("Please input object name: ")
#new_name = "newobject"
old_dir = "../../frontend/src/components/database_objects/template/"
new_dir = os.path.join("../../frontend/src/components/database_objects/", new_name)

Path(new_dir).mkdir(parents=True, exist_ok=True)
print(f'Make dir {new_dir}')

files = ['Template.js', 'TemplatesActions.js', 'TemplatesReducer.js', 'TemplatesTypes.js']

for file in files:
    old_file = os.path.join(old_dir, file)
    new_file_name = file.replace("Template", new_name.title())
    new_file = os.path.join(new_dir, new_file_name)

    if not os.path.isfile(new_file):
        # copyfile(old_file, new_file)
        with open(old_file) as f:
            s = f.read()

        with open(new_file, 'w') as f:
            s = s.replace('template', new_name.lower()).replace('TEMPLATE', new_name.upper()).replace('Template', new_name.title())
            f.write(s)

print("Make sure to add reducer to Reducer.js!")




