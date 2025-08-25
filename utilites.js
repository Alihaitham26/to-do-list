const DateP = document.getElementById("date")
const TasksDiv = document.getElementById("tasks")
const NewTaskBtn = document.getElementById("newTaskBtn")
const InputForm = document.getElementById("taskMaker")
const AddTaskBtn = document.getElementById("addTask")
const TaskInput = document.getElementById("taskInp")
const NoteInput = document.getElementById("noteInp")
const AllBtn = document.getElementById("all")
const InprogBtn = document.getElementById("inPorgress")
const FinishedBtn = document.getElementById("finished")
const NoOFTasks = document.getElementById("NoOfTasks")
const NoOFTasksInProg = document.getElementById("NoOfTasksInProg")
const NoOFTasksFinished = document.getElementById("NoOfTasksFinished")

const Months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
const WeekDays = ["Sunday","Monday","TuesDay","Wednesday","Thursday","Friday","Saturday"]

class Task{
    constructor(title,note,isChecked){
        this.title = title
        this.note = note
        this.isChecked = isChecked
    }
}

let tasks = []

function saveToLocalStorage(){
    console.log(tasks)
    localStorage.setItem("tasks",JSON.stringify(tasks))
}
function createTaskLi(task){
    let taskLi= document.createElement("li")
    let titleP = document.createElement("p")
    titleP.innerText = task.title
    let checkbox = document.createElement("input")
    checkbox.type = "checkbox"
    checkbox.onclick = () => {
        task.isChecked = checkbox.checked
        saveToLocalStorage(tasks)
        renderTasks(tasks,activeTasksType)
    }
    checkbox.checked = task.isChecked
    let noteS = document.createElement("span")
    noteS.innerText = task.note
    noteS.className = "note"
    taskLi.appendChild(titleP)
    taskLi.appendChild(checkbox)
    taskLi.appendChild(noteS)
    return taskLi
}

function AddTask(task){
    TasksDiv.appendChild(createTaskLi(task))
}

function renderTasks(tasks,tasksType){
    TasksDiv.innerHTML = ""
    NoOFTasks.innerText = tasks.length
    NoOFTasksInProg.innerText = tasks.filter(task => !task.isChecked).length
    NoOFTasksFinished.innerText = tasks.filter(task => task.isChecked).length

    if(tasksType === "finished"){
        tasks.filter((task)=>task.isChecked).forEach((task)=>AddTask(task))
    }else if(tasksType === "inProg"){
        tasks.filter(task=>!task.isChecked).forEach((task)=>AddTask(task))
    }else{
        tasks.forEach((task)=>AddTask(task))
    }
}
