import "./estilos/App.css";
import "./estilos/formulario.css";
import FormContainer from "./Componentes/atomicos/FormContainer/FormContainer.jsx";
import Formulario from "./Componentes/organismos/Formulario/Formulario.jsx";
import { BrowserRouter } from "react-router-dom";
import Router from "./Router";
function App() {
  return (
    <>
      <div
        className="font-sans"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          // height: "100vh",
          //  backgroundColor: "#f3f3",
          // fontFamily: "Poppins, sans-serif",
        }}
      ></div>

      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </>
  );
}

export default App;
