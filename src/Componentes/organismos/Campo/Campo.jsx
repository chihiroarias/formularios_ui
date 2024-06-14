//import {TipoCampo} from "../../moleculares/TipoCampo/TipoCampo.jsx"
import { useDispatch } from "react-redux";
import CampoFijo from "../../moleculares/CampoFijo/CampoFijo.jsx";
import TipoCampo from "../../moleculares/TipoCampo/TipoCampo.jsx";
function Campo() {
  const dispatch = useDispatch();

  return (
    <div className="campo">
      <TipoCampo />
      <CampoFijo />
    </div>
  );
}

export default Campo;
