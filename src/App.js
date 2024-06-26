import "./App.css";
import CreateSelect from "./Componentes/moleculares/selects/configureSelect.jsx";
import Campo from "./Componentes/organismos/Campo/Campo.jsx";

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
    </>
  );
}

export default App;
