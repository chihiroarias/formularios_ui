import MenuNavegacion from "../Componentes/organismos/menuNavegacion/menuNavegacion";
import Footer from "../Componentes/atomicos/Footer/Footer";
export default function Home() {
  return (
    <>
      <MenuNavegacion />
      <div className="seccion pt-20 ml-5">
        <h1>Proyecto Integrador</h1>
        <div className="mt-10 ml-12 text-xl">
          <div className="flex justify-center">
            <h1>
              Universidad ORT Uruguay Facultad de Ingeniería Creación de un
              módulo de auditoría para incorporar a Morfeo, software de gestión
              de certificaciones
            </h1>
          </div>
          <div className="mt-10 mb-10 flex justify-center">
            <p>
              Entregado como requisito para la obtención del título de Analista
              Programador/Analista en Tecnologías de la Información
            </p>
          </div>
          <div className=" justify-center mt-20">
            <div className="mb-10 mt-10">
              <h2>
                <strong>Bruno Arias</strong> - 296530
              </h2>
              <h2>
                <strong>Guillermo Reboledo</strong> - 204671
              </h2>
            </div>
            <div>
              <h2>
                <strong>
                  <i>Tutora:</i> Alejandra Caggiano
                </strong>
              </h2>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
