//hacer compo de tipo funcional

import React, { useState } from 'react';
import { Task } from "../../src/tareas";
import TaskComponentHijo from './taskComponentHijo';
import TaskForm from './taskForm';



const TaskComponent = () => {

    //tareas que se renderizan automaticamente
   
 const defaultTask1 = new Task("Estudiar react js", false)
 const defaultTask2 = new Task("Crear mi porfolio", false)
 const defaultTask3 = new Task("Crear componente", false)

 //Usamos el useState para modificar el estado de las tareas

 const [tasks, setTasks] = useState([defaultTask1, defaultTask2, defaultTask3]); //usamos corchetes para especificar que es un arrglo

 //creamos la funcion para completar la tarea

 function completedTask(task) {
    const index = tasks.indexOf(task); //nos trae el indice
    const tempTask = [...tasks];  //nos crea una copia
    tempTask[index].comleted = ! tempTask[index].comleted;
    setTasks(tempTask);
 }

 //creamos funcion para eliminar tareas

 function deleteTask(task) {
    const index = tasks.indexOf(task); //nos trae el indice
    const tempTask = [...tasks];  //nos crea una copia
    tempTask.splice(index, 1); //eliminamos del array
    setTasks(tempTask);
 }

 //Function para a;adir una tarea

  function addTask (task) {
    const index = tasks.indexOf(task); //nos trae el indice
    const tempTask = [...tasks];  //nos crea una copia
    tempTask.push(task); //agregar una nueva tarea que tiene descripcion y compled
    setTasks(tempTask);
 } 
 

    return (
        <div>
           <div>
             <h1>Lista de tareas</h1>
             <div>     
             {tasks.map((task, index) => {
                      return(      
                   <TaskComponentHijo
                      key={index} 
                      task={task}
                      complete={completedTask}
                      remove={deleteTask}
                      /> 
                      )
                    }
                    )} 
             </div>
           </div>    
           <TaskForm add={addTask}>
           
           </TaskForm> 
        </div>
    );
}



export default TaskComponent;

