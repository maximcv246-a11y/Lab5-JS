import { generateID, formatDate } from "./utils.js";
import { transactions } from "./transacrions.js";

const table = document.querySelector("#transactions-table");
const tableBody = document.querySelector("#transactions-table tbody");

function addTransaction(event){
    event.preventDefault();

    const amount = Number(document.getElementsByName("tr_amount")[0].value);
    const category = document.getElementsByName("tr_category")[0].value;
    const description = document.getElementsByName("tr_description")[0].value.trim();

    if (!amount) {
        alert("Введите сумму");
        return;
    }

    if (category === "") {
        alert("Выберите категорию");
        return;
    }

    if (description.length < 3) {
        alert("Описание слишком короткое");
        return;
    }

    const transaction = {
        id: generateID(),
        date: new Date(),
        amount,
        category,
        description
    };

    transactions.push(transaction);

    renderRow(transaction);
    calculateTotal();
    document.querySelector("#my_form").reset();
}

function renderRow(transaction) {
    const row = document.createElement("tr");
    row.dataset.id = transaction.id;

    if (transaction.amount > 0) {
        row.style.backgroundColor = "lightgreen";
    } else {
        row.style.backgroundColor = "lightcoral";
    }

    const shortDescription = transaction.description.split(" ").slice(0, 4).join(" ");

    row.innerHTML = `
        <td>${formatDate(transaction.date)}</td>
        <td>${transaction.category}</td>
        <td>${shortDescription}</td>
        <td>
            <button data-id="${transaction.id}">
                Удалить
            </button>
        </td>`;
    
    tableBody.appendChild(row);
}

function renderTransactions() {
    tableBody.innerHTML = "";
    transactions.forEach(transaction => {
        renderRow(transaction);
    });
}

table.addEventListener("click", function(event) {
    if (event.target.tagName === "BUTTON") {

        const id = event.target.dataset.id;

        const index = transactions.findIndex(
            transaction => transaction.id == id
        );

        if (index !== -1) {
            transactions.splice(index, 1);
        }

        const row = event.target.closest("tr");
        
        row.remove();
        calculateTotal();
    }
});

function calculateTotal() {

    const totalElement = document.querySelector("#total");

    const total = transactions.reduce(
        (sum, transaction) => sum + transaction.amount,
        0
    );

    totalElement.textContent = total;
}


table.addEventListener("click", function(event) {
    // Игнорируем клики на кнопку удаления
    if (event.target.tagName === "BUTTON") return;

    const row = event.target.closest("tr");

    if (!row) return;

    // Игнорируем клики на заголовок таблицы
    if (!row.dataset.id) return;

    const id = row.dataset.id;

    const transaction = transactions.find(
        transaction => transaction.id == id
    );

    if (!transaction) return;

    document.querySelector("#full-description").textContent =
        transaction.description;
});



export { addTransaction, renderTransactions, calculateTotal };
