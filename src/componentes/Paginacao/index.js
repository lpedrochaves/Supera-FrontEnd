import React from "react";
import "./Paginacao.css";
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePreviousPage = () => {
    onPageChange(currentPage - 1);
  };

  const handleNextPage = () => {
    onPageChange(currentPage + 1);
  };

  return (
    <div className="div-paginacao">
      <button onClick={handlePreviousPage} disabled={currentPage === 0}>
        Anterior
      </button>
      <span>{currentPage}</span>
      <button onClick={handleNextPage} disabled={currentPage === totalPages}>
        Próxima
      </button>
    </div>
  );
};

export default Pagination;
