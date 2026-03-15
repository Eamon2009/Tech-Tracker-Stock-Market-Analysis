from flask import Flask, render_template, jsonify
import yfinance as yf
import pandas as pd
import numpy as np

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/stocks')
def stocks():
    tickers = ['AAPL', 'MSFT', 'GOOGL', 'NVDA']
    
    # Stable Wikimedia Commons logos optimized for dark themes
    company_info = {
        'AAPL': {'name': 'Apple', 'logo': 'https://upload.wikimedia.org/wikipedia/commons/3/31/Apple_logo_white.svg', 'color': '#ffffff'},
        'MSFT': {'name': 'Microsoft', 'logo': 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg', 'color': '#00a4ef'},
        'GOOGL': {'name': 'Google', 'logo': 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg', 'color': '#ea4335'},
        'NVDA': {'name': 'NVIDIA', 'logo': 'https://upload.wikimedia.org/wikipedia/commons/2/21/Nvidia_logo.svg', 'color': '#76b900'}
    }

    # Fetch 5 years of data
    df = yf.download(tickers, period='5y')
    
    # Extract 'Close' prices (handles yfinance MultiIndex columns)
    close_prices = df['Close']
    
    # Extract a common date index formatted as strings
    common_index = close_prices.index.strftime('%Y-%m-%d').tolist()
    
    result = {
        'dates': common_index,
        'companies': {}
    }

    for ticker in tickers:
        # Extract series, handle missing values (forward fill)
        series = close_prices[ticker].ffill()
        
        # Calculate Moving Averages & Returns
        ma50 = series.rolling(window=50).mean()
        ma200 = series.rolling(window=200).mean()
        returns = series.pct_change()
        
        # Replace NaNs with None for safe JSON serialization
        def clean_data(data_series):
            return data_series.replace([np.nan, np.inf, -np.inf], None).tolist()

        result['companies'][ticker] = {
            'name': company_info[ticker]['name'],
            'logo': company_info[ticker]['logo'],
            'color': company_info[ticker]['color'],
            'prices': clean_data(series),
            'ma50': clean_data(ma50),
            'ma200': clean_data(ma200),
            'returns': clean_data(returns)
        }
        
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True, port=8080)