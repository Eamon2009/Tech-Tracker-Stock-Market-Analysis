# Tech Tracker — Stock Market Analytics Dashboard

A dark-theme stock market analytics dashboard built with **Flask + Chart.js + Yahoo Finance data**.
The application provides synchronized multi-company price analysis, moving averages, and return distributions using real financial data.

The project focuses on clean visualization, reliable data alignment, and a terminal-style UI suitable for technical analysis.

---

## Overview

Tech Tracker is a lightweight financial dashboard designed to visualize long-term stock performance for major technology companies.

The system fetches real market data using `yfinance`, processes it in a Flask backend, and renders interactive charts in the frontend using Chart.js.

The UI follows a minimal, high-contrast dark theme inspired by professional trading terminals.

Companies included:

* Apple (AAPL)
* Microsoft (MSFT)
* Alphabet / Google (GOOGL)
* NVIDIA (NVDA)

Data range:

* 5 years daily prices
* Moving averages (50 / 200)
* Daily returns distribution

---

## Features

* Unified multi-company comparison chart
* Single company analysis mode
* 50-day and 200-day moving averages
* Histogram of daily returns
* Real Yahoo Finance data
* Synchronized time axis
* High-contrast dark UI
* Company logos and metadata
* Stable API backend
* No external database required

---

## Architecture

```
Frontend (HTML / JS / Chart.js)
        |
        | fetch /api/stocks
        |
Flask Backend (Python)
        |
        | yfinance
        |
Yahoo Finance Data
```

### Backend

* Flask API
* pandas data alignment
* rolling moving averages
* return calculation
* JSON API

### Frontend

* Chart.js rendering
* dynamic dataset switching
* unified / single mode
* histogram generation
* dark terminal UI

---

## AI Usage

The frontend layer of this project was developed with extensive assistance from AI.

AI was used for:

* UI layout generation
* Chart.js configuration
* JavaScript state logic
* histogram binning logic
* dark theme styling
* error fixing and debugging
* API integration adjustments
* refactoring for stability

AI was not used to generate data or backend logic blindly.
All financial calculations, alignment, and API structure were manually verified.

The goal of using AI was to accelerate UI development while keeping the system technically correct.

This workflow reflects modern engineering practice where AI assists with implementation while design decisions remain human-driven.

---

## Installation

Python 3.10+

Install dependencies:

```
pip install flask pandas yfinance flask-cors
```

Project structure:

```
tech-tracker/
  backend/
  frontend/
```

Run backend:

```
cd backend
python app.py
```

Run frontend:

```
cd frontend
python -m http.server 8080
```

Open:

```
http://localhost:8080
```

---

## Usage

* Click a company to view individual chart
* Click Unified Chart to compare all companies
* Histogram updates automatically
* Moving averages always aligned
* Charts use the same timeline

---

## Design Goals

* minimal UI noise
* accurate data
* stable rendering
* reproducible results
* no hidden state
* no external services except Yahoo Finance

---

## Notes

This project is intended for:

* learning financial visualization
* experimenting with Chart.js
* practicing Flask APIs
* demonstrating frontend AI-assisted development
* portfolio / GitHub projects

This is not a trading tool.

---

## License
    MIT
