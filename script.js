let productCount = 0;
let expenseCount = 0;

// Load saved data
window.onload = function () {
  const savedData = JSON.parse(localStorage.getItem("businessData"));
  if (savedData) {
    productCount = savedData.products.length;
    expenseCount = savedData.expenses.length;

    savedData.products.forEach((p, index) => {
      addProduct(p.cost, p.qty, p.profit, index + 1, p.name);
    });

    savedData.expenses.forEach((e, index) => {
      addExpense(e.name, e.amount, index + 1);
    });

    calculate();
  }
};

// Add Product
function addProduct(cost = "", qty = "", profit = "", fixedId = null, name = "") {
  const id = fixedId || ++productCount;
  const container = document.getElementById("products");

  const div = document.createElement("div");
  div.classList.add("product");
  div.setAttribute("id", `product-${id}`);
  div.innerHTML = `
    <label>Product Name</label>
    <input type="text" id="name-${id}" value="${name}" placeholder="Product name" oninput="saveData();">

    <label>Cost per piece (₱)</label>
    <input type="number" id="cost-${id}" value="${cost}" placeholder="Cost per product" oninput="saveData(); calculate();">

    <label>Quantity</label>
    <input type="number" id="qty-${id}" value="${qty}" placeholder="How many" oninput="saveData(); calculate();">

    <label>Profit per piece (₱)</label>
    <input type="number" id="profit-${id}" value="${profit}" placeholder="How much your add" oninput="saveData(); calculate();">

    <button class="remove-btn" onclick="removeProduct(${id})">Remove</button>
  `;
  container.appendChild(div);
  saveData();
}

// Remove Product
function removeProduct(id) {
  const element = document.getElementById(`product-${id}`);
  if (element) element.remove();
  saveData();
}

// Add Expense
function addExpense(name = "", amount = "", fixedId = null) {
  const id = fixedId || ++expenseCount;
  const container = document.getElementById("expenses");

  const div = document.createElement("div");
  div.classList.add("expense");
  div.setAttribute("id", `expense-${id}`);
  div.innerHTML = `
    <label>Expense Name</label>
    <input type="text" id="exp-name-${id}" value="${name}" placeholder="e.g. Delivery" oninput="saveData();">

    <label>Amount (₱)</label>
    <input type="number" id="exp-amount-${id}" value="${amount}" placeholder="e.g. 500" oninput="saveData(); calculate();">

    <button class="remove-btn" onclick="removeExpense(${id})">Remove</button>
  `;
  container.appendChild(div);
  saveData();
}

// Remove Expense
function removeExpense(id) {
  const element = document.getElementById(`expense-${id}`);
  if (element) element.remove();
  saveData();
}

// Calculate Totals
function calculate() {
  let totalCost = 0, totalRevenue = 0, totalProfit = 0;
  let totalExpenses = 0;

  // Products
  for (let i = 1; i <= productCount; i++) {
    const cost = parseFloat(document.getElementById(`cost-${i}`)?.value) || 0;
    const qty = parseInt(document.getElementById(`qty-${i}`)?.value) || 0;
    const profit = parseFloat(document.getElementById(`profit-${i}`)?.value) || 0;

    if (qty > 0 && cost > 0) {
      totalCost += cost * qty;
      totalRevenue += (cost + profit) * qty;
      totalProfit += profit * qty;
    }
  }

  // Expenses
  for (let i = 1; i <= expenseCount; i++) {
    totalExpenses += parseFloat(document.getElementById(`exp-amount-${i}`)?.value) || 0;
  }

  const finalProfit = totalProfit - totalExpenses;

  // Results
  document.getElementById("results").innerHTML = `
    <h2>📈 Results</h2>
    <p><strong>Total Product Cost:</strong> ₱${totalCost.toFixed(2)}</p>
    <p><strong>Total Revenue (with profit):</strong> ₱${totalRevenue.toFixed(2)}</p>
    <p><strong>Total Gross Profit:</strong> ₱${totalProfit.toFixed(2)}</p>
    <p><strong>Other Expenses:</strong> ₱${totalExpenses.toFixed(2)}</p>
    <p><strong>Net Profit (after expenses):</strong> ₱${finalProfit.toFixed(2)}</p>
  `;
}

