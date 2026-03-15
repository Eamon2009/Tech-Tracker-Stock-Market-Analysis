async function initDashboard() {

       const response = await fetch("http://localhost:5000/api/stocks")

       const data = await response.json()


       const colors = [
              "#10b981",
              "#3b82f6",
              "#f59e0b",
              "#ef4444",
              "#8b5cf6"
       ]


       createCards(data)

       createLineChart(data)

       createPieChart(data)

       createBarChart(data)

}



function createCards(data) {

       const container = document.getElementById("tickerCards")

       container.innerHTML = ""

       Object.entries(data.latest).forEach(([ticker, price]) => {

              const growth = data.growth[ticker]

              const color = growth > 0 ? "text-green-400" : "text-red-400"

              container.innerHTML +=

                     `<div class="bg-gray-900 p-4 rounded-xl border border-gray-800">

<div class="text-gray-400 text-xs">${ticker}</div>

<div class="text-2xl font-bold">$${price.toFixed(2)}</div>

<div class="${color}">
${growth.toFixed(2)}%
</div>

</div>`

       })

}



function createLineChart(data) {

       new Chart(document.getElementById("lineChart"), {

              type: "line",

              data: {

                     labels: data.dates,

                     datasets: Object.keys(data.prices).map((ticker, i) => ({

                            label: ticker,

                            data: data.prices[ticker],

                            borderColor: [
                                   "#10b981",
                                   "#3b82f6",
                                   "#f59e0b",
                                   "#ef4444",
                                   "#8b5cf6"
                            ][i],

                            borderWidth: 2,

                            pointRadius: 0

                     }))

              },

              options: {

                     responsive: true,

                     scales: {

                            x: { display: false },

                            y: { grid: { color: "#1f2937" } }

                     }

              }

       })

}



function createPieChart(data) {

       new Chart(document.getElementById("pieChart"), {

              type: "pie",

              data: {

                     labels: Object.keys(data.latest),

                     datasets: [{

                            data: Object.values(data.latest),

                            backgroundColor: [
                                   "#10b981",
                                   "#3b82f6",
                                   "#f59e0b",
                                   "#ef4444",
                                   "#8b5cf6"
                            ]

                     }]

              }

       })

}



function createBarChart(data) {

       new Chart(document.getElementById("barChart"), {

              type: "bar",

              data: {

                     labels: Object.keys(data.growth),

                     datasets: [{

                            label: "5Y Growth %",

                            data: Object.values(data.growth),

                            backgroundColor: [
                                   "#10b981",
                                   "#3b82f6",
                                   "#f59e0b",
                                   "#ef4444",
                                   "#8b5cf6"
                            ]

                     }]

              }

       })

}



initDashboard()

setInterval(initDashboard, 60000)