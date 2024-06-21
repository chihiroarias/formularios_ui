import "./App.css";
//import InputField from "./Componentes/atomicos/InputField/InputField.jsx";
//import Label from "./Componentes/atomicos/Label/Label.jsx";
import Campo from "./Componentes/organismos/Campo/Campo.jsx";
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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Campo />
      </div>
    </>
  );
}

export default App;
