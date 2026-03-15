function buildSidebar() {
       const list = document.getElementById('company-list');
       list.innerHTML = '';

       Object.keys(stockData.companies).forEach(ticker => {
              const comp = stockData.companies[ticker];

              // Calculate Total Return
              const prices = comp.prices.filter(p => p !== null);
              const startPrice = prices[0];
              const endPrice = prices[prices.length - 1];
              const totalReturn = ((endPrice - startPrice) / startPrice * 100).toFixed(1);

              const li = document.createElement('li');
              li.className = 'company-item';
              li.id = `nav-${ticker}`;
              li.onclick = () => selectCompany(ticker);

              li.innerHTML = `
            <div style="display: flex; align-items: center; flex-grow: 1;">
                <img src="${comp.logo}" class="company-logo" alt="${comp.name}">
                <span class="company-name">${comp.name}</span>
            </div>
            <span class="return-badge ${totalReturn >= 0 ? 'pos' : 'neg'}">
                ${totalReturn >= 0 ? '+' : ''}${totalReturn}%
            </span>
        `;
              list.appendChild(li);
       });
}