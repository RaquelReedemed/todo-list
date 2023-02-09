
import React from 'react';
import PropTypes from 'prop-types';
import  { Task }  from "../../src/tareas"
import '../../src/styles/task.scss'

const TaskComponentHijo = ({ task, complete, remove }) => {

    //Creamos una funcion para que cambie el icono de tarea completada

    function taskComponentIcon() {
        if (task.completed) {
            return(<i onClick={() => complete(task)} className="bi-toggle-on task-action"></i>)
        }else {
            return(<i onClick={() => complete(task)} className="bi-toggle-off task-action"></i>)
        }
    }

    return (
        <div className='contenedor' >

<ul class="list-group">
  <li class="list-group-item d-flex justify-content-between align-items-center">
  {task.description}
    {taskComponentIcon()}
    
    <i onClick={() => remove(task)} className="bi-trash task-action ms-2" style={{color:"gray", fontSize:"15px"}} ></i>      

  </li>
</ul>

        
         {/*  <p><span>{task.description}</span></p>
          {taskComponentIcon()}
          <i onClick={() => remove(task)} className="bi-trash task-action ms-2" style={{color:"gray", fontSize:"15px"}} ></i> */}      
        
        </div>
    );
}

   TaskComponentHijo.propTypes = {
    task: PropTypes.instanceOf(Task).isRequired, /* Verifica que recibimos una TAREA del padre (task_list) 
    complete: PropTypes.func.isRequired, /* Va a ser una funcion que se ejecutara cuando le demos a los iconos */
    complete: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired 
    };

export default TaskComponentHijo;
