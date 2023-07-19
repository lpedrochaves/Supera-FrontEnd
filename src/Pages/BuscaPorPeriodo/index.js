import { Link, useLocation } from "react-router-dom";
import CampoTextoNome from "../../componentes/CampoTextoNome";
import CampoTextoData from "../../componentes/CampoTextoData";
import { useState } from "react";
import Botao from "../../componentes/Botao";
import { APIResponse } from "../../service/Api";
import "./BuscaPorPeriodo.css";
import Pagination from "../../componentes/Paginacao";

const BuscaPorPeriodo = () => {
  const [page, setPage] = useState(0);
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [nome, setNome] = useState("");
  const { data } = APIResponse("");

  const handlePageChange = (page) => {
    setPage(page);
  };
  const location = useLocation();
  const { dataBusca } = location.state;

  //Método For para mostrar o Saldo Total
  var teste = 0;
  for (let i = 0; i < data.length; i++) {
    teste = data[i].valorTotal;
  }
  var teste2 = 0;
  for (let i = 0; i < dataBusca.length; i++) {
    teste2 = dataBusca[i].valorNoPeriodo;
  }

  const buscar = (evento) => {
    evento.preventDefault();
  };
  const MostrarBuscaRealizada = () => {
    return (
      <>
        {dataBusca?.content?.map((item) => (
          <tr className="tr-titulo">
            <td className="td-titulo">{item.dataTransferencia}</td>
            <td className="td-titulo">{item.valor}</td>
            <td className="td-titulo">{item.tipo}</td>
            <td className="td-titulo">{item.nomeOperadorTransacao}</td>
          </tr>
        ))}
        ;
      </>
    );
  };
  return (
    <section className="section-formulario">
      <form onSubmit={buscar}>
        <div className="formulario">
          <div className="div-campo-texto">
            <CampoTextoData
              obrigatorio={true}
              label="Data de Início"
              placeholder="Digite a Data Inicial"
              valor={dataInicio}
              aoAlterado={(valor) => setDataInicio(valor)}
            />
            <CampoTextoData
              label="Data de Fim"
              placeholder="Digite a Data Final"
              valor={dataFim}
              aoAlterado={(valor) => setDataFim(valor)}
            />
            <CampoTextoNome
              label="Nome do Operador Transacionado"
              placeholder="Digite o Nome do Operador"
              valor={nome}
              aoAlterado={(valor) => setNome(valor)}
            />
          </div>
          <div className="div-botao">
            <Link to="/">
              <Botao texto="Retornar"></Botao>
            </Link>
          </div>
          <div className="div-cabecalho-tabela">
            <tr className="tr-saldo">
              <td className="td-saldo">
                Saldo no período: R$ {teste2.toFixed(2)}
              </td>
              <td className="td-saldo">Saldo Total: R$ {teste.toFixed(2)}</td>
              <td></td>
            </tr>
            <tr className="tr-titulo-cabecalho">
              <td className="td-titulo">Dados</td>
              <td className="td-titulo">Valor</td>
              <td className="td-titulo">Tipo</td>
              <td className="td-titulo">Nome do Operador</td>
            </tr>
            <MostrarBuscaRealizada />
          </div>
        </div>
      </form>
      <Pagination
        currentPage={page}
        totalPages={10}
        onPageChange={handlePageChange}
      />
    </section>
  );
};

export default BuscaPorPeriodo;
