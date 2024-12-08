//gets html elements to interact with the page
var calendarDays = document.getElementById("calendarDays");
var monthYear = document.getElementById("monthYear");
var eventModal = document.getElementById("eventModal");
var modalDate = document.getElementById("modalDate");
var eventText = document.getElementById("eventText");
var saveEvent = document.getElementById("saveEvent");
var closeModal = document.getElementById("closeModal");

//store current date and events
var currentDate = new Date();
var events = {};

//to show the calendar
function renderCalendar() {
//to clear the calendar
    calendarDays.innerHTML = "";

//to get the current date and year
    var month = currentDate.getMonth();
    var year = currentDate.getFullYear();

//to show the current month and year
    monthYear.textContent = currentDate.toLocaleString("default", { month: "long" }) + " " + year;

//gets the first day of the month and total amount of days in that month
    var firstDay = new Date(year, month, 1).getDay();
    var lastDate = new Date(year, month + 1, 0).getDate();

//to add spaces before the first day to make sure day 1 starts on the right day of the week
    for (var i = 0; i < firstDay; i++) {
        var emptyDiv = document.createElement("div");
        calendarDays.appendChild(emptyDiv);
    }

//add the days to the calendar
    for (var date = 1; date <= lastDate; date++) {
        var dayDiv = document.createElement("div");
        dayDiv.textContent = date;
        dayDiv.dataset.date = year + "-" + (month + 1) + "-" + date;

//adds color to days that have events
        if (events[dayDiv.dataset.date]) {
//the color of the days with events will be red
        dayDiv.style.backgroundColor = "#ee3528";
        }

//to open the modal when it is clicked
        dayDiv.onclick = function () {
            openModal(this.dataset.date);
        };

        calendarDays.appendChild(dayDiv);
    }
}

//to open the modal
function openModal(date) {
    modalDate.textContent = "Notes for " + date; //shows selected date
    eventText.value = events[date] || ""; //shows events already entered
    eventModal.dataset.date = date; //stores selected date in the modal
    eventModal.style.display = "block"; //to show the modal
}

//to close the modal
function closeModalHandler() {
    eventModal.style.display = "none"; //hides modal
}

//function that saves the event
function saveEventHandler() {
    var date = eventModal.dataset.date; //gets selected date
    var text = eventText.value; //gets entered text

    if (text !== "") {
        events[date] = text; //saves event
    } else {
        delete events[date]; //removes event if the text is empty
    }
//updates the calendar
    renderCalendar();
    closeModalHandler();
}

//shows the previous month
document.getElementById("prevMonth").onclick = function () {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
};

//shows the next month
document.getElementById("nextMonth").onclick = function () {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
};

//to set up the modal buttons
closeModal.onclick = closeModalHandler;
saveEvent.onclick = saveEventHandler;

//shows the calendar for the first time
renderCalendar();
