import Label from "../../atomicos/Label/Label";
import InputField from "../../atomicos/InputField/InputField";
import Checkbox from "../../atomicos/Checkbox/Checkbox";
import Button from "../../atomicos/Button/Button";

function CampoFijo() {
    return (
        <>
        <div>
                <Label name={'RegEX'} />
                <InputField />
                <Label name={'Obligatorio'} />
                <Checkbox />
        </div>
        <div>
                <Button text={'Agregar Campo'} color={'light-purple'}/>
                <Button text={'Eliminar Campo'} color={'light-purple'}/>
        </div>
        </>
    )
}

export default CampoFijo;