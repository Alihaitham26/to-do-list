let activeTasks = AllBtn
let activeTasksType = "all"

// get the date and display it under today't task header
const date = new Date()
DateP.innerText = `${Months[date.getMonth()]}, ${WeekDays[date.getDay()]} ${date.getDate()}`

// get tasks form local storage and render them
tasks = localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : [] 
if (tasks.length > 0) renderTasks(tasks,()=>true)
AddTaskBtn.onclick = ()=>{
    if(TaskInput.value !== "" && NoteInput.value !== ""){
        let task = new Task(TaskInput.value,NoteInput.value,false)
        tasks.push(task)
        renderTasks(tasks,activeTasksType)
        saveToLocalStorage(tasks)
        TaskInput.value = ""
        NoteInput.value = ""
        InputForm.classList.remove("click")
    }
}
NewTaskBtn.onclick = () => {
    InputForm.classList.toggle("click")
}

// setup catigories buttons
function handleCategoryChange(activeBtn,newActiveTasks){
    activeTasks.classList.remove("active")
    activeBtn.classList.add("active")
    activeTasks = activeBtn
    activeTasksType = newActiveTasks
    renderTasks(tasks,newActiveTasks)
}
FinishedBtn.onclick = () => handleCategoryChange(FinishedBtn,"finished")
InprogBtn.onclick = () => handleCategoryChange(InprogBtn,"inProg")
AllBtn.onclick = () => handleCategoryChange(AllBtn,"all")