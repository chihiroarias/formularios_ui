
import Button from "../../atomicos/Button/Button";

function CampoFijo() {
  return (
    <>
      <div>
        <Button text={"Agregar Campo"} color={"red"} type="submit" />
        <Button text={"Eliminar Campo"} color={"blue"} type="submit" />

      <div style={{
        justifyContent:'space-between', 
        //border:'1px solid red'
        }} >
        <Button type={'submit'} text={"Generar Formulario"} color={"light-purple"} />
        <Button type={'submit'} text={"Eliminar Formulario"} color={"light-purple"} />

      </div>
    </>
  );
}

export default CampoFijo;
