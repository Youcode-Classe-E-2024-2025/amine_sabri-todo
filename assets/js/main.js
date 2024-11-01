const btnAdd = document.getElementById("btnAdd");
const myModel = document.getElementById("myModal");
const close = document.getElementById("close");


btnAdd.addEventListener("click", function() {
    myModel.classList.toggle("hidden");
});

close.addEventListener("click", function() {
    myModel.classList.toggle("hidden");
});

const tasks = JSON.parse(localStorage.getItem('taskss'))  || [];
let index=0;
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
        id:index++,
        title: title,
        description: description,
        date: date,
        priority: priority,
        status: status
    };


    tasks.push(task); 
  
    // console.log(tasks);
    localStorage.setItem('taskss', JSON.stringify(tasks));
    videForm();
    afficheTask(tasks);
    
    // myModel.classList.toggle("hidden");
});


// vide forms
function videForm() {
    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    document.getElementById("date").value = "";
    document.getElementById("priority").value = "";
    document.getElementById("Statut").value = "";
    
}


// counteur 
function TaskCount() {
    const countTodo = document.getElementById("countTodo");
    const countDoing = document.getElementById("countDoing");
    const countDone = document.getElementById("countDone");

    let tasks = JSON.parse(localStorage.getItem('taskss'));

    
    const todoCount = tasks.filter(task => task.status === "todo").length;
    const doingCount = tasks.filter(task => task.status === "doing").length;
    const doneCount = tasks.filter(task => task.status === "done").length;

    
    countTodo.innerText = todoCount;
    countDoing.innerText = doingCount;
    countDone.innerText = doneCount;
}

window.onload = function(){
    afficheTask(tasks);
}



// affichage tache dand la page
function afficheTask(arr) {
    // const tasks = JSON.parse(localStorage.getItem('taskss'));
    document.getElementById("tache").innerHTML = "";
    document.getElementById("doingTasks").innerHTML = "";
    document.getElementById("doneTasks").innerHTML = "";

    arr.sort((a, b) => new Date(a.date) - new Date(b.date));
    arr.forEach((task) => {
        const divTask = document.createElement('div');
        divTask.innerHTML = `
            <div class="task bg-white shadow-lg rounded-lg m-4 p-4 transition-transform duration-300 transform hover:scale-105">
    <div class="header-tache border-b-2 border-gray-300 flex justify-between items-center pb-2">
        <i class="bi bi-pencil-square text-blue-600"></i>
        <h3 class="font-semibold text-xl text-gray-800 truncate">${task.title}</h3>
        <i class="bi bi-trash text-red-600 cursor-pointer hover:text-red-800"></i>
    </div>
    <div class="description-tache overflow-y-auto h-24 bg-gray-50 p-2 rounded-lg mt-2  ">
        <p class="text-gray-600 break-words max-w-[365px] whitespace-normal">${task.description}</p>
    </div>
    <div class="foot-tache flex justify-between mt-2 items-center">
        <p class="border-2 border-gray-300 w-24 text-center font-bold rounded-md 
            ${task.priority === 'p1' ? 'bg-red-500' : 
              task.priority === 'p2' ? 'bg-orange-500' : 
              task.priority === 'p3' ? 'bg-green-500' : 'bg-lime-500'} 
            text-white transition-colors duration-300">
            ${task.priority}
        </p>
        <input type="date" class="border-2 border-gray-300 w-32 text-center font-bold rounded-md" value="${task.date}">
    </div>
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

        deleteTaskBtn.addEventListener('click', function(e) {
            e.preventDefault();
            deleteTask(task.id); 
            afficheTask(tasks);

        });

        editTaskBtn.addEventListener('click', function() {
            editTask(task.id); 
        });
    });

    TaskCount(); 
}

//  delete tache

function deleteTask(index) {
    // let tasks = JSON.parse(localStorage.getItem('taskss'));
    // console.log(index);
    
    for (let i = 0; i < tasks.length; i++) {
            if(tasks[i].id==index){
                tasks.splice(i, 1); 
                break; 
            }
            
    }
    localStorage.setItem('taskss', JSON.stringify(tasks)); 

    }



// edit tache 
const btnModifier = document.getElementById("modifierTache");

console.log(btnModifier);

function editTask(id) {
    // const tasks = JSON.parse(localStorage.getItem('taskss'));
    const index = tasks.findIndex((task)=>task.id == id)
    const task = tasks[index]

    // console.log(task)


    myModel.classList.remove("hidden");
    submitTache.classList.add("hidden");
    btnModifier.classList.remove("hidden");
    
    document.getElementById("title").value = task.title;
    document.getElementById("description").value = task.description;
    document.getElementById("date").value = task.date;
    document.getElementById("priority").value = task.priority;
    document.getElementById("Statut").value = task.status;

    

        btnModifier.onclick=function(e) {
            e.preventDefault();
        tasks[index].title = document.getElementById("title").value;
        tasks[index].description = document.getElementById("description").value;
        tasks[index].date = document.getElementById("date").value;
        tasks[index].priority = document.getElementById("priority").value;
        tasks[index].status = document.getElementById("Statut").value;

        
        localStorage.setItem('taskss', JSON.stringify(tasks));

        myModel.classList.add("hidden");
        submitTache.classList.remove("hidden");
        afficheTask(tasks);
        
    };
}

const filterProirty = document.getElementById("filterPriorty");

filterProirty.addEventListener("change",function(){

    if(filterProirty.value === "all proirty"){
        afficheTask(tasks)
    }else{
        const filteredTaks = tasks.filter((task)=>task.priority === filterProirty.value);
        afficheTask(filteredTaks)
    }
    // console.log(filteredTaks)

})
