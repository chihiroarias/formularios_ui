import MenuNavegacion from "../Componentes/organismos/menuNavegacion/menuNavegacion";
import Footer from "../Componentes/atomicos/Footer/Footer";
export default function Home() {
  return (
    <>
      <MenuNavegacion />
      <div className="seccion pt-20 ml-5">
        <h1>Proyecto Integrador</h1>
        <div className="mt-10 my-10 pr-10 text-xl">
          <div className=" justify-center">
            <h1 className="mb-12 flex justify-center">
              Universidad ORT Uruguay Facultad de Ingeniería
            </h1>
            <h1 className="mt-12 flex justify-center items-center text-center mr-12">
              <strong>
                Desarrollo de un módulo generador de formularios para su integración en Morfeo, software de gestión de certificación de productos
              </strong>
            </h1>
          </div>
          <div className="mt-24 mb-10 flex justify-center">
            <p>
              Entregado como requisito para la obtención del título de Analista
              Programador/Analista en Tecnologías de la Información
            </p>
          </div>
          <div className=" justify-center mt-20">
            <div className="mb-10 mt-10  justify-center items-center text-center">
              <h2>
                <strong>Bruno Arias</strong> - 296530
              </h2>
              <h2>
                <strong>Guillermo Reboledo</strong> - 204671
              </h2>
            </div>
            <div>
              <h2 className=" justify-center items-center text-center" >
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
