import React, { useState } from "react";
import FormTitle from "../../moleculares/FormTitle/FormTitle.jsx";
import FormDescription from "../../moleculares/FormDescription/FormDescription.jsx";
//import TipoCampo from "../../moleculares/TipoCampo/TipoCampo.jsx";
import MuestraCampoForm from "../../moleculares/MuestraCampoForm/MuestraCampoForm.jsx";
import { MdDelete } from "react-icons/md";

import Button from "../../atomicos/Button/Button.jsx";
import CreateDato from "../../moleculares/CreateDato/CreateDato.jsx";
import { accessAPI } from "../../../Utils/utils.js";
import CustomInputField from "../../moleculares/CustomInputField/CustomInputField.jsx";

function Formulario() {
  const [title, setTitle] = useState("");
  const [codigo, setCodigo] = useState("");
  const [description, setDescription] = useState("");
  const [fields, setFields] = useState([]);
  const [indice, setIndice] = useState(1);

  const addField = (field) => {
    console.log("Adding field:", field);
    setFields([...fields, { ...field, indice }]);
  };

  function generateForm() {
    accessAPI(
      "POST",
      "admin/form/form",
      { titulo: title, descripcion: description, codigo: codigo },
      (response) => {
        console.log(response);
        agregarCampos(response.id);
      },
      (response) => {
        console.log(response);
      }
    );
  }

  function agregarCampos(id) {
    console.log("Form Data:", { title, description, codigo, fields });
    fields.forEach((field) => {
      accessAPI(
        "POST",
        `admin/form/campo/${id}`,
        field,
        (response) => {
          console.log(response);
        },
        (response) => {
          console.log(response);
        }
      );
    });
  }

  const deleteField = (indice) => {
    setFields(fields.filter((field) => field.indice !== indice));
  };

  return (
    <div>
      <div>
        <h1>Generador de Formularios</h1>

        <CustomInputField
          labelForm={"Código de formulario"}
          type={"text"}
          required={true}
          onChange={(e) => setCodigo(e.target.value)}
        />
        <FormTitle title={title} setTitle={setTitle} required={true} />
        <FormDescription
          description={description}
          setDescription={setDescription}
          required={false}
        />
        <CreateDato addField={addField} indice={indice} setIndice={setIndice} />

        {/* Renderizo los campos */}
      </div>
      <div>
        <h2>
          <p>{codigo}</p>
          <strong>{title}</strong>
        </h2>
        <p>{description}</p>

        {fields.map((field, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <MuestraCampoForm {...field} />
            <MdDelete
              className={"delete-icon ml-5"}
              onClick={() => deleteField(field.indice)}
            />
          </div>
        ))}
      </div>

      <Button onClick={generateForm} text={"Generar Formulario"} />
    </div>
  );
}

export default Formulario;
