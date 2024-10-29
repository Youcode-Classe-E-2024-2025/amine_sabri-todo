const btnAdd = document.getElementById("btnAdd");
const myModel = document.getElementById("myModal");
const close = document.getElementById("close");

btnAdd.addEventListener("click",function(){
    myModel.classList.toggle("hidden");
});

close.addEventListener("click",function(){
    myModel.classList.toggle("hidden");
})



// onclick="document.getElementById('myModal').style.display='none'"