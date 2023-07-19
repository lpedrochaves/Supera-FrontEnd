import "./CampoTexto.css";
import InputMask from "react-input-mask";
import { useState } from "react";
const CampoTextoData = ({ label, aoAlterado , ...props}) => {

  const [value, setValue] = useState('');

  const aoDigitado = (evento) => {
    const valorInformado = evento.target.value;
    const valorFormatado = formatarData(valorInformado);
    setValue(valorInformado); // Corrigido para atualizar o valor digitado
    aoAlterado(valorFormatado);
  };

  const formatarData = (data) => {
    const [dia = '', mes = '', ano = ''] = data.split('/');
    const dataFormatada = `${ano.padStart(4, '0')}${mes.padStart(2, '0')}${dia.padStart(2, '0')}`;
    return dataFormatada;
  };


  return (
    <div className="campo-texto">
      <label>{label}</label>
      <InputMask
        mask="99/99/9999"
        placeholder="DD/MM/YYYY"
        value={value}
        onChange={aoDigitado}
      />
    </div>
  );
};

export default CampoTextoData;
