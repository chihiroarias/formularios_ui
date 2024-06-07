import React, { useState, useRef } from "react";
import Label from "../Label/Label";
const InputDate = (props) => {
  const [date, setDate] = useState(new Date());
  const { name } = props;

  return (
    <div>
      <Label name={name} />
      <input type="date" name={name} />
    </div>
  );
};

export default InputDate;
