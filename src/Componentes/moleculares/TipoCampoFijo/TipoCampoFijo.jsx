import Label from "../../atomicos/Label/Label";
import InputField from "../../atomicos/InputField/InputField";



function TipoCampoFijo() {
    return (
        <div>
            <Label name={'N° Índice'} />
            <InputField type={'text'} />
            <Label name={'Nombre campo'} />
            <InputField type={'text'}/>
        </div>
    )
}




export default TipoCampoFijo;