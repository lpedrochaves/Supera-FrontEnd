import "./Formulario.css";
import CampoTextoData from "../CampoTextoData";
import Botao from "../Botao";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CampoTextoNome from "../CampoTextoNome";
import Pagination from "../Paginacao";

const Formulario = () => {
  const [page, setPage] = useState(0);
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [nome, setNome] = useState("");
  const [data, setData] = useState([]);
  const [dataBusca, setDataResponse] = useState([]);
  const navigate = useNavigate();

  const handlePageChange = (page) => {
    setPage(page);
  };

  useEffect(() => {
    buscarTodos();
    // eslint-disable-next-line
  }, [page]);

  const buscarTodos = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/transferencia/paginada?size=5&page=${page}`
      );
      const responseJson = await response.json();
      setData(responseJson);
    } catch (error) {
      // Ocorreu um erro na chamada à API
      console.log("Erro na chamada à API:", error);
    }
  };

  const buscarComTodosParametros = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/transferencia/busca-total-paginada?dataInicial=${dataInicio}&dataFinal=${dataFim}&nome=${nome}&size=5&page=${page}`
      );
      if (response.status === 200) {
        const dataBusca = await response.json();
        setDataResponse(dataBusca);

        navigate("/buscar-por-parametros", { state: { dataBusca } });
      } else {
        navigate("/");
        // A resposta da API não foi bem-sucedida
        console.log("Erro na resposta da API");
      }
    } catch (error) {
      // Ocorreu um erro na chamada à API
      console.log("Erro na chamada à API:", error);
    }
  };

  const buscarComPeriodos = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/transferencia/busca-por-periodo-paginada?dataInicial=${dataInicio}&dataFinal=${dataFim}&size=5&page=${page}`
      );
      if (response.status === 200) {
        console.log("STATUS 200");
        const dataBusca = await response.json();
        setDataResponse(dataBusca);
        console.log(dataBusca, "PASSOU POR ESTE METODO");
        navigate("/buscar-por-periodos", { state: { dataBusca } });
      } else {
        navigate("/");
        // A resposta da API não foi bem-sucedida
        console.log("Erro na resposta da API");
      }
    } catch (error) {
      // Ocorreu um erro na chamada à API
      console.log("Erro na chamada à API:", error);
    }
  };

  const buscarPorNome = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/transferencia/buscar-por-nome-paginada?nome=${nome}&size=5&page=${page}`
      );
      if (response.status === 200) {
        const dataBusca = await response.json();
        setDataResponse(dataBusca);
        navigate("/buscar-por-nome", { state: { dataBusca } });
      } else {
        navigate("/");
        // A resposta da API não foi bem-sucedida
        console.log("Erro na resposta da API");
      }
    } catch (error) {
      // Ocorreu um erro na chamada à API
      console.log("Erro na chamada à API:", error);
    }
  };

  //Método For para mostrar o Saldo Total
  var teste = 0;
  for (let i = 0; i < data.length; i++) {
    teste = data[i].valorTotal;
  }
  var teste2 = 0;
  for (let i = 0; i < dataBusca.length; i++) {
    teste = dataBusca[i].valorTotal;
  }

  const buscar = (evento) => {
    evento.preventDefault();
    if (dataInicio !== "" && dataFim !== "" && nome === "") {
      buscarComPeriodos();
    } else if (dataInicio !== "" && dataFim !== "" && nome !== "") {
      buscarComTodosParametros();
    } else if (dataInicio === "" && dataFim === "" && nome !== "") {
      buscarPorNome();
    }
  };

  const Mostrar = () => {
    return (
      <>
        {data?.content?.map((item) => (
          <tr className="tr-titulo">
            <td className="td-titulo">{item.dataTransferencia}</td>
            <td className="td-titulo">{item.valor}</td>
            <td className="td-titulo">{item.tipo}</td>
            <td className="td-titulo">{item.nomeOperadorTransacao}</td>
          </tr>
        ))}
      </>
    );
  };

  return (
    <section className="section-formulario">
      <form onSubmit={buscar}>
        <div className="formulario">
          <div className="div-campo-texto">
            <CampoTextoData
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
            <Botao texto="Pesquisar" />
          </div>
          <div className="div-cabecalho-tabela">
            <tr className="tr-saldo">
              <td className="td-saldo">
                Saldo no período: R$ {teste2 !== null ? teste2.toFixed(2) : ""}
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
            <Mostrar />
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

export default Formulario;
