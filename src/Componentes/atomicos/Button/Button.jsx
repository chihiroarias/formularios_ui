import PropTypes from "prop-types";
import { useState } from "react";
import classNames from "classnames";

const Button = ({
  icon,
  clickHandler,
  type,
  color,
  text,
  block,
  roundedCorner,
  btnStyle,
  textColor,
  ...props
}) => {
  // La prop icon pretende ser una etiqueta de icono react que se mostrará del lado izquierdo del texto.
  // La prop clickHandler debe ser una función que maneje el click del botón.
  /* Ea prop size indica el tamaño del botón usado por la case daisyUI (btn-xs, btn-sm, btn-lg, 
			el tamaño medio esta como default así si se desea elegir no es necesario especificarlo en el componente */
  // La propiedad type representa el tipo de botón
  /* La prop color contiene un string que determina el color de background del botón,
			los colores que se pueden elegir son: red, green, blue, orange, rose, cyan, purple */
  // La prop text es un string que permite al usuario saber la funiconaliad del botón
  // La prop block es un booleano que indica si el botón debería estar bloqueado o no

  // el estado hover es para controlar el efecto de hover del background
  const [hover, setHover] = useState(false);
 // const backColor = hover ? `dark-${color}` : color.toLowerCase();
  const toogleHover = () => {
    setHover(!hover);
  };
  const btnClass = classNames({
    btnStyle
  })

  return (
    <div
      className="buttonsContainer flexContainer">
      <button
        //style={{ backgroundColor: `${backColor}` }}
        onMouseEnter={toogleHover}
        onMouseLeave={toogleHover}
        onClick={clickHandler}
        type={type}
        className={`btn ${roundedCorner} ${btnClass} ${textColor} ${ block ? "btn-block" : "" } `}
        {...props}
      >
        {icon} {text}
      </button>
    </div>
  );
};

Button.propTypes = {
  icon: PropTypes.node,
  clickHandler: PropTypes.func,
  type: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  block: PropTypes.bool,  
  btnStyle: PropTypes.string,
  textColor: PropTypes.string,
};

Button.defaultProps = {
  icon: null,
  block: false,
  
};

export default Button;
