let DATA
let chart

async function init() {

       const res = await fetch("http://localhost:5000/api/stocks")

       DATA = await res.json()

       buildCompanyList()

       showUnified()

}

function buildCompanyList() {

       const container = document.getElementById("companyList")

       Object.entries(DATA.companies).forEach(([ticker, info]) => {

              container.innerHTML += `

<div onclick="showSingle('${ticker}')"
class="flex items-center gap-3 mb-4 cursor-pointer hover:bg-gray-900 p-2 rounded">

<img src="${info.logo}" class="w-6">

<div>${info.name}</div>

</div>
`

       })

}


function showUnified() {

       drawPriceChart(Object.keys(DATA.prices))

       drawHistogram(Object.keys(DATA.returns)[0])

}

function showSingle(ticker) {

       drawPriceChart([ticker])

       drawHistogram(ticker)

}


function drawPriceChart(tickers) {

       if (chart) chart.destroy()

       const datasets = []

       tickers.forEach(t => {

              datasets.push({
                     label: t,
                     data: DATA.prices[t],
                     borderColor: "#00ff9c",
                     pointRadius: 0,
                     borderWidth: 2
              })

              datasets.push({
                     label: t + " MA50",
                     data: DATA.ma50[t],
                     borderColor: "#ffaa00",
                     pointRadius: 0
              })

              datasets.push({
                     label: t + " MA200",
                     data: DATA.ma200[t],
                     borderColor: "#ff4444",
                     pointRadius: 0
              })

       })

       chart = new Chart(document.getElementById("priceChart"), {

              type: "line",

              data: {
                     labels: DATA.dates,
                     datasets: datasets
              },

              options: {
                     responsive: true,
                     plugins: {
                            legend: { labels: { color: "white" } }
                     },
                     scales: {
                            x: { display: false },
                            y: { grid: { color: "#222" } }
                     }
              }

       })

}


function drawHistogram(ticker) {

       new Chart(document.getElementById("histChart"), {

              type: "bar",

              data: {
                     labels: DATA.returns[ticker].map((_, i) => i),
                     datasets: [{
                            label: "Daily Returns",
                            data: DATA.returns[ticker],
                            backgroundColor: "#888"
                     }]
              }

       })

}

init()