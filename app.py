# import all the libraries
from flask import Flask, render_template, redirect, jsonify
from flask_pymongo import PyMongo
import pandas as pd
from pymongo import MongoClient
# import json

# Create an instance of Flask
app = Flask(__name__)

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


@app.route("/metadata/<sample>")
def sample_metadata(sample):
    df_train = pd.read_csv('./Resources/train.csv')
    temp_list = []
    temp = sorted(list(df_train[sample].unique()))
    unique_list = []
    for i in temp:
        unique_list.append(str(i))
    for i in df_train[sample].unique():
        temp_list.append(sorted(list(df_train.loc[df_train[sample] == i,:]['SalePrice'])))
    result = {'x_axis': unique_list, 'y_axis': temp_list}
    return jsonify(result)

@app.route('/scattor')
def scattor():
    return render_template('index2.html')


@app.route('/data')
def data():
    # Find one record of data from the mongo database
    # Return template and data
    # data = ''
    # df_train = pd.read_csv('./Resources/train.csv')
    # uri = "mongodb://localhost:27017"
    # client = MongoClient(uri)
    # dbnames = client.list_database_names()
    # if 'housePriceDB' not in dbnames:
    #     print('redo??')
    #     # Update the Mongo database using update and upsert=True
    #     # Redirect back to home page
    #     db = client.get_database('housePriceDB')
    #     collection = db.collection
    #     # turn the dataframe to json
    #     json_train = df_train.to_json(orient='records')
    #     json_train = json.loads(json_train)
    #     # load the json to mongo db
    #     for i in json_train:
    #         collection.insert_one(i)
    


if __name__ == "__main__":
    app.run(debug=True)