// Save to LocalStorage
function saveData() {
  const products = [];
  for (let i = 1; i <= productCount; i++) {
    if (document.getElementById(`cost-${i}`)) {
      products.push({
        name: document.getElementById(`name-${i}`).value,
        cost: document.getElementById(`cost-${i}`).value,
        qty: document.getElementById(`qty-${i}`).value,
        profit: document.getElementById(`profit-${i}`).value
      });
    }
  }

  const expenses = [];
  for (let i = 1; i <= expenseCount; i++) {
    if (document.getElementById(`exp-name-${i}`)) {
      expenses.push({
        name: document.getElementById(`exp-name-${i}`).value,
        amount: document.getElementById(`exp-amount-${i}`).value
      });
    }
  }

  localStorage.setItem("businessData", JSON.stringify({ products, expenses }));
}

// Clear All
function clearAll() {
  localStorage.removeItem("businessData");
  document.getElementById("products").innerHTML = "";
  document.getElementById("expenses").innerHTML = "";
  document.getElementById("results").innerHTML = "";
  productCount = 0;
  expenseCount = 0;
}

// Theme Toggle Fix
const themeToggle = document.getElementById("themeToggle");
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");
    themeToggle.textContent = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });

  // Load saved theme
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    themeToggle.textContent = "☀️ Light Mode";
  }
}

function calculate() {
    let totalCost = 0, totalRevenue = 0, totalProfit = 0;
    let totalExpenses = 0;
  
    // Products
    for (let i = 1; i <= productCount; i++) {
      const cost = parseFloat(document.getElementById(`cost-${i}`)?.value) || 0;
      const qty = parseInt(document.getElementById(`qty-${i}`)?.value) || 0;
      const profit = parseFloat(document.getElementById(`profit-${i}`)?.value) || 0;
  
      if (qty > 0 && cost > 0) {
        totalCost += cost * qty;
        totalRevenue += (cost + profit) * qty;
        totalProfit += profit * qty;
      }
    }
  
    // Expenses
    for (let i = 1; i <= expenseCount; i++) {
      totalExpenses += parseFloat(document.getElementById(`exp-amount-${i}`)?.value) || 0;
    }
  
    const finalProfit = totalProfit - totalExpenses;
  
    // Product Breakdown
    let productBreakdownHTML = "<h3>🧾 Product Breakdown</h3>";
    for (let i = 1; i <= productCount; i++) {
      const name = document.getElementById(`name-${i}`)?.value || `Product ${i}`;
      const cost = parseFloat(document.getElementById(`cost-${i}`)?.value) || 0;
      const qty = parseInt(document.getElementById(`qty-${i}`)?.value) || 0;
      const profit = parseFloat(document.getElementById(`profit-${i}`)?.value) || 0;
  
      if (qty > 0 && cost > 0) {
        const productCost = cost * qty;
        const productRevenue = (cost + profit) * qty;
        const productProfit = profit * qty;
  
        productBreakdownHTML += `
          <div class="receipt-card">
            <h4>${name}</h4>
            <p>Cost: ₱${productCost.toFixed(2)}</p>
            <p>Revenue: ₱${productRevenue.toFixed(2)}</p>
            <p>Profit: ₱${productProfit.toFixed(2)}</p>
            <p class="total">Total per Product: ₱${productRevenue.toFixed(2)}</p>
          </div>
        `;
      }
    }
  
    // KPI Dashboard
    document.getElementById("results").innerHTML = `
      <h2>📊 Dashboard</h2>
      <div class="kpi-cards">
        <div class="kpi revenue">Revenue<br><strong>₱${totalRevenue.toFixed(2)}</strong></div>
        <div class="kpi expenses">Expenses<br><strong>₱${totalExpenses.toFixed(2)}</strong></div>
        <div class="kpi profit">Net Profit<br><strong>₱${finalProfit.toFixed(2)}</strong></div>
      </div>
      ${productBreakdownHTML}
    `;
  }
  