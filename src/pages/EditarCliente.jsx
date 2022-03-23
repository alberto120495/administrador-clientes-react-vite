import Formulario from "../components/Formulario";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";

function EditarCliente() {
  const { id } = useParams();
  const [cliente, setCliente] = useState({});
  const [cargando, setCargando] = useState(true);
  useEffect(() => {
    const getClienteAPI = async () => {
      try {
        const url = `http://localhost:4000/clientes/${id}`;
        const response = await fetch(url);
        const result = await response.json();
        setCliente(result);
      } catch (error) {
        console.log(error);
      }
      setCargando(false);
    };
    getClienteAPI();
  }, []);
  return (
    <>
      <h1 className="font-bold text-4xl text-blue-900">Editar Cliente</h1>
      <p className="mt-3">
        Utiliza este formulario para editar datos de un cliente.
      </p>
      {cargando ? (
        <Spinner />
      ) : Object.keys(cliente).length === 0 ? (
        <p className="text-4xl text-blue-900">No hay resultados</p>
      ) : (
        <Formulario cliente={cliente} cargando={cargando} />
      )}
    </>
  );
}

export default EditarCliente;
