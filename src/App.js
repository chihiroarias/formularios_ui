import "./App.css";
//import InputField from "./Componentes/atomicos/InputField/InputField.jsx";
//import Label from "./Componentes/atomicos/Label/Label.jsx";
import FormContainer from "./Componentes/atomicos/FormContainer/FormContainer.jsx";
import CreateString from "./Componentes/moleculares/DatoInput/createString.jsx";
import CreateSelect from "./Componentes/moleculares/selects/createSelect.jsx";
import Campo from "./Componentes/organismos/Campo/Campo.jsx";
import Formulario from "./Componentes/organismos/Formulario/Formulario.jsx";
//import Logo from "./Images/logo-qualis-horizontal-azul.png";

// import TipoString from "./tiposdecampos/tipoString";
// import TipoCheckbox from "./tiposdecampos/tipoCheckbox";

// function App() {
//   return (
//     <div className="App">
//       <TipoString
//         placeholderSelct="Nombre"
//         regexSelct="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"
//         etiquetaSelct="escribí tu "
//         infoSelct=""
//       />
//       <TipoCheckbox
//         etiquetaSelct="¿Aceptas los términos?"
//         infoSelct="Seleccione una opción"
//         opciones={[
//           { valor: "si", nombre: "Sí" },
//           { valor: "no", nombre: "No" },
//         ]}
//       />
//     </div>
//   );
// }

/* <FormContainer>
          <Formulario />
      </FormContainer>* */
function App() {
  return (
    <>
      <Campo />
    </>
  );
}

export default App;
