import React, { useState } from "react";
import FormTitle from "../../moleculares/FormTitle/FormTitle.jsx";
import FormDescription from "../../moleculares/FormDescription/FormDescription.jsx";
import MuestraCampoForm from "../../moleculares/MuestraCampoForm/MuestraCampoForm.jsx";
import Footer from "../../atomicos/Footer/Footer.jsx";
import { MdDelete, MdEdit } from "react-icons/md";
import Swal from "sweetalert2";

import Button from "../../atomicos/Button/Button.jsx";
import CreateDato from "../../moleculares/CreateDato/CreateDato.jsx";
import EditFormData from "./EditFormData.jsx"; // Asegúrate de importar el componente EditFormData
import { accessAPI } from "../../../Utils/utils.js";
import CustomInputField from "../../moleculares/CustomInputField/CustomInputField.jsx";
import MenuNavegacion from "../menuNavegacion/menuNavegacion.js";
import Notificacion from "../../../elementos/notificacion/Notificacion.js";

import ShowInformation from "../../atomicos/Info/ShowInformation";

function Formulario() {
  const [title, setTitle] = useState("");
  const [codigo, setCodigo] = useState("");
  const [description, setDescription] = useState("");
  const [fields, setFields] = useState([]);
  const [indice, setIndice] = useState(1);

  const [selectedField, setSelectedField] = useState(null);

  const [errorTitle, setErrorTitle] = useState("");
  const [errorCodigo, setErrorCodigo] = useState("");
  const [errorField, setErrorField] = useState("");
  const [mensajeNotificacion, setMensajeNotificacion] = useState();

  function validarForm() {
    let esValido = true;

    // limpiar errores
    setErrorTitle("");
    setErrorCodigo("");
    setErrorField("");

    // buscar errores

    if (!title.trim()) {
      setErrorTitle("Debe asignar un título");
      esValido = false;
    }
    if (!codigo.trim()) {
      setErrorCodigo("Debe asignar un código");
      esValido = false;
    }
    if (fields.length === 0) {
      setErrorField("Debe agregar campos al formulario");
      esValido = false;
    }
    return esValido;
  }

  const addField = (field) => {
    setFields([...fields, { ...field, indice }]);
    setIndice(indice + 1);
  };

  function generateForm() {
    if (validarForm()) {
      accessAPI(
        "POST",
        "admin/form/form",
        { titulo: title, descripcion: description, codigo: codigo },
        (response) => {
          agregarCampos(response.id);
        },
        (response) => {
          setMensajeNotificacion({
            mensaje: response[0].msg,
            temporal: true,
            error: true,
          });
        }
      );
      setFields([]);
      setDescription("");
      setCodigo("");
      setTitle("");
    }
  }

  function agregarCampos(id) {
    fields.forEach((field) => {
      console.log(field);
      accessAPI(
        "POST",
        `admin/form/campo/${id}`,
        field,
        (response) => {
          setMensajeNotificacion({
            mensaje: "Campo Agregado Correctamente",
            temporal: true,
            error: false,
          });
        },
        (response) => {
          setMensajeNotificacion({
            mensaje: response[0].msg,
            temporal: true,
            error: true,
          });
        }
      );
    });
  }

  const deleteField = (indice) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#56638a",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminarlo",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        setFields(fields.filter((field) => field.indice !== indice));
        Swal.fire("¡Eliminado!", "El campo ha sido eliminado.", "success");
      }
    });
  };

  const editField = (field) => {
    setSelectedField(field);
  };

  const updateField = (updatedField) => {
    setFields(
      fields.map((field) =>
        field.indice === updatedField.indice ? updatedField : field
      )
    );
    setSelectedField(null);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <MenuNavegacion submenuSeleccionado="formulario" />
      <Notificacion config={mensajeNotificacion} />
      <div className="mt-24 mb-10 px-10">
        <div className="grid grid-cols-2 gap-12">
          <div className="mr-12">
            <h1 className="mb-5">Generador de Formularios</h1>
            <div className="mb-12 w-full">
              <h2 className="align-center mb-3 text-center">
                <strong>Información del formulario</strong>
              </h2>
              <CustomInputField
                labelForm={"Código de formulario"}
                type={"text"}
                required={true}
                onChange={(e) => setCodigo(e.target.value)}
                error={errorCodigo ? errorCodigo : ""}
              />
              <FormTitle
                title={title}
                setTitle={setTitle}
                required={true}
                error={errorTitle}
              />
              <FormDescription
                description={description}
                setDescription={setDescription}
                required={false}
              />
            </div>
            <h2 className="align-center mb-3 bg text-center">
              <strong>Creación de campos</strong>
            </h2>
            <CreateDato
              addField={addField}
              indice={indice}
              setIndice={setIndice}
            />
            <div>
              {errorField && (
                <div className="flex justify-end text-red-500 text-xs">
                  {errorField}
                </div>
              )}
            </div>
          </div>
          <div className="ml-12">
            <h1 className="mb-5">Previsualizador de Formulario</h1>
            <h2 className="text-xl justify-center items-center text-center">
              <strong>{codigo ? `${codigo} - ${title}` : title}</strong>
            </h2>
            <p className={"mb-10"}>{description}</p>
            {fields.map((field) => (
              <div
                className="grid grid-cols-3 gap-1"
                key={field.indice - field.ordenCampo} // Usar una key única y estable
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <MuestraCampoForm {...field} />

                <div className="grid grid-cols-3 gap-1">
                  <div className={"edit-icon ml-2"}>
                    {field.info && <ShowInformation info={field.info} />}
                  </div>
                  <MdEdit
                    className={"edit-icon ml-2"}
                    onClick={() => editField(field)}
                  />
                  <MdDelete
                    className={"delete-icon ml-2"}
                    onClick={() => deleteField(field.indice)}
                  />
                </div>
              </div>
            ))}
            {fields.length > 0 && title && codigo && (
              <Button onClick={generateForm} text={"Generar Formulario"} />
            )}
          </div>
        </div>
        {selectedField && (
          <div>
            <h2>Editar Campo</h2>
            <EditFormData fieldData={selectedField} updateField={updateField} />
          </div>
        )}
      </div>
      <Footer> </Footer>
    </div>
  );
}
/* 
Parte prueba drag and drop 

  const [title, setTitle] = useState("");
  const [codigo, setCodigo] = useState("");
  const [description, setDescription] = useState("");
  const [fields, setFields] = useState([]);
  const [indice, setIndice] = useState(1);

  const [selectedField, setSelectedField] = useState(null);

  const [errorTitle, setErrorTitle] = useState("");
  const [errorCodigo, setErrorCodigo] = useState("");
  const [errorField, setErrorField] = useState("");

  function validarForm() {
    let esValido = true;

    // limpiar errores
    setErrorTitle("");
    setErrorCodigo("");
    setErrorField("");

    // buscar errores

    if (!title.trim()) {
      setErrorTitle("Debe asignar un título");
      esValido = false;
    }
    if (!codigo.trim()) {
      setErrorCodigo("Debe asignar un código");
      esValido = false;
    }
    if (fields.length === 0) {
      setErrorField("Debe agregar campos al formulario");
      esValido = false;
    }
    return esValido;
  }

  // function addField (field) {
  //   console.log("Adding field:", field);
  //   if(field.type === "select" && field.selectId) {
  //   setFields([...fields, { ...field, indice }]);
  //   }
  //   if (field.type !=="select") {
  //     setFields([...fields, { ...field, indice }]);
  //   }

  const addField = (field) => {
    setFields([...fields, { ...field, indice }]);
    setIndice(indice + 1);
  };

  function generateForm() {
    if (validarForm()) {
      accessAPI(
        "POST",
        "admin/form/form",
        { titulo: title, descripcion: description, codigo: codigo },
        (response) => {
          agregarCampos(response.id);
        },
        (response) => {
          console.log(response);
        }
      );
      setFields([]);
      setDescription("");
      setCodigo("");
      setTitle("");
    }
  }

  function agregarCampos(id) {
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
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#56638a",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminarlo",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        setFields(fields.filter((field) => field.indice !== indice));
        Swal.fire("¡Eliminado!", "El campo ha sido eliminado.", "success");
      }
    });
  };

  const editField = (field) => {
    setSelectedField(field);
  };

  const updateField = (updatedField) => {
    setFields(
      fields.map((field) =>
        field.indice === updatedField.indice ? updatedField : field
      )
    );
    setSelectedField(null);
  };
  const handleDragEnd = ({ oldIndex, newIndex }) => {
    const updatedFields = arrayMove(fields, oldIndex, newIndex).map(
      (field, index) => ({
        ...field,
        ordenCampo: index + 1, // Update ordenCampo based on new position
      })
    );
    setFields(updatedFields);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <MenuNavegacion submenuSeleccionado="formulario" />
      <div className="mt-24 px-10">
        <div className="grid grid-cols-2 gap-12">
          <div className="mr-12">
            <h1 className="mb-5">Generador de Formularios</h1>
            <div className="mb-12 w-full">
              <h3 className="align-center mb-3 text-center">
                <strong>Información del formulario</strong>
              </h3>
              <CustomInputField
                labelForm={"Código de formulario"}
                type={"text"}
                required={true}
                onChange={(e) => setCodigo(e.target.value)}
                error={errorCodigo ? errorCodigo : ""}
              />
              <FormTitle
                title={title}
                setTitle={setTitle}
                required={true}
                error={errorTitle}
              />
              <FormDescription
                description={description}
                setDescription={setDescription}
                required={false}
              />
            </div>
            <h2 className="align-center mb-3 bg text-center">
              <strong>Creación de campos</strong>
            </h2>
            <CreateDato
              addField={addField}
              indice={indice}
              setIndice={setIndice}
            />
            <div>
              {errorField && (
                <div className="flex justify-end text-red-500 text-xs">
                  {errorField}
                </div>
              )}
            </div>
          </div>
          <div className="ml-12">
            <h1 className="mb-5">Previsualizador de Formulario</h1>
            <h2 className="text-xl">
              <strong>{codigo ? `${codigo} - ${title}` : title}</strong>
            </h2>
            <p className={"mb-10"}>{description}</p>
            <List
              values={fields}
              onChange={handleDragEnd}
              renderList={({ children, props }) => (
                <div {...props}>{children}</div>
              )}
              renderItem={({ value, props }) => (
                <div
                  {...props}
                  key={value.indice}
                  className="grid grid-cols-3 gap-1"
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {value.info && <ShowInformation info={value.info} />}

                  <MuestraCampoForm {...value} />

                  <div className="grid grid-cols-2 gap-1">
                    <MdEdit
                      className={"edit-icon ml-5"}
                      onClick={() => editField(value)}
                    />
                    <MdDelete
                      className={"delete-icon ml-5"}
                      onClick={() => deleteField(value.indice)}
                    />
                  </div>
                </div>
              )}
            />
            {fields.length>0 && title && codigo && description && (
              <Button onClick={generateForm} text={"Generar Formulario"} />
            )}
          </div>
        </div>
        {selectedField && (
          <div>
            <h2>Editar Campo</h2>
            <EditFormData fieldData={selectedField} updateField={updateField} />
          </div>
        )}
      </div>
    </div>
  );*/
export default Formulario;
