
import CreateSelect from "./Componentes/moleculares/selects/configureSelect.jsx";
import Campo from "./Componentes/organismos/Campo/Campo.jsx";

import "./estilos/App.css";
import "./estilos/formulario.css";
import FormContainer from "./Componentes/atomicos/FormContainer/FormContainer.jsx";
import Formulario from "./Componentes/organismos/Formulario/Formulario.jsx";


function App() {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CreateSelect />
      </div>
    <FormContainer>
      <Formulario />
    </FormContainer>
    </>
  );
}

export default App;
