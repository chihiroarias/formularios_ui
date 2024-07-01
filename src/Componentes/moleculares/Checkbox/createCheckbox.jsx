import React, { useState } from "react";
import Button from "../../atomicos/Button/Button";
import CustomInputField from "../CustomInputField/CustomInputField";
import CheckBox from "../../atomicos/Checkbox/Checkbox";



export default function CreateCheckbox({addField}) {

  const [fieldData, setFieldData] = useState({
    name: '',
    label:'',
    placeholder: '',
    info: '',
    regex: '',
    obl: null,
    indexado: '',
    dataType: 'checkbox',
    indice: 0
  });

  //Sección ERRORES
  const [errorNombreCampo, setErrorNombreCampo] = useState(null);
  const [errorIndexado, setErrorIndexado] = useState(null);

  


  function validar(){
    let esValido = true;

    //limpiar errores
    setErrorIndexado(null);
    setErrorNombreCampo(null);


    //buscar errores
    if(!fieldData.indexado) {
      setErrorIndexado("El índice no puede estar vacío");
      esValido = false;
    }
    if(!fieldData.nombreCampo) { 
      setErrorNombreCampo("Nombre Campo no puede estar vacío");
      esValido = false;
    }


    return esValido;
  }



  function crearCampoCheckbox() {
    
    if(validar()) {
      addField(fieldData);
      //Limpio los estados despues de agregar el campo 
    setFieldData({
      nombreCampo: '',
      placeholder: '',
      info: '',
      regex: '',
      obl: false,
      indexado: '',
      dataType: 'checkbox',
      indice: fieldData.indice + 1
    });
    
  
  }}



  return (
    <div >
       <div>
        <CustomInputField 
          label={'Indice'} 
          name={'indice'} 
          htmlFor={'indice'} 
          type={'text'}
          required={true}
          value={fieldData.indexado}
          onChange={(e) => setFieldData({ ...fieldData, indexado: e.target.value })}
          error={errorIndexado ? errorIndexado : ""}
          /> 
      </div> 
      <div>
        <CustomInputField 
          label={'Nombre Campo'} 
          name={'etiqueta'} 
          htmlFor={'etiqueta'} 
          type={'text'}
          value={fieldData.nombreCampo}
          onChange={(e) => setFieldData({ ...fieldData, nombreCampo: e.target.value })} 
          error={errorNombreCampo ? errorNombreCampo : ""} 
          
          />       
      </div>

      <div>
        <CustomInputField 
          label={'Info'} 
          name={'info'} 
          htmlFor={'info'} 
          type={'text'}
          value={fieldData.info}
          onChange={(e) => setFieldData({ ...fieldData, info: e.target.value })}
          
          />
      </div>
        
      <div>
        <div style={{
				//border: '1px solid red',
				display: 'flex',
				alignItems:'center',
				justifyContent: 'start',
				margin:'5px 0 5px 10px',
			}}>
          <CheckBox 
            checked={fieldData.obl}
            onChange={(e) => setFieldData({ ...fieldData, obl: e.target.checked })}
            name="obligatorio"
            text={'Obligatorio'}
          />
        </div>
        <Button type="submit" onClick={crearCampoCheckbox} text="Crear Campo" />
      </div>
      <br />
    </div>
  );
}
