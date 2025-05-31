const API_URL = "http://localhost:5000/api/cards";
const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "index.html";
}

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
};

const cardForm = document.getElementById("cardForm");
const cardTableBody = document.querySelector("#cardTable tbody");
const cardFormContainer = document.getElementById("cardFormContainer");

function logout() {
  localStorage.removeItem("token");
  window.location.href = "index.html";
}

function toggleForm() {
  cardFormContainer.style.display =
    cardFormContainer.style.display === "none" ? "block" : "none";
}

async function fetchCards() {
  try {
    const res = await fetch(API_URL, { headers });
    if (!res.ok) throw new Error("Failed to fetch cards");
    const cards = await res.json();

    cardTableBody.innerHTML = "";
    cards.forEach(renderCardRow);
  } catch (err) {
    console.error("Error fetching cards:", err);
    alert("Could not load cards.");
  }
}

function renderCardRow(card) {
  const row = document.createElement("tr");

  const fields = [
    "cardName",
    "last4Digits",
    "statementDate",
    "dueDate",
    "dueAmount",
    "minimumDue",
    "totalLimit",
    "outstandingBalance",
    "availableLimit",
    "category",
  ];

  fields.forEach((field) => {
    const cell = document.createElement("td");
    if (field.includes("Date")) {
      cell.textContent = new Date(card[field]).toLocaleDateString();
    } else if (typeof card[field] === "number") {
      cell.textContent = `₹${card[field]}`;
    } else {
      cell.textContent = card[field];
    }
    row.appendChild(cell);
  });

  const actionsCell = document.createElement("td");
  const buttonGrp = document.createElement("div");
  buttonGrp.className = "button-group";

  const editBtn = document.createElement("button");
  editBtn.className = "btn-primary";
  editBtn.textContent = "Edit";
  editBtn.onclick = () => enableInlineEdit(row, card);

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "btn-danger";
  deleteBtn.textContent = "Delete";
  deleteBtn.onclick = () => deleteCard(card.id);

  buttonGrp.appendChild(editBtn);
  buttonGrp.appendChild(deleteBtn);

  actionsCell.appendChild(buttonGrp);

  row.appendChild(actionsCell);
  cardTableBody.appendChild(row);
}

let currentlyEditingRow = null;
function enableInlineEdit(row, card) {
  // Highlight the current row
  row.classList.add("editing");
  currentlyEditingRow = row;

  const fields = [
    "cardName",
    "last4Digits",
    "statementDate",
    "dueDate",
    "dueAmount",
    "minimumDue",
    "totalLimit",
    "outstandingBalance",
    "availableLimit",
    "category",
  ];

  row.innerHTML = "";

  fields.forEach((field) => {
    const cell = document.createElement("td");
    const input = document.createElement("input");
    input.name = field;
    input.value = field.includes("Date")
      ? new Date(card[field]).toISOString().split("T")[0]
      : card[field];
    input.type = field.includes("Date") ? "date" : "text";
    cell.appendChild(input);
    row.appendChild(cell);
  });

  const actionsCell = document.createElement("td");
  const saveBtn = document.createElement("button");
  saveBtn.className = "btn-success";
  saveBtn.textContent = "Save";
  saveBtn.onclick = () => saveInlineEdit(row, card.id);
  actionsCell.appendChild(saveBtn);
  row.appendChild(actionsCell);
}

async function saveInlineEdit(row, cardId) {
  const inputs = row.querySelectorAll("input");
  const updatedCard = {};

  inputs.forEach((input) => {
    updatedCard[input.name] =
      input.type === "number" ? parseFloat(input.value) : input.value;
  });

  try {
    await fetch(`${API_URL}/${cardId}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(updatedCard),
    });
    fetchCards();
  } catch (err) {
    console.error("Error updating card:", err);
    alert("Failed to update card.");
  }
}

async function deleteCard(id) {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers,
  });
  fetchCards();
}

cardForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(cardForm);
  const cardData = Object.fromEntries(formData.entries());

  try {
    await fetch(API_URL, {
      method: "POST",
      headers,
      body: JSON.stringify(cardData),
    });

    cardForm.reset();
    cardFormContainer.style.display = "none";
    fetchCards();
  } catch (err) {
    console.error("Error saving card:", err);
    alert("Failed to save card.");
  }
});

fetchCards();
