import yfinance as yf
import pandas as pd
import requests
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

TICKERS = {
    "NVDA":"nvidia.com",
    "MSFT":"microsoft.com",
    "GOOGL":"google.com",
    "AAPL":"apple.com"
}

def get_news():

    url = "https://news.google.com/rss/search?q=stock+market"

    r = requests.get(url)

    import xml.etree.ElementTree as ET

    root = ET.fromstring(r.content)

    items = []

    for item in root.findall(".//item")[:6]:

        items.append({
            "title":item.find("title").text,
            "link":item.find("link").text
        })

    return items


@app.route("/api/stocks")
def stocks():

    tickers = list(TICKERS.keys())

    df = yf.download(tickers,period="5y")

    close = df["Close"].fillna(method="ffill")

    returns = close.pct_change().dropna()

    ma50 = close.rolling(50).mean()
    ma200 = close.rolling(200).mean()

    payload = {

        "dates":close.index.strftime("%Y-%m-%d").tolist(),

        "prices":{
            t:close[t].tolist()
            for t in tickers
        },

        "ma50":{
            t:ma50[t].fillna(0).tolist()
            for t in tickers
        },

        "ma200":{
            t:ma200[t].fillna(0).tolist()
            for t in tickers
        },

        "histogram":{
            t:returns[t].tolist()
            for t in tickers
        },

        "latest":close.iloc[-1].to_dict(),

        "growth":((close.iloc[-1]-close.iloc[0])/close.iloc[0]*100).to_dict(),

        "logos":TICKERS,

        "news":get_news()

    }

    return jsonify(payload)


if __name__=="__main__":
    app.run(port=5000,debug=True)