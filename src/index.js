import { transactions } from "./transacrions.js";
import { addTransaction, renderTransactions, calculateTotal } from "./ui.js";

const form = document.querySelector("#my_form");

form.addEventListener("submit", addTransaction);

renderTransactions();
calculateTotal();
