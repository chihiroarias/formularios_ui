import logo from "./logo.svg";
import "./App.css";
import TipoString from "./campos/tipoString";
import TipoCheckbox from "./campos/tipoCheckbox";

function App() {
  return (
    <div className="App">
      <TipoString
        placeholderSelct="Nombre"
        regexSelct="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"
        etiquetaSelct="escribí tu nombre"
        infoSelct=""
      />
      <TipoCheckbox
        etiquetaSelct="¿Aceptas los términos?"
        infoSelct="Seleccione una opción"
        opciones={[
          { valor: "si", nombre: "Sí" },
          { valor: "no", nombre: "No" },
        ]}
      />
    </div>
  );
}

export default App;
