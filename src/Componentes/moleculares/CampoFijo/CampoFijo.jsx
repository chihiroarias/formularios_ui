
import Button from "../../atomicos/Button/Button";

function CampoFijo() {
  return (
    <>
      <div>
        <Button text={"Agregar Campo"} color={"red"} type="submit" />
        <Button text={"Eliminar Campo"} color={"blue"} type="submit" />
      </div>
    </>
  );
}

export default CampoFijo;
