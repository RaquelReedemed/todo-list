import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { show_alerta } from "../functions";

const ShowProducts = () => {
  const url = "https://jsonplaceholder.typicode.com/users";

  //declarando hooks
  const [users, setUsers] = useState([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [operation, setOperation] = useState(1); //estado inicial 1 (guardar, actualizar o eliminar)
  const [title, setTitle] = useState(""); //titulo del modal

  //useEffect para que una vez que cargue la paguna renderise todos los productos
  useEffect(() => {
    getUsers();
  }, []);

  //llamar a la api, hace una peticion GET a la api mediante axios
  const getUsers = async () => {
    //llama a la api y devuelve una promesa
    const respuesta = await axios.get(url); // await detiene la ejecución de la función hasta que se completa la operación asincrónica.
    setUsers(respuesta.data); //actualiza el array vacio
  };

  //operaciones guardar (1), editar (2)
  const openModal = (op, id, name, email, phone) => {
    //resetear valores de las constantes
    setId('');
    setName('');
    setEmail('');
    setPhone('');
    setOperation(op);
    if(op === 1) {    /* ubicara en boton aniadir */
      setTitle('Registrar Usuario'); 
      console.log('registrar usuario')
    }
    else if(op === 2) {   /* ubicara en el boton 'edit' (icono) */
      setTitle('Editar Usuario'); 
      //las contantes tendran el mismo valor que se esta pasando por parametro
      setId(id);
      setName(name);
      setEmail(email);
      setPhone(phone);
    }
    //encender focus del campo nombre
      window.setTimeout(function() {
      document.getElementById('nombre').focus();
    },500)
  }

    //validar que elos campos del formulario esten llenos antes de enviar la solicitud
    const validar = () => {
      var parametros;
      var metodo;
      if(name.trim() === ''){
        show_alerta('Escribe el nombre del usuario', 'warning');
      }
      else if(email.trim() === ''){
        show_alerta('Escribe el email del usuario', 'warning');
      }
      else if (phone.trim() === ''){
        show_alerta('Escribe el phone del usuario', 'warning');
      }
      else{
        if(operation === 1){
          parametros= {name:name.trim(), email:email.trim(), phone:phone.trim()};
          metodo = 'POST';

           const addPost= async(name, email, phone) => {  
            try { //try-cath, para manejar respuesta de la API
              const response = await axios.post(url, { //hace una solicitus POST a la URL
             
                name:name,
                email:email,
                phone:phone
              },{
                headers:{
                  'Content-Type': 'application/json; charset=UTF-8'
                }
              });

              if (response.status !== 201) { //Si la solicitud no se realizó correctamente, la función simplemente terminará sin actualizar la lista de usuarios
                return;
              }else{ //se extrae el cuerpo de la respuesta usando data
                const data = response.data;
                setUsers((users) => [...users, data]);//actualizar lista de uduario
              }
            } catch(error) { //manejador de error
              console.error(error)
            }
           }
           addPost(name,email,phone)
          

       /*    const onAdd = async(name, email) => {
            await fetch(url,{
              method: 'POST',
              body: JSON.stringify({
                name:name,
                email:email
              }),
              headers: {
                "Content-type":"application/json; charset=UTF-8"
              }
            })
             .then((res)=>{
                if(res.status !== 201) {
                  return
                }else{
                  return res.json();
                }
             })
             .then((data)=> {
              setUsers((users) => [...users,data]);
             })
          }
          onAdd(name, email) */
        }
        else{
          parametros={id:id, name:name.trim(), email:email.trim(), phone:phone.trim()};
          metodo= 'PUT';


         

           /* axios.post(`https://jsonplaceholder.typicode.com/users/${id}`, parametros)
          .then(response => console.log(response.data)) */ 

        }
        enviarSolicitud(metodo, parametros);
        
      }
    }
  
  
  console.log(users);

  const enviarSolicitud = async(metodo, parametros) => {
    await axios({method:metodo, url: url, data:parametros}).then(function(respuesta){
      var tipo = respuesta.data[0];
      var msj = respuesta.data[1];
      show_alerta(msj, tipo);
        if(tipo === 'success') {
          document.getElementById('btnCerrar').click();
          getUsers();
        }
    })
    .catch(function(error) {
      show_alerta('Error en la solicitud', 'error');
      console.log(error)
    } )
  }

  const deleteProduct= (id,name) => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title:'Seguro de eliminar el usuario ' +name+ '?',
      icon: 'question', text:'No se podra dar marcha atras',
      showCancelButton:true,confirmButtonText:'Si, eliminar',cancelButtonText:'Cancelar'
    }).then((result) =>{
      if(result.isConfirmed) {
        const onDelete = async (id) => {
          await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
            method: 'DELETE'
          })
          .then((res) => {
            //un código de estado 200 significa que la solicitud ha sido exitosa y que se ha eliminado el recurso solicitado
            if(res.status !== 200) {//código de estado diferente a 200, el bloque de código dentro del if se ejecutará y la función deleteProduct no actualizará la lista de usuarios.
              return
            }else{
              setUsers(users.filter((user) => {
                return user.id !== id;
              }))
            }
          })
          .catch((err) => {
            console.log(err)
          })
        }
        onDelete(id)
      }
      else{
        show_alerta('El producto No fue eliminado', 'info');
      }
    })
  }
 

  return (
     

    <div className="container-fluid">

         {/* abrira el openModal(1) que sirve para agregar */}
        <button onClick={()=> openModal(1)} type="button" className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#modalUsers">
          <i className="fa-solid fa-circle-plus">Aniadir</i>
        </button>
      
     

        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>#</th>
                <th>NOMBRE</th>
                <th>EMAIL</th>
                <th>PHONE</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {users.map((user, id) => (
                <tr key={user.id}>
                  <td>{id + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td> {/* onClick, seccion para editar y dibuja las contantes clickeadas */}
                    <button  onClick={()=> openModal(2, user.id, user.name, user.email, user.phone)}
                       className="btn btn-warning" data-bs-toggle='modal' data-bs-target='#modalUsers'>
                      <i className="fa-solid fa-edit"></i>
                    </button>
                    &nbsp;
                    {/*non-breaking-space, el espacio no se puede dividir en dos lineas*/}
                    <button onClick={()=>deleteProduct(user.id, user.name)} className="btn btn-danger">
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      

      <div className="modal fade" id="modalUsers" aria-hidden='true'>
         <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                 <label className="h5">{title}</label>
                 <button type="button" className="btn-close" data-bs-dismiss='modal' aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <input type='hidden' id="id"></input>
                <div className="input-group mb-3">
                  <span className="input-group-text"><i className="fa-solid fa-user"></i></span>
                  <input type='text' id="nombre" className="form-control" placeholder="Nombre" value={name}
                  onChange={(e)=> setName(e.target.value)}></input>
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text"><i className="fa-solid fa-envelope"></i></span>
                  <input type='text' id="nombre" className="form-control" placeholder="Email" value={email}
                  onChange={(e)=> setEmail(e.target.value)}></input>
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text"><i className="fa-solid fa-phone"></i></span>
                  <input type='text' id="nombre" className="form-control" placeholder="Phone" value={phone}
                  onChange={(e)=> setPhone(e.target.value)}></input>
                </div>
                <div className="d-grid col-6 mx-auto">
                  <button onClick={()=> validar()} className="btn btn-success">
                     <i className="fa-solid fa-floppy-disk"></i> Guardar
                  </button>
                </div>
                <div className="modal-footer">
                   <button type="button" id="btnCerrar" className="btn btn-secondary" data-bs-dismiss='modal'>Cerrar</button>

                </div>
              </div>
            </div>
      </div>
    </div>

    </div>
  );
};

export default ShowProducts;
