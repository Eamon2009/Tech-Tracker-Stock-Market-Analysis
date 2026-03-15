import yfinance as yf
import pandas as pd
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

COMPANIES = {
    "AAPL": {
        "name": "Apple",
        "logo": "https://logo.clearbit.com/apple.com"
    },
    "MSFT": {
        "name": "Microsoft",
        "logo": "https://logo.clearbit.com/microsoft.com"
    },
    "GOOGL": {
        "name": "Google",
        "logo": "https://logo.clearbit.com/google.com"
    },
    "NVDA": {
        "name": "NVIDIA",
        "logo": "https://logo.clearbit.com/nvidia.com"
    }
}

@app.route("/api/stocks")
def stocks():

    tickers = list(COMPANIES.keys())

    df = yf.download(
    tickers,
    period="5y",
    interval="1d",
    group_by="ticker",
    auto_adjust=True
)

    close = df["Close"].fillna(method="ffill")

    ma50 = close.rolling(50).mean()
    ma200 = close.rolling(200).mean()

    returns = close.pct_change().dropna()

    payload = {
        "dates": close.index.strftime("%Y-%m-%d").tolist(),
        "companies": COMPANIES,
        "prices": {},
        "ma50": {},
        "ma200": {},
        "returns": {}
    }

    for t in tickers:

        payload["prices"][t] = close[t].tolist()
        payload["ma50"][t] = ma50[t].fillna(None).tolist()
        payload["ma200"][t] = ma200[t].fillna(None).tolist()
        payload["returns"][t] = returns[t].tolist()

    return jsonify(payload)

if __name__ == "__main__":
    app.run(port=5000, debug=True)