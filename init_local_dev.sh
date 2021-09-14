#!/bin/bash

sudo pacman -S gcc
sudo pacman -S mysql



cd "$(dirname "$0")"

cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
deactivate

cd ../frontend
npm install
