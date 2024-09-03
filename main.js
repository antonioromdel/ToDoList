window.addEventListener("DOMContentLoaded", () => {


    let input = document.querySelector(".form__input")
    let form = document.querySelector(".main__form")
    let list = document.querySelector(".form__list")
    

    form.addEventListener("submit", (e) => {
        e.preventDefault()

        let task = input.value
        add(task)

    })

    function loadLIst() {

        let tasksAll = JSON.parse(localStorage.getItem("tasks"))

        if(tasksAll){
            tasksAll.forEach(task => {
                add(task.text, task.completed)
            })
        }

    }

    function add (taskText, taskCheck) {

        if(taskText.trim() != ""){
            
            let item = document.createElement("li")
            item.classList.add("list__item")
            list.appendChild(item)
            
            item.innerHTML += addItem(taskText, taskCheck)
            saveAndUpdateLocalStorage()
            input.value = ""

            let btnDelete = item.querySelector(".list__img")
            btnDelete.addEventListener("click", () => {
                deleteTask(item)
                saveAndUpdateLocalStorage()
            })

            let checkbox = item.querySelector(".task__check")
            checkbox.addEventListener("change", () => {
                
                saveAndUpdateLocalStorage()

            })

        }

    }

    function addItem(taskText, taskCheck){

        
            return `  
                <div class="list__task">
                        <input ${taskCheck ? "checked": ""} type="checkbox" class="task__check">
                            <p class="task__text">${taskText}</p>
                </div>

                <img class="list__img" src="img/borrar.png" alt="borrar-img">
        `
       
    }

    function saveAndUpdateLocalStorage() {
        let allTask = document.querySelectorAll(".list__task")

        let newTask = []

        allTask.forEach(item => {
            let task = item.querySelector(".task__text")
            let check = item.querySelector(".task__check")

            let taskObj = {
                text: task.innerText,
                completed: check.checked
            }
            newTask.push(taskObj)
            console.log(newTask)
        })

        localStorage.setItem("tasks", JSON.stringify(newTask))

    }

    function deleteTask(task){
        task.remove()
    }

    loadLIst()

})