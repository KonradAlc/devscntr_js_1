const taskContainer = document.querySelector('.tasks')
const newTaskBtn = document.querySelector('.add-task__btn')
const newTaskInput = document.querySelector('#add-task__input')
const localTasks = {...localStorage}
let idList = []
let lastID


const swap = (a, b) => {
    let temp = a
    a = b
    b = temp
    return [...a, b]
}


const getFreeID = () => {
    idList.sort()
    idList.sort((a,b) => {
        return a-b
    })

    let id
    for (id = 0; id < idList.length; id++) {
        if (id != idList[id]) {
            return id
        }
    }
    return id
}


const swapTask = (task1, task2) => {
    let id1 = task1.id
    let id2 = task2.id

    const task1obj = JSON.parse(localStorage.getItem(id1))
    const task2obj = JSON.parse(localStorage.getItem(id2))

    localStorage.setItem(id2, JSON.stringify(task1obj))
    localStorage.setItem(id1, JSON.stringify(task2obj))

    const temp = task1.id
    task1.id = task2.id
    task2.id = temp
}


const createTaskElement = (id, taskContent, isCompleted) => {
    // Create HTML elements
    const newTaskCheckbox = document.createElement('div')
    newTaskCheckbox.classList.add('task__checkbox')
    newTaskCheckbox.innerHTML = `<input type="checkbox" ${isCompleted && 'checked'}>`

    const newTaskContent = document.createElement('div')
    newTaskContent.classList.add('task__content')
    newTaskContent.textContent = taskContent

    const newTaskDeleteBtn = document.createElement('div')
    newTaskDeleteBtn.classList.add('task__delete')
    newTaskDeleteBtn.innerHTML = '<img src="./assets/trash.svg" alt="Delete">'

    const newTask = document.createElement('div')
    newTask.classList.add('task')
    newTask.id = id
    newTask.setAttribute('draggable', 'true')
    newTask.appendChild(newTaskCheckbox)
    newTask.appendChild(newTaskContent)
    newTask.appendChild(newTaskDeleteBtn)

    // Add functions to new task
    taskFunctions(newTask)

    // Add element to site
    taskContainer.appendChild(newTask)
}


// Adds task
const addTask = () => {
    const newTaskContent = newTaskInput.value

    // Validate
    if (newTaskContent == '') {
        newTaskInput.placeholder = 'Musisz wpisać treść zadania!'
        return
    }

    // Clear input
    newTaskInput.value = ''

    const Task = {
        taskContent: newTaskContent,
        isCompleted: false
    }

    id = getFreeID()
    createTaskElement(lastID, newTaskContent, false)

    idList.push(id)

    localStorage.setItem(id, JSON.stringify(Task))
}


// Deletes task
const deleteTask = e => {
    const task = e.target.closest('.task')
    const taskID = task.id

    task.remove()
    localStorage.removeItem(taskID)
}


const taskStatusStyle = (id, isCompleted) => {
    const task = document.getElementById(id)
    if (isCompleted) { task.classList.add('task--complete') }
    else { task.classList.remove('task--complete') }
}


const taskStatusChange = e => {
    const task = e.target.closest('.task')
    const taskID = task.id
    const isCompleted = e.target.checked

    taskStatusStyle(taskID, isCompleted)

    Task = JSON.parse(localStorage.getItem(taskID))
    Task.isCompleted = isCompleted

    localStorage.setItem(taskID, JSON.stringify(Task))
}


// Adds functionality to task element (complete, delete)
const taskFunctions = e => {
    const task = e
    const taskCheckbox = task.querySelector('.task__checkbox > input')
    const taskDeleteBtn = task.querySelector('.task__delete')

    taskCheckbox.addEventListener('click', taskStatusChange)
    taskDeleteBtn.addEventListener('click', deleteTask)

    // Allow dragging
    task.addEventListener('dragstart', () => {
        task.classList.add('dragging')
    })

    task.addEventListener('dragend', e => {
        const afterElement = getDragAfterElement(taskContainer, e.clientY)
        if (afterElement != null) { swapTask(task, afterElement) }

        task.classList.remove('dragging')
    })
}


// Load tasks from local storage
const loadTasks = () => {
    let Task
    let keys = Object.keys(localStorage);
    lastID = Math.max(...keys)

    // Sort keys
    keys = keys.map(key => {
        return parseInt(key)
    })
    keys.sort((a,b) => {
        return a-b
    })
    idList = keys

    // Add tasks to container
    keys.forEach(key => {
        Task = JSON.parse(localStorage.getItem(key))
        createTaskElement(key, Task.taskContent, Task.isCompleted)
        taskStatusStyle(key, Task.isCompleted)
    })
}

document.addEventListener('DOMContentLoaded', () => {
    loadTasks()
    newTaskBtn.addEventListener('click', addTask)
    newTaskInput.addEventListener("keyup", e => {
        // Check if key is ENTER
        if (e.keyCode === 13) {
          addTask()
        }
    })
})


// Dragging tasks
taskContainer.addEventListener('dragover', e => {
    e.preventDefault()
    const afterElement = getDragAfterElement(taskContainer, e.clientY)
    const draggable = document.querySelector('.dragging')
    if (afterElement != null) {
        taskContainer.insertBefore(draggable, afterElement)
    }
})

const getDragAfterElement = (container, y) => {
    const allTasks = [...container.querySelectorAll('.task:not(.dragging)')]

    return allTasks.reduce((closest, child) => {
        const box = child.getBoundingClientRect()
        const offset = y - box.top - box.height / 2
        
        if (offset < 0 && offset > closest.offset) {
            return {
                offset: offset,
                element: child
            }
        }
        else {
            return closest
        }
        
    }, { offset: Number.NEGATIVE_INFINITY }).element
}