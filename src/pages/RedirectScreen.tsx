import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/RedirectScreen.css";

const RedirectScreen: React.FC = () => {
  const navigate = useNavigate();

  const handleRedirect = (type: string) => {
    navigate("/nfcscreen", { state: { type } });
  };

  return (
    <div className="redirect-container">
      <h1 className="redirect-title">Login / Cadastro</h1>
      <button className="redirect-button" onClick={() => handleRedirect("bar")}>
        Bar
      </button>
      <button className="redirect-button" onClick={() => handleRedirect("manutencao")}>
        Manutenção de pontos
      </button>

      <button className="redirect-button" onClick={() => navigate("/loginpromotor")}>Deslogar</button>
    </div>
  );
};

export default RedirectScreen;
