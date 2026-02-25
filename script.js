// API URL
const API_URL = "https://crudcrud.com/api/263b70ce48a241368ca3bf322be954d3/bookings";

// Select DOM elements
const form = document.getElementById("bookingForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const busSelect = document.getElementById("busNumber");
const filterSelect = document.getElementById("filter");
const bookingList = document.getElementById("bookingList");

let editId = null;
let allBookings = [];

// Event listeners
form.addEventListener("submit", handleFormSubmit);
filterSelect.addEventListener("change", handleFilterChange);

// Load bookings
async function loadBooking(){
    try{
        const response = await axios.get(API_URL);
        allBookings = response.data;
        renderBooking(allBookings);
    }catch(error){
        console.error("Error fetching bookings:", error);
    }
}

// Render bookings
function renderBooking(bookings){
    bookingList.innerHTML = "";

    bookings.forEach(function(booking){
        const div = document.createElement("div");
        div.className = "booking-item";

        div.innerHTML =`
            ${booking.name} - 
            ${booking.email} - 
            ${booking.phone} - 
            ${booking.busNumber}
            <button onclick="editBooking('${booking._id}')">Edit</button>
            <button onclick="deleteBooking('${booking._id}')">Delete</button>
        `;

        bookingList.appendChild(div);
    });
}

// Handle form submit
async function handleFormSubmit(event){
    event.preventDefault();

    const bookingData ={
        name: nameInput.value,
        email: emailInput.value,
        phone: phoneInput.value,
        busNumber: busSelect.value
    };

    try{
        if(editId){
            await axios.put(`${API_URL}/${editId}`, bookingData);
            editId = null;
        }else{
            await axios.post(API_URL, bookingData);
        }

        form.reset();
        loadBooking();

    } catch(error){
        console.error("Error saving booking:", error);
    }
}

// Delete
async function deleteBooking(id){
    try{
        await axios.delete(`${API_URL}/${id}`);
        loadBooking();
    }catch(error){
        console.error("Error deleting:", error);
    }
}

// Edit
function editBooking(id){
    const booking = allBookings.find(function(item){
        return item._id === id;
    });

    if (!booking) return;

    nameInput.value = booking.name;
    emailInput.value = booking.email;
    phoneInput.value = booking.phone;
    busSelect.value = booking.busNumber;

    editId = id;
}

// Filter
function handleFilterChange() {
    const selectedBus = filterSelect.value;

    if (selectedBus === "All") {
        renderBooking(allBookings);
    } else {
        const filtered = allBookings.filter(function (booking) {
            return booking.busNumber === selectedBus;
        });

        renderBooking(filtered);
    }
}

loadBooking();