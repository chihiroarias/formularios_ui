import React, {useState} from 'react';
import FormTitle from "../../moleculares/FormTitle/FormTitle.jsx";
import FormDescription from "../../moleculares/FormDescription/FormDescription.jsx";
//import TipoCampo from "../../moleculares/TipoCampo/TipoCampo.jsx";
import MuestraCampoForm from "../../moleculares/MuestraCampoForm/MuestraCampoForm.jsx";
import { MdDelete } from "react-icons/md";

import Button from "../../atomicos/Button/Button.jsx";
import CreateDato from '../../moleculares/CreateDato/CreateDato.jsx';


function Formulario() {
  
  const[title, setTitle]=useState('');
  const[description, setDescription]=useState('');
  const[fields,setFields]=useState([]);
  const[indice, setIndice] = useState(1);
  

  const addField=(field)=>{
    console.log('Adding field:', field);
    setFields([...fields,{...field, indice}]);
  };
  

  const generateForm=() => {
    console.log('Form Data:', {title,description,fields});
  };

  const deleteField = (indice) => {
    setFields(fields.filter(field => field.indice !== indice));
  };

return (
  <div >
    <div>
      <h1>Generador de Formularios</h1>
      <FormTitle title={title} setTitle={setTitle} required={true} />
      <FormDescription description={description} setDescription={setDescription} />
      {/* <TipoCampo addField={addField} indice={indice} setIndice={setIndice} /> */}
      <CreateDato addField={addField} indice={indice} setIndice={setIndice} />
      {/* Renderizo los campos */}
    </div>     
    <div>        
      <h2>{title}</h2>
      <p>{description}</p>
      {fields.map((field, index) => (
        <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <MuestraCampoForm { ...field} />
          <MdDelete className={'delete-icon'} onClick={() => deleteField(field.indice)} />
        </div>
      ))}
    </div>
  
      <Button onClick={generateForm} text={'Generar Formulario'}/>
  </div>
);
};

export default Formulario;
