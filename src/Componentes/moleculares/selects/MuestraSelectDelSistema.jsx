import React, { useState, useEffect } from "react";
import Select from "../../atomicos/Select/Select";
import { accessAPI } from "../../../Utils/utils";
//import Label from "../../atomicos/Label/Label";

const MuestraSelectDelSistema = ({ selectId }) => {
  const [selectConfig, setSelectConfig] = useState(null);

  useEffect(() => {
    if (selectId) {
      accessAPI(
        "GET",
        `admin/form/${selectId}`,
        null,
        (response) => {
          setSelectConfig(
            <Select
              options={response.precargaSelects}
              selectName={response.nombre}
              onChange={handleSelectChange}
            />
          );
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }, [selectId]);

  const handleSelectChange = (event) => {
    console.log(event.target.value);
  };

  return (
    <div>
      {/* Aquí puedes renderizar el Select configurado */}
      {selectConfig}
    </div>
  );
};

export default MuestraSelectDelSistema;