let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
let editId = null;

const amountInput = document.getElementById('amount');
const descriptionInput = document.getElementById('description');
const addBtn = document.getElementById('addBtn');
const expenseList = document.getElementById('expenseList');
const totalAmount = document.getElementById('totalAmount');

function saveToLocalStorage() {
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

function renderExpenses() {
    expenseList.innerHTML = '';
    let total = 0;

    expenses.forEach(exp => {
        total += Number(exp.amount);

        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';

        li.innerHTML = `
            <div>
                <strong>₹ ${exp.amount}</strong><br>
                <small class="text-muted">${exp.description}</small>
            </div>
            <div>
                <button class="btn btn-primary btn-sm me-2" onclick="editExpense(${exp.id})">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteExpense(${exp.id})">Delete</button>
            </div>
        `;

        expenseList.appendChild(li);
    });

    totalAmount.innerText = `Total: ₹${total}`;
}

addBtn.addEventListener('click', function () {
    const amount = amountInput.value;
    const description = descriptionInput.value;

    if (!amount || !description) return;

    if (editId) {
        expenses = expenses.map(exp =>
            exp.id === editId ? { ...exp, amount, description } : exp
        );
        editId = null;
        addBtn.innerText = 'Add Expense';
        addBtn.classList.remove('btn-warning');
        addBtn.classList.add('btn-success');
    } else {
        expenses.push({
            id: Date.now(),
            amount,
            description
        });
    }

    amountInput.value = '';
    descriptionInput.value = '';

    saveToLocalStorage();
    renderExpenses();
});

function editExpense(id) {
    const expense = expenses.find(exp => exp.id === id);
    amountInput.value = expense.amount;
    descriptionInput.value = expense.description;
    editId = id;

    addBtn.innerText = 'Update Expense';
    addBtn.classList.remove('btn-success');
    addBtn.classList.add('btn-warning');
}

function deleteExpense(id) {
    expenses = expenses.filter(exp => exp.id !== id);
    saveToLocalStorage();
    renderExpenses();
}

renderExpenses();
