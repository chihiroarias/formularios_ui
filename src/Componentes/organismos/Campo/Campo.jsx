//import {TipoCampo} from "../../moleculares/TipoCampo/TipoCampo.jsx"
import CampoFijo from "../../moleculares/CampoFijo/CampoFijo.jsx"
import TipoCampo from "../../moleculares/TipoCampo/TipoCampo.jsx";
function Campo() {
    return (
        <div className="campo">     
            <TipoCampo />     
            <CampoFijo />
        </div>
    );
}

export default Campo;