import CustomInputField from "../CustomInput/CustomInputField";


function TipoCampoFijo() {
    return (
        <div > 
            <CustomInputField name={'indexCampo'} label={'Indexado'} type={'text'}/>   

            <CustomInputField  label={'Nombre campo'} type={'text'}/>          
        </div>
    )
}




export default TipoCampoFijo;