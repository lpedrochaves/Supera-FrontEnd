import { Route, Routes } from "react-router-dom";
import Formulario from "./componentes/Formulario";
import BuscaPorTransferencia from "./Pages/BuscaPorTransferencia";
import BuscaPorPeriodo from "./Pages/BuscaPorPeriodo";
import BuscaPorNome from "./Pages/BuscaPorNome";
const Navegacao = () => {
  return (
    <Routes>
      <Route path="/" element={<Formulario />} />
      <Route path="/buscar-por-parametros" element={<BuscaPorTransferencia />} />
      <Route path="/buscar-por-periodos" element={<BuscaPorPeriodo/>} />
      <Route path="/buscar-por-nome" element={<BuscaPorNome/>} />
    </Routes>
  );
};

export default Navegacao;
