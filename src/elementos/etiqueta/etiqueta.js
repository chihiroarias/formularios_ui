import React, { useState, useEffect, useRef } from "react";

export default function Etiqueta(props) {
  const { htmlFor, etiqueta } = props;
  ///htmlFor={htmlFor}
  return (
    <div>
      <label>{etiqueta}</label>
    </div>
  );
}
