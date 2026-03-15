import yfinance as yf
import pandas as pd
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

COMPANIES = {
    "Apple": {
        "name": "Apple",
        "logo": "https://logo.clearbit.com/apple.com"
    },
    "MSFT": {
        "name": "Microsoft",
        "logo": "https://logo.clearbit.com/microsoft.com"
    },
    "GOOGL": {
        "name": "Alphabet",
        "logo": "https://logo.clearbit.com/abc.xyz"
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
        auto_adjust=True,
        threads=True
    )

    close = pd.DataFrame()

    for t in tickers:
        close[t] = df[t]["Close"]

    close = close.ffill()

    ma50 = close.rolling(50).mean()
    ma200 = close.rolling(200).mean()

    returns = close.pct_change()

    payload = {
        "dates": close.index.strftime("%Y-%m-%d").tolist(),
        "companies": COMPANIES,
        "prices": {},
        "ma50": {},
        "ma200": {},
        "returns": {}
    }

    for t in tickers:

        payload["prices"][t] = close[t].astype(float).tolist()

        payload["ma50"][t] = [
            None if pd.isna(x) else float(x)
            for x in ma50[t]
        ]

        payload["ma200"][t] = [
            None if pd.isna(x) else float(x)
            for x in ma200[t]
        ]

        payload["returns"][t] = [
            None if pd.isna(x) else float(x)
            for x in returns[t]
        ]

    return jsonify(payload)


if __name__ == "__main__":
    app.run(port=5000, debug=True)