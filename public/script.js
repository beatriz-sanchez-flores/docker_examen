// Escuchar el evento de envío del formulario
const createTaskForm = document.getElementById('createTaskForm');
createTaskForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Evitar el comportamiento de envío predeterminado del formulario
  const taskTitle = document.getElementById('taskTitle').value;
  const taskDescription = document.getElementById('taskDescription').value;

  // Enviar la solicitud POST al servidor para crear la nueva tarea
  fetch('/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: taskTitle,
      description: taskDescription
    })
  })
    .then(response => response.json())
    .then(newTask => {
      console.log('Nueva tarea creada:', newTask);
      createTaskForm.reset(); // Reiniciar el formulario después de crear la tarea
      getTasks(); // Volver a cargar las tareas después de crear una nueva
    })
    .catch(error => {
      console.error('Error al crear una nueva tarea:', error);
    });
});

// Obtener y mostrar las tareas
function getTasks() {
  fetch('/tasks')
    .then(response => response.json())
    .then(tasks => {
      const taskList = document.getElementById('taskList');
      taskList.innerHTML = ''; // Limpiar la lista antes de agregar las nuevas tareas
      tasks.forEach(task => {
        const liElement = document.createElement('li');
        liElement.classList.add('list-group-item');

        const titleElement = document.createElement('h3');
        titleElement.classList.add('mb-0');
        titleElement.textContent = task.title;

        const descriptionElement = document.createElement('p');
        descriptionElement.classList.add('mb-1');
        descriptionElement.textContent = task.description;

        const statusElement = document.createElement('p');
        statusElement.classList.add('mb-0');

        if (task.completed) {
          liElement.classList.add('list-group-item-success');
          statusElement.textContent = 'Completada';
        } else {
          liElement.classList.add('list-group-item-warning');
          statusElement.textContent = 'Pendiente';
        }

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('btn', 'btn-danger');
        deleteButton.textContent = 'Eliminar';
        deleteButton.addEventListener('click', () => {
          deleteTask(task._id); // Llama a una función para eliminar la tarea por su ID
        });

        const updateButton = document.createElement('button');
        updateButton.classList.add('btn', 'btn-primary', 'ms-2');
        updateButton.textContent = 'Actualizar';
        updateButton.addEventListener('click', () => {
          openUpdateModal(task); // Llama a una función para abrir el modal de actualización
        });

        liElement.appendChild(titleElement);
        liElement.appendChild(descriptionElement);
        liElement.appendChild(statusElement);
        liElement.appendChild(deleteButton);
        liElement.appendChild(updateButton);

        taskList.appendChild(liElement);
      });
    })
    .catch(error => {
      console.error('Error al obtener las tareas:', error);
    });
}

// Eliminar una tarea por su ID
function deleteTask(taskId) {
  fetch(`/tasks/${taskId}`, { method: 'DELETE' })
    .then(response => response.json())
    .then(result => {
      console.log('Tarea eliminada:', result);
      getTasks(); // Vuelve a cargar las tareas después de eliminar una
    })
    .catch(error => {
      console.error('Error al eliminar la tarea:', error);
    });
}


// Función para mostrar el modal de actualización con los datos de la tarea
function openUpdateModal(taskId) {
    fetch(`/tasks/${taskId}`)
      .then(response => response.json())
      .then(task => {
        const updateTaskTitle = document.getElementById('updateTaskTitle');
        const updateTaskDescription = document.getElementById('updateTaskDescription');
  
        updateTaskTitle.value = task.title;
        updateTaskDescription.value = task.description;
  
        const updateTaskForm = document.getElementById('updateTaskForm');
        updateTaskForm.addEventListener('submit', (event) => {
          event.preventDefault();
          const updatedTaskTitle = updateTaskTitle.value;
          const updatedTaskDescription = updateTaskDescription.value;
  
          // Aquí puedes realizar la solicitud de actualización al servidor
          // y luego cerrar el modal si la actualización fue exitosa
  
          const updateModal = new bootstrap.Modal(document.getElementById('updateModal'));
          updateModal.hide(); // Ocultar el modal después de la actualización
        });
  
        const updateModal = new bootstrap.Modal(document.getElementById('updateModal'));
        updateModal.show(); // Mostrar el modal de actualización
      })
      .catch(error => {
        console.error('Error al obtener los datos de la tarea:', error);
      });
  }
  
  // Llamar a la función para obtener y mostrar las tareas
  getTasks();