/*export const selectDato = [
  { name: "  Elija tipo  ", value: "" },
  { name: "Archivo", value: "file" },
  { name: "Área de texto", value: "textarea" },
  { name: "Checkbox", value: "checkbox" },
  { name: "Fecha", value: "date" },
  { name: "Email", value: "email" },
  { name: "Número", value: "number" },
  { name: "Radio", value: "radio" },
  { name: "Telefono", value: "tel" },
  { name: "Texto", value: "text" },
  { name: "Sección", value: "section" },
  { name: "Select", value: "select" },
  { name: "Select anidado", value: "sAnidado" },
  { name: "Selects existentes", value: "sExistentes" },
  { name: "Select precargado", value: "sPrecargado" },
  { name: "URL", value: "url" },
];

id|nombreTipo            |
--+----------------------+
 0|Elija un tipo         |
13|Archivo               |
 1|Área de texto         |
 2|Checkbox              |
 3|Fecha                 |
 4|Email                 |
 5|Número                |
 6|Radio                 |
 7|Teléfono              |
 8|Texto                 |
 9|Sección               |
11|Select 		           |
12|Select anidado        |
14|Selects existentes    |
15|Selects precargado    |
10|URL                   |
*/
export const selectDato = [
  {
    
    options: [
      { name: "Elija tipo", value: "" },
    ],
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
      { name: "Select anidado", value: "sAnidado" },
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