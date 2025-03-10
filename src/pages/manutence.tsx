import React, { useState } from "react";
import "../styles/CpfInputScreen.css";

const CpfInputScreen: React.FC = () => {
  const [cpf, setCpf] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCpf(event.target.value);
  };

  return (
    <div className="cpf-container">
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
      
      <button className="cpf-button">Entrar</button>
      
      <p className="footer-text">HOLDING CLUBE</p>
    </div>
  );
};

export default CpfInputScreen;
