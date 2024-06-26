import "./estilos/App.css";
import "./estilos/formulario.css";
import FormContainer from "./Componentes/atomicos/FormContainer/FormContainer.jsx";
import Formulario from "./Componentes/organismos/Formulario/Formulario.jsx";
import ConfigureSelct from "../src/Componentes/moleculares/selects/configureSelect.jsx";
function App() {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#f3f3",
          fontFamily: "Poppins, sans-serif",
        }}
      >
        <ConfigureSelct></ConfigureSelct>
      </div>
    </>
  );
}

export default App;

// <FormContainer>
//   <Formulario />
// </FormContainer>
