import yfinance as yf
import pandas as pd
from flask import Flask, jsonify
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
CORS(app)

TICKERS = ["NVDA", "MSFT", "GOOGL", "AAPL", "005930.KS"]

cache = {
    "data": None,
    "timestamp": None
}

CACHE_TIME = 300


def fetch_data():

    data = yf.download(TICKERS, period="5y")

    close = data["Close"].fillna(method="ffill")
    volume = data["Volume"].fillna(0)

    latest = close.iloc[-1]
    first = close.iloc[0]

    growth = ((latest - first) / first * 100)

    ma50 = close.rolling(50).mean().iloc[-1]
    ma200 = close.rolling(200).mean().iloc[-1]

    payload = {
        "dates": close.index.strftime("%Y-%m-%d").tolist(),

        "prices": {
            ticker: close[ticker].tolist()
            for ticker in TICKERS
        },

        "volume": {
            ticker: volume[ticker].tolist()
            for ticker in TICKERS
        },

        "latest": latest.to_dict(),

        "growth": growth.to_dict(),

        "ma50": ma50.to_dict(),

        "ma200": ma200.to_dict(),

        "updated": datetime.utcnow().isoformat()
    }

    return payload


@app.route("/api/stocks")
def stocks():

    global cache

    now = datetime.utcnow()

    if (
        cache["data"] is None
        or (now - cache["timestamp"]).seconds > CACHE_TIME
    ):
        cache["data"] = fetch_data()
        cache["timestamp"] = now

    return jsonify(cache["data"])


if __name__ == "__main__":
    app.run(port=5000, debug=True)