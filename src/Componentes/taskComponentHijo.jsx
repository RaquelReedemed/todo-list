
import React from 'react';
import PropTypes from 'prop-types';
import {Task}  from "../../src/tareas"

const TaskComponentHijo = ( task, complete, remove ) => {

    //Creamos una funcion para que cambie el icono de tarea completada

    function taskComponentIcon() {
        if (task.completed) {
            return(<i onClick={() => complete(task)} className="bi bi-check-square-fill"></i>)
        }else {
            return(<i onClick={() => complete(task)} className="bi bi-check-square"></i>)
        }
    }

    return (
        <div>
          <p><span>{task.description}</span></p>
          {taskComponentIcon()}
          <i onClick={() => remove(task)} className="bi-trash task-action ms-2" style={{color:"gray", fontSize:"15px"}} ></i>      
        </div>
    );
}

   TaskComponentHijo.propTypes = {
    task: PropTypes.instanceOf(Task).isRequired, /* Verifica que recibimos una TAREA del padre (task_list) /
    complete: PropTypes.func.isRequired, / Va a ser una funcion que se ejecutara cuando le demos a los iconos */
    remove: PropTypes.func.isRequired 
    };

export default TaskComponentHijo;
