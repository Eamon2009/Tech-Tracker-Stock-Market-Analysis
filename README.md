# Tech Tracker — Stock Market Analysis Dashboard

<img width="1919" height="709" alt="Screenshot 2026-03-15 195155" src="https://github.com/user-attachments/assets/36c1501d-10d7-4780-a12a-9c9b36d423da" />


Tech Tracker is a lightweight financial analytics dashboard built with **Python, Flask, and Chart.js**.  
It fetches real market data and provides **interactive visualizations for major technology companies**, enabling users to analyze price trends, moving averages, and return distributions.

The application demonstrates how financial data can be processed on the backend and visualized through an interactive web interface.
The frontend of this project was made using A.I tools.

---

## Overview

This project provides a simple **market intelligence dashboard** focused on major technology companies.

The system retrieves stock data, processes it using Python data analysis libraries, and presents the results through dynamic charts.

The dashboard currently tracks the following companies:

- Apple
- Microsoft
- Google
- NVIDIA

Users can switch between **multi-company comparison mode** and **individual company analysis**.

---

## Key Features

### Unified Market View

The unified view allows users to compare the **historical price performance** of multiple companies simultaneously.

Features include:

- 5-year historical stock price data
- Multi-line chart comparison
- Dark-themed financial dashboard UI
- Real-time data loading

---

### Single Company Analysis

Users can select an individual company to view deeper analysis.

Additional indicators include:

- Price trend visualization
- 50-day moving average
- 200-day moving average
- Interactive chart navigation

---

### Return Distribution Analysis

The system calculates **daily percentage returns** and displays them in a histogram.

This helps visualize:

- volatility
- distribution of daily returns
- frequency of gains and losses

---

### Dynamic Sidebar

The sidebar displays tracked companies with:

- official company logos
- total return over the selected time period
- color-coded performance indicators

Positive returns are highlighted in green, while negative returns appear in red.

---

## Technology Stack

### Backend

- Python
- Flask
- Pandas
- NumPy
- yfinance

### Frontend

- HTML5
- CSS3
- JavaScript
- Chart.js

### Data Source

Financial data is retrieved through the **yfinance API**, which provides historical market information.


---

## How the System Works

1. The Flask backend requests stock market data using the yfinance API.
2. Historical price data for selected companies is downloaded.
3. The backend calculates:
   - moving averages
   - daily percentage returns
4. The processed data is returned as JSON through an API endpoint.
5. The frontend uses Chart.js to generate dynamic financial charts.

---

## API Endpoint

### `/api/stocks`

Returns processed stock market data including:

- price history
- moving averages
- daily returns
- company metadata

Example response structure:



---

## Example Analytics Provided

The dashboard computes several financial metrics:

### Moving Averages

- 50-day moving average
- 200-day moving average

These indicators help identify **trend direction and potential momentum changes**.

---

### Daily Returns

     Daily returns are calculated using:
      return = (current_price - previous_price) / previous_price

This metric is used to build the **return distribution histogram**.

---

## Learning Objectives

This project demonstrates concepts from several technical areas:

- backend API design with Flask
- financial data processing with Pandas
- interactive data visualization
- frontend-backend integration
- time-series data analysis

---

## Possible Future Improvements

Potential enhancements for the project include:

- additional companies and sectors
- candlestick charts
- volatility indicators
- portfolio tracking
- real-time streaming data
- financial ratio analysis
- machine learning based price forecasting

---

## Author
    Eamon  
---

## License
    MIT
