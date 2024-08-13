export const selectDato = [
  {
    options: [{ name: "Elija tipo", value: "" }],
  },
  {
    label: "Campos destacados",
    options: [
      { name: "Sección", value: "section" },
      { name: "Texto", value: "text" },
      { name: "Área de texto", value: "textarea" },
      { name: "Fecha", value: "date" },
      { name: "Archivo", value: "file" },
    ],
  },
  {
    label: "Campos de selección",
    options: [
      { name: "Checkbox", value: "checkbox" },
      { name: "Radio", value: "radio" },
      { name: "Select", value: "select" },
      { name: "Selects existentes", value: "sExistentes" },
      { name: "Select precargado", value: "sPrecargado" },
    ],
  },
  {
    label: "Otros campos",
    options: [
      { name: "Email", value: "email" },
      { name: "Número", value: "number" },
      { name: "Telefono", value: "tel" },
      { name: "URL", value: "url" },
    ],
  },
];
