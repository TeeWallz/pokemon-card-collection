

const db = require("../models");
const config = require("../config/auth.config");
const {user: User, role: Role, collection: Collection, refreshToken: RefreshToken} = db;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.getAll = (req, res) => {
    const users = Collection.findAll()
        .then(collections => {
            const response = JSON.stringify(collections, null, 2)
            res.status(200).send(response);
        })
        .catch(err => {
            res.status(500).send({message: err.message});
        });
};

exports.createCollection = (req, res) => {
    const utils =  require("../middleware/utils");

    // Check for missing parameters
    const missingProps = utils.checkPropsExist(req.body, ['name'])
    if(!(missingProps.success)){
        res.status(422).send({ message: "Missing parameters: '" + missingProps.missingString + "'"});
        return
    }

    // Check for empty parameters
    const emptyProps = utils.checkPropsNotEmpty(req.body, ['name'])
    if(!(emptyProps.success)){
        res.status(422).send({ message: "Parameters empty: '" + emptyProps.missingString + "'"});
        return
    }



    // Save User to Database
    Collection.create({
        name: req.body.name,
    })
        .then(collection => {
            res.status(200).send({message: JSON.stringify(collection)});
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};