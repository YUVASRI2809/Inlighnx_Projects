
// Selecting Elements
const form = document.getElementById("transactionForm");
const transactionName = document.getElementById("transactionName");
const transactionAmount = document.getElementById("transactionAmount");
const transactionType = document.getElementById("transactionType");
const transactionList = document.getElementById("transactionList");
const balance = document.getElementById("balance");
const errorMessage = document.getElementById("errorMessage");

// Array to store transactions
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

// ----------------------
// SAVE TO LOCAL STORAGE
// ----------------------
function saveTransactions() {
  localStorage.setItem(
    "transactions",
    JSON.stringify(transactions)
  );
}

// ----------------------
// UPDATE BALANCE
// ----------------------
function updateBalance() {

  let total = 0;

  transactions.forEach((transaction) => {

    if (transaction.type === "income") {
      total += transaction.amount;
    }
    else {
      total -= transaction.amount;
    }

  });

  balance.textContent = total.toFixed(2);
}

// ----------------------
// DISPLAY TRANSACTIONS
// ----------------------
function displayTransactions() {

  // Clear old list
  transactionList.innerHTML = "";

  transactions.forEach((transaction, index) => {

    const li = document.createElement("li");

    li.classList.add(
      "transaction-item",
      transaction.type
    );

    li.innerHTML = `
      <span>
        ${transaction.name}
      </span>

      <span>
        ${transaction.type === "income" ? "+" : "-"}$${transaction.amount}
      </span>

      <button class="delete-btn" onclick="deleteTransaction(${index})">
        Delete
      </button>
    `;

    transactionList.appendChild(li);

  });

  updateBalance();
}

// ----------------------
// ADD TRANSACTION
// ----------------------
form.addEventListener("submit", function(e) {

  e.preventDefault();

  const name = transactionName.value.trim();

  const amount = Number(transactionAmount.value);

  const type = transactionType.value;

  // Validation
  if (name === "" || amount <= 0) {

    errorMessage.textContent =
      "Please enter valid transaction details";

    return;
  }

  errorMessage.textContent = "";

  // Create transaction object
  const transaction = {
    name: name,
    amount: Math.abs(amount),
    type: type
  };

  // Add to array
  transactions.push(transaction);

  // Save data
  saveTransactions();

  // Display updated list
  displayTransactions();

  // Clear form
  transactionName.value = "";
  transactionAmount.value = "";

});

// ----------------------
// DELETE TRANSACTION
// ----------------------
function deleteTransaction(index) {

  transactions.splice(index, 1);

  saveTransactions();

  displayTransactions();
}

// ----------------------
// INITIAL LOAD
// ----------------------
displayTransactions();
