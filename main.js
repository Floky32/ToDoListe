let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasks = document.querySelector(".tasks");
let arrayOfTasks=[];
let reset = document.querySelector("reset");

if (localStorage.getItem("tasks")){
    arrayOfTasks=JSON.parse(localStorage.getItem("tasks"));
}
getDataFromLocalStorge();

submit.onclick = function () {
    if (input.value !== ""){
        addTaskToArray(input.value);
        input.value="";
    }
};

tasks.addEventListener("click", (e) => {
    if(e.target.classList.contains("delete")){
        deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
        e.target.parentElement.remove();
        
    }
    if (e.target.classList.contains("tasks")){

        toggleStatusTaskWith(e.target.getAttribute("data-id"))

        e.target.classList.toggle("done");
    }

});


function addTaskToArray(taskText){

    const task ={
        id: Date.now(),
        title:taskText,
        completed:false,
    };
    arrayOfTasks.push(task);
    addElementsToPageFrom(arrayOfTasks);
    //add tasks to local storge
    addDataToLocalStorgeFrom(arrayOfTasks);

   
}
function addElementsToPageFrom(arrayOfTasks){
    tasks.innerHTML= "";
    
    arrayOfTasks.forEach((task) => {
        let div =document.createElement("div");
        div.className ="task";
        if(task.completed){
            div.className="task done"
        };
        div.setAttribute("data-id",task.id);
        div.appendChild(document.createTextNode(task.title));

        let span =document.createElement("span");
        span.className ="delete";
        span.appendChild(document.createTextNode("Delete"));
        div.appendChild(span);
        tasks.appendChild(div);

        
    });

}
    function addDataToLocalStorgeFrom(arrayOfTasks){
        window.localStorage.setItem("tasks",JSON.stringify(arrayOfTasks));


    };

function getDataFromLocalStorge(){
    let data = window.localStorage.getItem("tasks");
    if (data){
        let tasks=JSON.parse(data);
        addElementsToPageFrom(tasks);
    }
}
function deleteTaskWith(taskId){
    taskId = parseInt(taskId);
    arrayOfTasks = arrayOfTasks.filter((task) => task.id !== taskId);
     addDataToLocalStorgeFrom(arrayOfTasks);
};

function toggleStatusTaskWith(taskId){
    taskId = parseInt(taskId);
    for(let i=0;i<arrayOfTasks.length;i++){
        console.log(arrayOfTasks);
        if(arrayOfTasks[i].id === taskId){
            arrayOfTasks[i].completed == false ? (arrayOfTasks[i].completed ==true) : (arrayOfTasks[i].completed == false);
        }
    }
        addDataToLocalStorgeFrom(arrayOfTasks);

}
function resettt(){
localStorage.removeItem("tasks"); 
 arrayOfTasks = [];
 addElementsToPageFrom(arrayOfTasks);


}