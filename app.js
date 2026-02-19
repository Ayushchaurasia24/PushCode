let form = document.getElementsByTagName('form')[0];

// Create description input
let descriptionInput = document.createElement('input');
descriptionInput.type = 'text';
descriptionInput.id = 'description';
descriptionInput.placeholder = 'Enter fruit description';

// Insert before button
let button = form.querySelector('button');
form.insertBefore(descriptionInput, button);

// add fruit to the cart
let fruititems = document.querySelector('.fruits');

form.addEventListener('submit', function (event) {
    event.preventDefault();

    let fruitName = document.getElementById('fruit-to-add').value;
    let fruitDescription = document.getElementById('description').value;

    if (fruitName === '' || fruitDescription === '') {
        alert('Please enter fruit name and description.');
        return;
    }

    let li = document.createElement('li');
    li.className = 'fruit';

    // Fruit name
    li.appendChild(document.createTextNode(fruitName));

    // Description
    let p = document.createElement('p');
    p.style.fontStyle = 'italic';
    p.textContent = fruitDescription;
    li.appendChild(p);

    // Delete button
    let deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'x';
    deleteBtn.className = 'delete-btn';
    li.appendChild(deleteBtn);

    // ✅ Edit button added
    let editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.className = 'edit-btn';
    li.appendChild(editBtn);

    fruititems.appendChild(li);

    document.getElementById('fruit-to-add').value = '';
    document.getElementById('description').value = '';
});


// delete + edit functionality
fruititems.addEventListener('click', function (event) {

    // DELETE
    if (event.target.classList.contains('delete-btn')) {
        let buttontodelete = event.target.parentElement;
        fruititems.removeChild(buttontodelete);
    }

    // ✅ EDIT
    if (event.target.classList.contains('edit-btn')) {
        let item = event.target.parentElement;

        let fruitName = item.childNodes[0].textContent.trim();
        let description = item.querySelector('p').textContent;

        document.getElementById('fruit-to-add').value = fruitName;
        document.getElementById('description').value = description;

        fruititems.removeChild(item);
    }
});


// Filter functionality
let filter = document.getElementById('filter');

filter.addEventListener('keyup', function () {

    let searchText = filter.value.toLowerCase();
    let fruits = document.querySelectorAll('.fruit');

    fruits.forEach(function (fruit) {

        let fruitName = fruit.childNodes[0].textContent.toLowerCase();
        let description = fruit.querySelector('p');
        let descText = description ? description.textContent.toLowerCase() : '';

        if (fruitName.includes(searchText) || descText.includes(searchText)) {
            fruit.style.display = 'flex';   // important if using flex
        } else {
            fruit.style.display = 'none';
        }
    });
});
