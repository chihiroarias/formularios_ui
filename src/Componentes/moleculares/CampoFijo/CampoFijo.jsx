//import Label from "../../atomicos/Label/Label";
//import InputField from "../../atomicos/InputField/InputField";
//import Checkbox from "../../atomicos/Checkbox/Checkbox";
import Button from "../../atomicos/Button/Button";

function CampoFijo() {
  return (
    <>
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
