import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { accessAPI } from "../../../Utils/utils";
import InputField from "../../atomicos/InputField/InputField";
import Label from "../../atomicos/Label/Label";
import { MdDelete } from "react-icons/md";
import CustomInputField from "../CustomInputField/CustomInputField";
import Button from "../../atomicos/Button/Button";


const CreateSelect = ({ onCreate }) => {

  const [options, setOptions] = useState([{ etiqueta: "", value: "" }]);
  const [selectName, setSelectName] = useState("");
  const [payload, setPayload] = useState(null);

  const handleOptionChange = (index, event) => {
    const newOptions = [...options];
    newOptions[index][event.target.name] = event.target.value;
    setOptions(newOptions);
  };

  const deleteOption = (index) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  const addOption = () => {
    const hasEmptyLabel = options.some((option) => option.etiqueta === "");
    if (!hasEmptyLabel) {
      setOptions([...options, { etiqueta: "", value: "" }]);
    }
  };

  // useImperativeHandle(ref, () => ({
  //   triggerCreateSelect: async () => {
  //     await createSelectPrecargado();
  //   },
  // }));

  function createSelectValidations() {
    let valido = false;

    if (!selectName.trim()) {
      alert("Debe asignarle un nombre al select");
      return valido;
    }
    const hasEmptyLabel = options.some(
      (option) => option.etiqueta.trim() === ""
    );
    if (hasEmptyLabel) {
      alert("El input opción no puede estar vacío");
      return valido;
    }
    valido = true;
    return valido;
  }


  function createSelectPrecargado() {
    try {
      if (createSelectValidations()) {
        const optionsWithDefaultValues = options.map((option) => ({
          ...option,
          value: option.value.trim() === "" ? option.etiqueta : option.value,
        }));


        const stringToPost = optionsWithDefaultValues
          .map((option) => `${option.value} - ${option.etiqueta}`)
          .join(" ; ");

        setPayload({
          precargaSelects: stringToPost,
          nombre: selectName,
        });
      }
    } catch (error) {
      console.error(error);
    }
  }
  
  useEffect( () => {

    if (payload) {
      console.log("ENTRE AL IF");
      accessAPI(
        "POST",
        "admin/form/selectprecargado",
        payload,

       async  (response) => {
          console.log(response);
          console.log(options);

          if (
            response &&
            response.selectPrecargado &&
            response.selectPrecargado.id
          ) {

           await onCreate(selectName, response.selectPrecargado.id);
            //alert("El select fue agregado exitosamente");
            // setOptions([{ etiqueta: "", value: "" }]);
            // setSelectName("");
            // setPayload(null);


          } else {
            console.error(
              "Error:" + response.selectPrecargado.id + "is missing"
            );
          }
        },
        (error) => {
          console.log(error);
        }
      );
      console.log("ENTRE AL IF");
    }
  }, [payload]);

  return (
    <div>
      <div>
        <div>
          <CustomInputField
            id={"nombredelselect"}
            labelForm={"Nombre Select"}
            className="prettyInput"
            name={"nombredelselect"}
            htmlFor={"nombredelselect"}
            placeholder="Nombre del Select"
            type={"text"}
            required={true}
            value={selectName}
            onChange={(e) => setSelectName(e.target.value)}
          />
        </div>
        <Label labelForm={"Opciones"} />
        {options.map((option, index) => (
          <div
            key={index}
            className="customInput"
            style={{
              //border: '1px solid red',
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              margin: "5px 0 5px 10px",
              gap: "30px",
            }}
          >
            <InputField
              className="prettyInput"
              type="text"
              name="etiqueta"
              placeholder={`Opción ${index + 1}`}
              value={option.etiqueta}
              onChange={(e) => handleOptionChange(index, e)}
            />
            <InputField
              className="prettyInput"
              type="text"

              name="value"
              placeholder={`Valor ${index + 1} (opcional)`}
              value={option.value}
              onChange={(e) => handleOptionChange(index, e)}
            />
            <MdDelete
              className={"delete-icon"}
              onClick={() => deleteOption(index)}
            />
          </div>
        ))}
        <Button onClick={addOption} text="Añadir opción" />
      </div>



      <Button onClick={createSelectPrecargado} text="Crear Select"/>  
    </div>
  );
};
export default CreateSelect;
