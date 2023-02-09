// formulario


import React, {useRef} from 'react';
import PropTypes from "prop-types";
import { Task } from "../tareas.js";

//rfc
const TaskForm = ({add}) => {

    const descriptionRef = useRef(""); //inizializamos el useRef

    function addTask(e) {
    e.preventDefault();     //para que no cargue todo de nuevo al traer el evento
    const newTask = new Task(
        descriptionRef.current.value.toString(),
        false); //current: guarda, value: muestra

        add(newTask);
    }


    return (
        <div className='contenedor-form' >
           <form onSubmit={addTask} className="d-flex justify-content-center align-items-center mb-4 pt-4">
            <div className='form-outline flex-fill pt-1'>
              <input ref={descriptionRef} id="inputDescription" type="text" className="form-control form-control-xs control mt-2 " require placeholder='Task description'/>
                 <div className='pt-3 d-flex mx-auto'>
                    <button type="submit" className='btn fondo2  ms-3 largo boton-add '>Add</button>
            </div>
        </div>
        </form>       
        </div>
    );
}

TaskForm.protoTypes = {  //p minisculpa
    add: PropTypes.func.isRequired  //P mayus porq se importo 
}

export default TaskForm;

