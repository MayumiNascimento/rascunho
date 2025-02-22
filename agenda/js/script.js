document.addEventListener('DOMContentLoaded', function() {
    const calendarEl = document.getElementById('calendar');
    const addEventButton = document.getElementById('addEventButton');
    const eventModal = new bootstrap.Modal(document.getElementById('eventModal'));
    const eventDetailsModal = new bootstrap.Modal(document.getElementById('eventDetailsModal'));
    const eventForm = document.getElementById('eventForm');
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
  
    const eventDetailsName = document.getElementById('eventDetailsName');
    const eventDetailsDate = document.getElementById('eventDetailsDate');
    const eventDetailsTime = document.getElementById('eventDetailsTime');
    const eventDetailsStatus = document.getElementById('eventDetailsStatus');
    const statusCompleted = document.getElementById('statusCompleted');
    const statusCanceled = document.getElementById('statusCanceled');
    const deleteEventButton = document.getElementById('deleteEventButton');
    const editEventButton = document.getElementById('editEventButton');
  
    let events = JSON.parse(localStorage.getItem('events')) || [];
    let editingEventId = null; // Variável para armazenar o ID do evento em edição
  
    const calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth',
      locale: 'pt-br',
      selectable: true,
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,list'
      },
      events: events.map(event => ({
        id: String(event.id), // Certifique-se de que o ID seja string
        title: event.title,
        start: event.start,
        extendedProps: { status: event.status || 'Pendente' }
      })),
      dateClick: function(info) {
        document.getElementById('eventDate').value = info.dateStr;
        editingEventId = null; // Novo evento, então não há ID de edição
        eventModal.show();
      },
      eventClick: function(info) {
        const event = info.event;
        editingEventId = event.id; // Define o ID do evento que está sendo editado
  
        eventDetailsName.textContent = event.title;
        eventDetailsDate.textContent = event.start.toLocaleDateString('pt-BR');
        eventDetailsTime.textContent = event.start.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
        eventDetailsStatus.textContent = event.extendedProps.status || 'Pendente';
  
        if (event.extendedProps.status === 'Concluído') {
          statusCompleted.checked = true;
        } else if (event.extendedProps.status === 'Cancelado') {
          statusCanceled.checked = true;
        } else {
          statusCompleted.checked = false;
          statusCanceled.checked = false;
        }
  
        const updateStatus = () => {
          const selectedStatus = document.querySelector('input[name="status"]:checked')?.value || 'Pendente';
          event.setExtendedProp('status', selectedStatus);
          eventDetailsStatus.textContent = selectedStatus;
          updateEventInLocalStorage(event);
        };
  
        statusCompleted.addEventListener('change', updateStatus);
        statusCanceled.addEventListener('change', updateStatus);
  
        deleteEventButton.onclick = function() {
          events = events.filter(e => String(e.id) !== String(event.id));
          localStorage.setItem('events', JSON.stringify(events));
          event.remove();
          eventDetailsModal.hide();
        };
  
        editEventButton.onclick = function() {
          eventDetailsModal.hide();
          document.getElementById('eventName').value = event.title;
          document.getElementById('eventDate').value = event.start.toISOString().split('T')[0];
          document.getElementById('eventTime').value = event.start.toTimeString().split(' ')[0].substring(0, 5);
          eventModal.show();
        };
  
        eventDetailsModal.show();
      }
    });
  
    calendar.render();
  
    addEventButton.addEventListener('click', function() {
      document.getElementById('eventDate').value = '';
      editingEventId = null; // Novo evento
      eventModal.show();
    });
  
    eventForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const eventName = document.getElementById('eventName').value;
      const eventDate = document.getElementById('eventDate').value;
      const eventTime = document.getElementById('eventTime').value;
  
      if (eventName && eventDate && eventTime) {
        if (editingEventId) {
          // Editar evento existente
          const eventIndex = events.findIndex(e => String(e.id) === String(editingEventId));
          if (eventIndex !== -1) {
            events[eventIndex].title = eventName;
            events[eventIndex].start = `${eventDate}T${eventTime}:00`;
  
            const calendarEvent = calendar.getEventById(editingEventId);
            if (calendarEvent) {
              calendarEvent.setProp('title', eventName);
              calendarEvent.setDates(events[eventIndex].start);
            }
  
            localStorage.setItem('events', JSON.stringify(events));
          }
        } else {
          // Criar novo evento
          const newEvent = {
            id: String(Date.now()),
            title: eventName,
            start: `${eventDate}T${eventTime}:00`,
            allDay: false,
            status: 'Pendente'
          };
  
          events.push(newEvent);
          localStorage.setItem('events', JSON.stringify(events));
  
          calendar.addEvent(newEvent);
        }
  
        eventModal.hide();
        eventForm.reset();
        editingEventId = null; // Resetar ID de edição
      }
    });
  
    sidebarToggle.addEventListener('click', function() {
      sidebar.classList.toggle('d-none');
    });
  
    function updateEventInLocalStorage(event) {
      const eventIndex = events.findIndex(e => String(e.id) === String(event.id));
      if (eventIndex !== -1) {
        events[eventIndex] = {
          id: event.id,
          title: event.title,
          start: event.start.toISOString(),
          allDay: event.allDay,
          status: event.extendedProps.status || 'Pendente'
        };
        localStorage.setItem('events', JSON.stringify(events));
      }
    }
  });
  