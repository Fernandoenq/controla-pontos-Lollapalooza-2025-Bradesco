import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Popup from "../components/Popup";
import { validateCpf } from "../utils/cpfUtils";
import useGetBalanceByCpf from "../hooks/useGetBalanceByCpf.ts";
import "../styles/CpfInputScreen.css";

const CpfInputScreen: React.FC = () => {
  const [cpf, setCpf] = useState("");
  const [popupMessage, setPopupMessage] = useState<string>("");
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const navigate = useNavigate();
  const { fetchBalance, loading } = useGetBalanceByCpf();

  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => setShowPopup(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showPopup]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCpf(event.target.value);
  };

  const handleEnter = async () => {
    console.log("Clicou");

    const data = await fetchBalance(cpf);
    
    if (data?.Name === null && data?.Balances?.length === 0) {
      setPopupMessage("CPF não cadastrado");
      setShowPopup(true);
    } else {
      navigate("/nextpage", { state: data });
    }
  };

  return (
    <div className="cpf-container">
      <Popup show={showPopup} message={popupMessage} />
      
      <h1 className="cpf-title">Insira o cpf ou leia o cartão</h1>
      
      <div className="input-container">
        <label htmlFor="cpf" className="input-label">CPF:</label>
        <input 
          type="text" 
          id="cpf" 
          className="cpf-input" 
          placeholder="Digite seu CPF" 
          value={cpf} 
          onChange={handleInputChange} 
        />
      </div>
      
      <button className="cpf-button" onClick={handleEnter} disabled={!validateCpf(cpf) || loading}>
        {loading ? "Carregando..." : "Entrar"}
      </button>
      
      <p className="footer-text">HOLDING CLUBE</p>
    </div>
  );
};

export default CpfInputScreen;