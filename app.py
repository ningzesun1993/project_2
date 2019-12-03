# import all the libraries
from flask import Flask, render_template, redirect, jsonify
from flask_pymongo import PyMongo
import pandas as pd
from pymongo import MongoClient
import json

# Create an instance of Flask
app = Flask(__name__)
# temp_url = 'mongodb+srv://ningzesun1993:snz19930702@cluster0-4hpl4.mongodb.net/test?retryWrites=true&w=majority'
# client = MongoClient(temp_url)
## Use PyMongo to establish Mongo connection
# mongo = PyMongo(app, uri="mongodb://localhost:27017/housePriceDB")


# Route to render index.html template using data from Mongo
@app.route("/")
def home():
    return render_template("index.html")

@app.route("/heatmap")
def heatmap():
    return render_template("heatmap.html")

@app.route("/cor_all")
def cor_all():
    return render_template("cor_all.html")

@app.route("/cor_top10")
def cor_top10():
    return render_template("cor_top10.html")

@app.route("/describe")
def describe():
    return render_template("describe.html")

@app.route("/scatter")
def scatter():
    return render_template("scatter.html")

@app.route("/background")
def background():
    return render_template("background.html")

@app.route('/box_plot')
def box_plot():
    return render_template('box_plot.html')

# @app.route('/total_data')
# def details():
#     price_data = []
#     for i in range(1460):
#         temp = mongo.db.collection.find_one({'Id': i + 1})
#         price_data.append(temp)
#     return jsonify(price_data)


@app.route('/cat_list')
def cat_list():
    df_train = pd.read_csv('./Resources/train.csv')
    init_list = []
    corrmat = df_train.corr()
    #number of variables for heatmap
    k = 19
    cols = corrmat.nlargest(k, 'SalePrice')['SalePrice'].index
    df_na = df_train.isna().sum().sort_values()
    for i in list(df_train.columns):
        if len(list(df_train[i].unique())) <= 15 and df_na[i] <50 and i in cols:
            init_list.append(i)
    for i in list(df_train.columns):
        if len(list(df_train[i].unique())) <= 15 and df_na[i] <50 and i not in cols:
            init_list.append(i)
    return jsonify(init_list)


@app.route("/metadata/")
def sample_metadata():
    df_train = pd.read_csv('./Resources/train.csv')
    json_train = df_train.to_json(orient='records')
    json_train = json.loads(json_train)
    return jsonify(json_train)

@app.route('/feature')
def feature():
    return render_template('feature.html')

@app.route('/missing')
def missing():
    return render_template('missing.html')

@app.route('/importance')
def importance():
    return render_template('importance.html')

@app.route('/normal')
def normal():
    return render_template('normal.html')

@app.route('/data')
def data():
    return render_template('data.html')
    


if __name__ == "__main__":
    app.run(debug=True)


