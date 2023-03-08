import React,{ useEffect, useState } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { show_alerta } from '../functions';

const ShowProducts = () => {
    const url='https://jsonplaceholder.typicode.com/users'

    //declarando hooks
    const [users, setUsers] = useState([]);
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [operation, setOperation] = useState(1); //estado inicial 1 (guardar, actualizar o eliminar)
    const [title, setTitle] = useState(''); //titulo del modal


    //useEffect para que una vez que cargue la paguna renderise todos los productos
    useEffect(() => {
        getUsers();
    }, []);

    //llamar a la api, hace una peticion GET a la api mediante axios
    const getUsers = async() => {  //llama a la api y devuelve una promesa
        const respuesta = await axios.get(url);// await detiene la ejecución de la función hasta que se completa la operación asincrónica.
        setUsers(respuesta.data) //actualiza el array vacio 
    }

    console.log(users)

    
  return (
    <div className='container-fluid'>
    <div class="list-group">
    <button className='btn btn-dark' data-bs-toggle='modal' data-bs-target='#modalUsers'>
     <i className="fa-solid fa-circle-plus">Aniadir</i>      
     </button>
  
</div>
      
    </div>
  )
}

export default ShowProducts
