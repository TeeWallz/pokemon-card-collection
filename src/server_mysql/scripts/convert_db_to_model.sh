#!/bin/bash

sequelize-auto -o "./app/models/pokemon_tcg_api" -d pokemon_tcg_api -h localhost -u root -p 3306 -x root -e mysql