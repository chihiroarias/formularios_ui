import React, { useState, useEffect } from "react";
import Select from "../../atomicos/Select/Select";
import { accessAPI } from "../../../Utils/utils";
import Label from "../../atomicos/Label/Label";

const MuestraSelectDelSistema = ({ selectPrecargadoId, ...props }) => {
  const [selectConfig, setSelectConfig] = useState(null);
  const labelText = props.required ? `${props.labelForm} *` : props.labelForm;

  useEffect(() => {
    console.log(selectPrecargadoId);
    if (selectPrecargadoId) {
      accessAPI(
        "GET",
        `admin/form/${selectPrecargadoId}`,
        null,
        (response) => {
          console.log(response);
          setSelectConfig(
            <div style={props.estiloCampo ? props.estiloCampo : {}}>
              <Label
                labelForm={
                  props.indexadoForm
                    ? `${props.indexadoForm} ${labelText}`
                    : labelText
                }
                htmlFor={props.htmlFor ?? props.id}
              />
              <Select
                id={props.id}
                options={response.precargaSelects}
                selectName={response.nombre}
                onChange={handleSelectChange}
              />
            </div>
          );
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }, []);

  const handleSelectChange = (event) => {
    console.log(event.target.value);
  };

  return <div>{selectConfig}</div>;
};

export default MuestraSelectDelSistema;
