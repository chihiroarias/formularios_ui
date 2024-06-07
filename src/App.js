import "./App.css";
//import InputField from "./Componentes/atomicos/InputField/InputField.jsx";
//import Label from "./Componentes/atomicos/Label/Label.jsx";
import FormContainer from "./Componentes/atomicos/FormContainer/FormContainer.jsx";
import CreateString from "./Componentes/moleculares/DatoInput/createString.jsx";
import CreateSelect from "./Componentes/moleculares/selects/createSelect.jsx";
import Formulario from "./Componentes/organismos/Formulario/Formulario.jsx";
import PeticionesGenerales from "./Componentes/peticionesGenerales/peticionesGenericas.jsx";
import TipoCampo from "../src/Componentes/moleculares/TipoCampo/TipoCampo.jsx";
import InputDate from "./Componentes/atomicos/Date/inputDate.js";

function App() {
  return (
    <>
      <FormContainer>
        <CreateSelect />
      </FormContainer>
    </>
  );
}

export default App;
