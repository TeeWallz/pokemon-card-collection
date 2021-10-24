from flask import Flask, request, jsonify, make_response
from flask_sqlalchemy import SQLAlchemy
from marshmallow_sqlalchemy import ModelSchema
from marshmallow import fields

mysql_user = "root"
mysql_password = "root"
mysql_host = "localhost"
mysql_port = "3306"

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI']= f"mysql+pymysql://{mysql_user}:{mysql_password}@{mysql_host}:{mysql_port}/<mysql_db>"
db = SQLAlchemy(app)


@app.route('/products', methods = ['GET'])
def index():
    get_products = ModelSchema.Set.query.all()
    product_schema = ProductSchema(many=True)
    products = product_schema.dump(get_products)
    return make_response(jsonify({"product": products}))
