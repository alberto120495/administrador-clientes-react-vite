import React from "react";
import { useNavigate } from "react-router-dom";

function Cliente({ cliente, handleEliminar }) {
  const navigate = useNavigate();
  const { nombre, empresa, email, telefono, id } = cliente;
  return (
    <tr className="border-b hover:bg-gray-50 ">
      <td className="p-3">{nombre}</td>
      <td className="p-3">
        <p>
          {" "}
          <span className="text-gray-800 uppercase font-bold">Email:</span>{" "}
          {email}
        </p>
        <p>
          {" "}
          <span className="text-gray-800 uppercase font-bold">Tel:</span>{" "}
          {telefono}
        </p>
      </td>
      <td className="p-3">{empresa}</td>
      <td className="p-3">
        <button
          className="bg-green-600 hover:bg-green-700 block w-full text-white p-2 font-bold text-sm mb-3"
          type="buton"
          onClick={() => navigate(`/clientes/${id}`)}
        >
          Ver
        </button>
        <button
          className="bg-blue-600 hover:bg-blue-700 block w-full text-white p-2 font-bold text-sm"
          type="buton"
          onClick={() => navigate(`/clientes/editar/${id}`)}
        >
          Editar
        </button>
        <button
          className="bg-red-600 hover:bg-red-700 block w-full text-white p-2 font-bold text-sm mt-3"
          type="buton"
          onClick={() => handleEliminar(id)}
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
}

export default Cliente;
