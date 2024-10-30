const btnAdd = document.getElementById("btnAdd");
const myModel = document.getElementById("myModal");
const close = document.getElementById("close");

btnAdd.addEventListener("click", function() {
    myModel.classList.toggle("hidden");
});

close.addEventListener("click", function() {
    myModel.classList.toggle("hidden");
});

const submitTache = document.getElementById("submitTache");

submitTache.addEventListener("click", function(e) {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const date = document.getElementById("date").value;
    const priority = document.getElementById("priority").value;
    const status = document.getElementById("Statut").value;

    let task = {
        title: title,
        description: description,
        date: date,
        priority: priority,
        status: status
    };

    let tasks = JSON.parse(localStorage.getItem('taskss')) || [];
    tasks.push(task);
    localStorage.setItem('taskss', JSON.stringify(tasks));

   
    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    document.getElementById("date").value = "";
    document.getElementById("priority").value = "";
    document.getElementById("Statut").value = "";

    ajouteTask();
    
});

function TaskCount(){
    const count = document.getElementById("count");
    let tasks = JSON.parse(localStorage.getItem('taskss')) || [];
    const taskCount = tasks.length;

    count.innerText = taskCount
    // console.log(taskCount);
}

window.onload = function() {
    ajouteTask();
};

function ajouteTask() {
    const tasks = JSON.parse(localStorage.getItem('taskss')) || [];
    const todo = document.getElementById("tache");
    todo.innerHTML = ""; 
    tasks.forEach((task, index) => {
        const divTask = document.createElement('div'); 
        divTask.innerHTML = `
            <div class="header-tache border-b-2 border-zinc-900 flex justify-between items-center w-full p-3">
                <i class="bi bi-pencil-square"></i>
                <h3 class="font-semibold">${task.title}</h3>
                <i class="bi bi-trash"></i>
            </div>
            <div class="description-tache overflow-y-scroll h-24">
                <p>${task.description}</p>
            </div>
            <div class="foot-tache flex justify-between mt-2">
                <p class="border-2 border-zinc-900 w-24 text-center font-bold rounded-se-xl 
                ${task.priority === 'p1' ? 'bg-red-500' : 
                    task.priority === 'p2' ? 'bg-green-500' : 
                    task.priority === 'p3' ? 'bg-blue-500' : 'bg-lime-500'} 
                text-neutral-50">
                ${task.priority}
                </p>
                <input type="date" class="border-2 border-zinc-900 w-34 text-center font-bold rounded-es-xl" value="${task.date}">
            </div>
        `;

        divTask.querySelector('.bi-trash').addEventListener('click', function() {
            deleteTask(index); 
        });

        todo.appendChild(divTask);
    });
    TaskCount();
}

function deleteTask(index) {
    let tasks = JSON.parse(localStorage.getItem('taskss')) || [];
    tasks.splice(index, 1); 
    localStorage.setItem('taskss', JSON.stringify(tasks)); 
    ajouteTask(); 
}
