// ===============================
// SELECT THE FORM ELEMENT
// ===============================

// Get the first <form> element from the page
let form = document.getElementsByTagName('form')[0];


// ===============================
// CREATE DESCRIPTION INPUT FIELD
// ===============================

// Create a new input element dynamically
let descriptionInput = document.createElement('input');

// Set the type of input as text
descriptionInput.type = 'text';

// Assign an id so we can access it later
descriptionInput.id = 'description';

// Add placeholder text inside the input
descriptionInput.placeholder = 'Enter fruit description';

// Select the existing submit button inside the form
let button = form.querySelector('button');

// Insert the description input before the button
// So order becomes: fruit name input → description input → button
form.insertBefore(descriptionInput, button);


// ===============================
// SELECT THE FRUIT LIST (UL)
// ===============================

// Select the <ul> element that contains fruit items
let fruititems = document.querySelector('.fruits');


// ==================================================
// ADD EDIT BUTTON TO ALREADY EXISTING FRUITS
// ==================================================

// Loop through all existing fruit <li> elements
document.querySelectorAll('.fruit').forEach(function (li) {

    // Create an Edit button
    let editBtn = document.createElement('button');

    // Set text inside button
    editBtn.textContent = 'Edit';

    // Add class for styling & event detection
    editBtn.className = 'edit-btn';

    // Append Edit button inside existing <li>
    li.appendChild(editBtn);
});


// ===============================
// ADD FRUIT FUNCTIONALITY
// ===============================

// Listen for form submission
form.addEventListener('submit', function (event) {

    // Prevent page reload
    event.preventDefault();

    // Get fruit name from input
    let fruitName = document.getElementById('fruit-to-add').value;

    // Get fruit description
    let fruitDescription = document.getElementById('description').value;

    // Validate inputs (both required)
    if (fruitName === '' || fruitDescription === '') {
        alert('Please enter fruit name and description.');
        return; // stop execution
    }

    // Create new <li> element
    let li = document.createElement('li');

    // Add class for styling & filtering
    li.className = 'fruit';


    // ===============================
    // ADD FRUIT NAME
    // ===============================

    // Add fruit name as plain text node
    li.appendChild(document.createTextNode(fruitName));


    // ===============================
    // ADD DESCRIPTION
    // ===============================

    // Create <p> element for description
    let p = document.createElement('p');

    // Make description italic
    p.style.fontStyle = 'italic';

    // Insert description text
    p.textContent = fruitDescription;

    // Append paragraph inside <li>
    li.appendChild(p);


    // ===============================
    // ADD DELETE BUTTON
    // ===============================

    let deleteBtn = document.createElement('button');

    deleteBtn.textContent = 'x';

    deleteBtn.className = 'delete-btn';

    li.appendChild(deleteBtn);


    // ===============================
    // ADD EDIT BUTTON
    // ===============================

    let editBtn = document.createElement('button');

    editBtn.textContent = 'Edit';

    editBtn.className = 'edit-btn';

    li.appendChild(editBtn);


    // Add completed <li> to the fruit list
    fruititems.appendChild(li);

    // Clear input fields after adding
    document.getElementById('fruit-to-add').value = '';
    document.getElementById('description').value = '';
});


// =====================================
// DELETE + EDIT FUNCTIONALITY
// (Using Event Delegation)
// =====================================

// Add click listener to entire <ul>
// This works for existing and future elements
fruititems.addEventListener('click', function (event) {

    // ===============================
    // DELETE LOGIC
    // ===============================

    if (event.target.classList.contains('delete-btn')) {

        // Get parent <li> of clicked button
        let item = event.target.parentElement;

        // Remove that <li> from list
        fruititems.removeChild(item);
    }


    // ===============================
    // EDIT LOGIC
    // ===============================

    if (event.target.classList.contains('edit-btn')) {

        // Get parent <li>
        let item = event.target.parentElement;

        // Get fruit name (first text node)
        let fruitName = item.childNodes[0].textContent.trim();

        // Try to find description paragraph
        let descriptionElement = item.querySelector('p');

        // If description exists, get its text
        // Otherwise use empty string (for old items)
        let description = descriptionElement
            ? descriptionElement.textContent
            : "";

        // Put values back into input fields
        document.getElementById('fruit-to-add').value = fruitName;
        document.getElementById('description').value = description;

        // Remove old item so user can re-submit updated version
        fruititems.removeChild(item);
    }
});


// ===============================
// FILTER FUNCTIONALITY
// ===============================

// Select search input
let filter = document.getElementById('filter');

// Run filter every time user types
filter.addEventListener('keyup', function () {

    // Get search text and convert to lowercase
    let searchText = filter.value.toLowerCase();

    // Select all fruit items
    let fruits = document.querySelectorAll('.fruit');

    // Loop through each fruit
    fruits.forEach(function (fruit) {

        // Get fruit name
        let fruitName = fruit.childNodes[0].textContent.toLowerCase();

        // Get description paragraph
        let description = fruit.querySelector('p');

        // If description exists, get text
        let descText = description
            ? description.textContent.toLowerCase()
            : '';

        // Check if search text matches name OR description
        if (fruitName.includes(searchText) || descText.includes(searchText)) {

            // Show fruit item (flex because CSS uses flex)
            fruit.style.display = 'flex';

        } else {

            // Hide fruit item
            fruit.style.display = 'none';
        }
    });
});
