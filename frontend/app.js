let DATA

let priceChart
let histChart


const COLORS = {

       AAPL: {
              price: "#00ff9c",
              ma50: "#66ffc9",
              ma200: "#009966"
       },

       MSFT: {
              price: "#4da6ff",
              ma50: "#80c1ff",
              ma200: "#1f78ff"
       },

       GOOGL: {
              price: "#ffd84d",
              ma50: "#ffe680",
              ma200: "#ccac00"
       },

       NVDA: {
              price: "#c77dff",
              ma50: "#ddaaff",
              ma200: "#7b2cbf"
       }

}



async function init() {

       const res = await fetch("http://localhost:5000/api/stocks")

       DATA = await res.json()

       buildCompanyList()

       showUnified()

}



function buildCompanyList() {

       const container = document.getElementById("companyList")

       container.innerHTML = ""

       Object.entries(DATA.companies).forEach(([ticker, info]) => {

              container.innerHTML += `

<div onclick="showSingle('${ticker}')"
class="flex items-center gap-3 mb-4 cursor-pointer hover:bg-gray-900 p-2 rounded">

<img src="${info.logo}"
class="w-6 h-6 object-contain"
onerror="this.src=''">

<div>${info.name}</div>

</div>

`

       })

}



function showUnified() {

       const tickers = Object.keys(DATA.prices)

       drawPriceChart(tickers)

       drawHistogram(tickers[0])

}



function showSingle(ticker) {

       drawPriceChart([ticker])

       drawHistogram(ticker)

}



function drawPriceChart(tickers) {

       if (priceChart) priceChart.destroy()

       const datasets = []

       tickers.forEach(t => {

              const name = DATA.companies[t].name

              const c = COLORS[t]

              datasets.push({
                     label: name,
                     data: DATA.prices[t],
                     borderColor: c.price,
                     borderWidth: 2,
                     pointRadius: 0
              })

              datasets.push({
                     label: name + " MA50",
                     data: DATA.ma50[t],
                     borderColor: c.ma50,
                     borderWidth: 1,
                     borderDash: [5, 5],
                     pointRadius: 0
              })

              datasets.push({
                     label: name + " MA200",
                     data: DATA.ma200[t],
                     borderColor: c.ma200,
                     borderWidth: 1,
                     pointRadius: 0
              })

       })


       priceChart = new Chart(

              document.getElementById("priceChart"),

              {
                     type: "line",

                     data: {
                            labels: DATA.dates,
                            datasets: datasets
                     },

                     options: {

                            plugins: {
                                   legend: {
                                          labels: {
                                                 color: "#ccc"
                                          }
                                   }
                            },

                            scales: {

                                   x: {
                                          grid: { color: "#111" },
                                          ticks: { color: "#777" }
                                   },

                                   y: {
                                          grid: { color: "#111" },
                                          ticks: { color: "#777" }
                                   }

                            }

                     }

              }

       )

}



function drawHistogram(ticker) {

       if (histChart) histChart.destroy()

       const values =
              DATA.returns[ticker].filter(v => v !== null)

       const bins = 40

       const min = Math.min(...values)
       const max = Math.max(...values)

       const step = (max - min) / bins

       const hist = new Array(bins).fill(0)

       values.forEach(v => {

              let i = Math.floor((v - min) / step)

              if (i >= bins) i = bins - 1

              hist[i]++

       })

       const labels = hist.map((_, i) =>
              (min + i * step).toFixed(3)
       )


       histChart = new Chart(

              document.getElementById("histChart"),

              {
                     type: "bar",

                     data: {
                            labels,
                            datasets: [{
                                   label: ticker,
                                   data: hist,
                                   backgroundColor: COLORS[ticker].price
                            }]
                     }

              }

       )

}


init()