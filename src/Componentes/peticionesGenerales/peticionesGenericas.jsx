import Button from "../atomicos/Button/Button";
import Label from "../atomicos/Label/Label";

const PeticionesGenerales = () => {
  return (
    <div>
      <input type="text" id="Indice" placeholder="índice"></input>
      <Label name={"N° índice"} hmtlFor={"Indice"} />
      <br />
      <input type="checkbox" id="obl" />
      <Label name={"Campo Obligatorio"} hmtlFor={"obl"} />
      <br />
      <Button type={"submit"} text={"Crear campo"} />
    </div>
  );
};

export default PeticionesGenerales;
