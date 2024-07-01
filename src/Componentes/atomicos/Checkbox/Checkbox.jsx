import PropTypes from "prop-types";

function CheckBox({
  name, 
  text, 
  checked,
  onChange, 
  disabled,
  ...prop }) {
  return (
    <>
      
      <label 
        htmlFor={name} 
        className="text-gray-400">
        {" "}
        {text}
      </label>
      <input 
        id={name} 
        type="checkbox" 
        name={name} 
        checked={checked} 
        style={{marginLeft:'10px'}}/>
    </>
  );
}

CheckBox.propTypes = {
  name: PropTypes.string.isRequired,
  text: PropTypes.string,
};

export default CheckBox;
