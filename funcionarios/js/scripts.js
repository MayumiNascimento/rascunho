
document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("modal");
    const openModalBtn = document.getElementById("openModalBtn");
    const closeModalBtn = document.getElementsByClassName("close")[0];
    const addRowForm = document.getElementById("addRowForm");
    const mainTable = document.getElementById("mainTable").getElementsByTagName("tbody")[0];

    openModalBtn.onclick = function() {
        modal.style.display = "block";
    }

    closeModalBtn.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    addRowForm.onsubmit = function(event) {
        event.preventDefault();
        const col1 = document.getElementById("col1").value;
        const col2 = document.getElementById("col2").value;
        const col3 = document.getElementById("col3").value;
        const col4 = document.getElementById("col4").value;

        const newRow = mainTable.insertRow();
        newRow.insertCell(0).innerText = col1;
        newRow.insertCell(1).innerText = col2;
        newRow.insertCell(2).innerText = col3;
        newRow.insertCell(3).innerText = col4;

        modal.style.display = "none";
        addRowForm.reset();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const calendarEl = document.getElementById('calendar');
    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        locale: 'pt-br',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        events: [
            {
                title: 'Reunião',
                start: '2023-08-03T10:00:00',
                end: '2023-08-03T12:00:00'
            },
            {
                title: 'Almoço',
                start: '2023-08-03T12:00:00',
                end: '2023-08-03T13:00:00'
            },
            {
                title: 'Treinamento',
                start: '2023-08-03T14:00:00',
                end: '2023-08-03T16:00:00'
            }
        ]
    });
    calendar.render();

    const schedule = document.querySelector('.schedule');

    schedule.addEventListener('dblclick', (e) => {
        if (e.target.classList.contains('event')) return;

        const eventName = prompt('Nome do evento:');
        if (!eventName) return;

        const newEvent = document.createElement('div');
        newEvent.classList.add('event');
        newEvent.textContent = eventName;

        // Ajuste as linhas e colunas conforme necessário
        newEvent.style.gridRow = '2 / 4';
        newEvent.style.gridColumn = '2';

        schedule.appendChild(newEvent);
    });
});



