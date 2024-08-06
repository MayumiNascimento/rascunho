
// =======================|calendario|=========================
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
                title: 'corte',
                start: '2023-08-03T10:00:00',
                end: '2023-08-03T12:00:00'
            },
            {
                title: 'Almoço',
                start: '2023-08-03T12:00:00',
                end: '2023-08-03T13:00:00'
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
