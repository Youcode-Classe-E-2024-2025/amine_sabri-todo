const btnAdd = document.getElementById("btnAdd");
const myModel = document.getElementById("myModal");
const close = document.getElementById("close");
let editIndex = null;

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

    if(!title || !date || !description || !priority || !status){
        alert("form raha vide");
        return;
    }

    let task = {
        title: title,
        description: description,
        date: date,
        priority: priority,
        status: status
    };

    let tasks = JSON.parse(localStorage.getItem('taskss')) || [];

    if (editIndex !== null) {
        tasks[editIndex] = task;
    } else {
        tasks.push(task); 
    }

    localStorage.setItem('taskss', JSON.stringify(tasks));
    videForm();
    ajouteTask();
    myModel.classList.toggle("hidden");
});


// vide forms
function videForm() {
    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    document.getElementById("date").value = "";
    document.getElementById("priority").value = "";
    document.getElementById("Statut").value = "";
    editIndex = null;
}


// counteur 
function TaskCount() {
    const countTodo = document.getElementById("countTodo");
    const countDoing = document.getElementById("countDoing");
    const countDone = document.getElementById("countDone");

    let tasks = JSON.parse(localStorage.getItem('taskss')) || [];

    
    const todoCount = tasks.filter(task => task.status === "todo").length;
    const doingCount = tasks.filter(task => task.status === "doing").length;
    const doneCount = tasks.filter(task => task.status === "done").length;

    
    countTodo.innerText = todoCount;
    countDoing.innerText = doingCount;
    countDone.innerText = doneCount;
}


window.onload = function() {
    ajouteTask();
};


// ajouter tache dand la page
function ajouteTask() {
    const tasks = JSON.parse(localStorage.getItem('taskss')) || [];
    document.getElementById("tache").innerHTML = "";
    document.getElementById("doingTasks").innerHTML = "";
    document.getElementById("doneTasks").innerHTML = "";

    tasks.sort((a, b) => new Date(a.date) - new Date(b.date));

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
                <p class="border-2 border-zinc-900 w-24 text-center font-bold rounded-se-xl ${task.priority === 'p1' ? 'bg-red-500' : 
                    task.priority === 'p2' ? 'bg-orange-500' : 
                    task.priority === 'p3' ? 'bg-green-500' : 'bg-lime-500'}  text-neutral-50
                
                ">${task.priority}</p>
                <input type="date" class="border-2 border-zinc-900 w-34 text-center font-bold rounded-es-xl" value="${task.date}">
            </div>
        `;

        if (task.status === "todo") {
            document.getElementById("tache").appendChild(divTask);
        } else if (task.status === "doing") {
            document.getElementById("doingTasks").appendChild(divTask);
        } else if (task.status === "done") {
            document.getElementById("doneTasks").appendChild(divTask);
        }

        
        const deleteTaskBtn = divTask.querySelector('.bi-trash');
        const editTaskBtn = divTask.querySelector('.bi-pencil-square');

        deleteTaskBtn.addEventListener('click', function() {
            deleteTask(index); 
        });

        editTaskBtn.addEventListener('click', function() {
            editTask(index); 
        });
    });

    TaskCount(); 
}

//  delete tache

function deleteTask(index) {
    let tasks = JSON.parse(localStorage.getItem('taskss')) || [];
    
    // Prompt for confirmation before deleting
    if (confirm("wx mataakad bghi tam7i tache ?")) {
        tasks.splice(index, 1); 
        localStorage.setItem('taskss', JSON.stringify(tasks)); 
        ajouteTask(); 
    }
}



// edit tache 

function editTask(index) {
    const tasks = JSON.parse(localStorage.getItem('taskss')) || [];
    const task = tasks[index];

    document.getElementById("title").value = task.title;
    document.getElementById("description").value = task.description;
    document.getElementById("date").value = task.date;
    document.getElementById("priority").value = task.priority;
    document.getElementById("Statut").value = task.status;

    myModel.classList.remove("hidden"); 
    editIndex = index;
}
