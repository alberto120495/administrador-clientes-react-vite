import React from "react";
import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Alerta from "./Alerta";

function Formulario() {
  const navigate = useNavigate();
  const handleSubmit = async (values) => {
    try {
      const url = "http://localhost:4000/clientes";
      const respuesta = await fetch(url, {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const resultado = await respuesta.json();
      navigate("/clientes");
    } catch (error) {
      console.log(error);
    }
  };

  const newClienteScheme = Yup.object().shape({
    nombre: Yup.string()
      .min(3, "El nombre es muy corto")
      .max(20, "El nombre es muy largo")
      .required("El nombre del cliente es obligatorio"),
    empresa: Yup.string().required("El nombre de la empresa es obligatorio"),
    email: Yup.string()
      .email("Email no tiene formato valido")
      .required("El email es obligatorio"),
    telefono: Yup.number()
      .positive("Numero no valido")
      .integer("Numero no valido")
      .typeError("Numero no valido"),
  });

  return (
    <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto">
      <h1 className="tetx-gray-600 font-bold text-xl uppercase text-center">
        Agregar Cliente
      </h1>

      <Formik
        initialValues={{
          nombre: "",
          empresa: "",
          email: "",
          telefono: "",
          notas: "",
        }}
        onSubmit={async (values, { resetForm }) => {
          await handleSubmit(values);
          resetForm();
        }}
        validationSchema={newClienteScheme}
      >
        {({ errors, touched }) => (
          <Form className="mt-10">
            <div className="mb-4">
              <label htmlFor="nombre" className="text-gray-800">
                Nombre:
              </label>
              <Field
                id="nombre"
                name="nombre"
                type="text"
                placeholder="Nombre del Cliente"
                className="mt-2 block w-full p-3 bg-gray-50 outline-none"
              />
              {errors.nombre && touched.nombre ? (
                <Alerta>{errors.nombre}</Alerta>
              ) : null}
            </div>
            <div className="mb-4">
              <label htmlFor="empresa" className="text-gray-800">
                Empresa:
              </label>
              <Field
                id="empresa"
                name="empresa"
                type="text"
                placeholder="Empresa del Cliente"
                className="mt-2 block w-full p-3 bg-gray-50 outline-none"
              />
              {errors.empresa && touched.empresa ? (
                <Alerta>{errors.empresa}</Alerta>
              ) : null}
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="text-gray-800">
                Email:
              </label>
              <Field
                id="email"
                name="email"
                type="email"
                placeholder="Email del Cliente"
                className="mt-2 block w-full p-3 bg-gray-50 outline-none"
              />

              {errors.email && touched.email ? (
                <Alerta>{errors.email}</Alerta>
              ) : null}
            </div>
            <div className="mb-4">
              <label htmlFor="telefono" className="text-gray-800">
                Telefono:
              </label>
              <Field
                id="telefono"
                name="telefono"
                type="tel"
                placeholder="Telefono del Cliente"
                className="mt-2 block w-full p-3 bg-gray-50 outline-none"
              />
              {errors.telefono && touched.telefono ? (
                <Alerta>{errors.telefono}</Alerta>
              ) : null}
            </div>
            <div className="mb-4">
              <label htmlFor="notas" className="text-gray-800">
                Notas:
              </label>
              <Field
                as="textarea"
                id="notas"
                name="notas"
                type="text"
                placeholder="Notas del Cliente"
                className="mt-2 block w-full p-3 bg-gray-50 outline-none h-40"
              />
            </div>

            <input
              type="submit"
              value="Agregar Cliente"
              className="mt-5 w-full bg-blue-800 text-white p-3 uppercase font-bold text-lg cursor-pointer"
            />
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Formulario;
