import Label from "../../atomicos/Label/Label";
//import InputField from "../../atomicos/InputField/InputField";
import Select from "../../atomicos/Select/Select.jsx";
import { selectItems } from "../../../Utils/selectUtils.js";
import { useEffect, useState } from "react";
import TipoCampoFijo from "../TipoCampoFijo/TipoCampoFijo.jsx";
import DatoInput from "../DatoInput/DatoInput.jsx";
import { accessAPI } from "../../../Utils/utils.js";
import Loader from "../../../elementos/loader/Loader.js";
import CreateSelect from "../selects/configureSelect.jsx";
import CreateString from "../DatoInput/createString.jsx";
import CreateDate from "../CampoDate/createDate.jsx";

function TipoCampo() {
  const [selectedType, setSelectedType] = useState("");
  const [loader, setLoader] = useState(true);
  /*
  const [tiposCampos, setTiposCampos] = useState();
useEffect(() => {
  accessAPI(
    "GET",
    "admin/Forms/obtenercampos",
    null,
    (response) => {
      setTiposCampos(response.campoparaDropDown);
      setLoader(false);
    },
    (error) => {
      console.log(error);
    }
  );
}, []);
*/
  const renderComponent = () => {
    switch (selectedType) {
      case "dato":
        return <CreateString />;
      case "select":
        return <CreateSelect />;
      case "fecha":
        return <CreateDate />;
      /* case 'seccion':
            return <Seccion />;
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

  /*
    {loader && <Loader>Cargando el proceso</Loader>}
      {!loader && (
      )}
  */

  return (
    <div>
      <Label name={"Tipo de Campo"} />
      <Select
        options={selectItems}
        onChange={handleSelectChange}
        selectName={"Tipo de Campo"}
      />
      <TipoCampoFijo />
      <div>{renderComponent()}</div>
    </div>
  );
}

export default TipoCampo;
