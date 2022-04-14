const taskDiv = document.querySelector('.tasks')
const taskList = document.querySelectorAll('.task')
const newTaskBtn = document.querySelector('.add-task__btn')

// Adds task
const addTask = () => {
    const newTaskInput = document.querySelector('#add-task__input')

    // Validate
    if (newTaskInput.value == '') {
        newTaskInput.placeholder = 'Musisz wpisać treść zadania!'
        return
    }

    // Create HTML elements
    const newTaskCheckbox = document.createElement('div')
    newTaskCheckbox.classList.add('task__checkbox')
    newTaskCheckbox.innerHTML = '<input type="checkbox">'

    const newTaskContent = document.createElement('div')
    newTaskContent.classList.add('task__content')
    newTaskContent.textContent = newTaskInput.value

    const newTaskDeleteBtn = document.createElement('div')
    newTaskDeleteBtn.classList.add('task__delete')
    newTaskDeleteBtn.innerHTML = '<img src="./assets/trash.svg" alt="Delete">'

    const newTask = document.createElement('div')
    newTask.classList.add('task')
    newTask.appendChild(newTaskCheckbox)
    newTask.appendChild(newTaskContent)
    newTask.appendChild(newTaskDeleteBtn)

    // Add functions to new task
    taskFunctions(newTask)

    // Add task to site
    taskDiv.appendChild(newTask)
}


// Deletes task
const deleteTask = e => {
    const task = e.target.closest('.task')
    task.remove()
}


const taskStatus = e => {
    const task = e.target.closest('.task')
    const taskCheckbox = e.target

    if (taskCheckbox.checked) {
        task.classList.add('task--complete')
    }
    else {
        task.classList.remove('task--complete')
    }
}


// Adds functionality to task element (complete, delete)
const taskFunctions = e => {
    const task = e
    const taskCheckbox = task.querySelector('.task__checkbox > input')
    const taskDeleteBtn = task.querySelector('.task__delete')

    taskCheckbox.addEventListener('click', taskStatus)
    taskDeleteBtn.addEventListener('click', deleteTask)
}


taskList.forEach(e => {
    taskFunctions(e)
})

newTaskBtn.addEventListener('click', addTask)