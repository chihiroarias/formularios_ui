import Label from "../../atomicos/Label/Label";
//import InputField from "../../atomicos/InputField/InputField";
import Select from "../../atomicos/Select/Select.jsx";
import { selectItems } from "../../../Utils/selectUtils.js";
import { useState } from "react";
import TipoCampoFijo from "../TipoCampoFijo/TipoCampoFijo.jsx";
import DatoInput from "../DatoInput/DatoInput.jsx";

function TipoCampo() {
  const [selectedType, setSelectedType] = useState("");
  const renderComponent = () => {
    switch (selectedType) {
      case "dato":
        return <DatoInput />;
      case "select":
        return <Select />;
      /* case 'seccion':
            return <Seccion />;
          case 'fecha':
            return <Fecha />;
          case 'numero':
            return <Numero />;
          case 'checkbox':
            return <Checkbox />;
          case 'archivo':
            return <Archivo />;*/
      default:
        return null;
    }
  };
  const handleSelectChange = (event) => {
    setSelectedType(event.target.value);
  };

  return (
    <div>
      <Label name={"Tipo Campo"} />
      <Select options={selectItems} onChange={handleSelectChange} />
      <TipoCampoFijo />
      <div>{renderComponent()}</div>
    </div>
  );
}

export default TipoCampo;
