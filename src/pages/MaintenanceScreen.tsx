import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/maintenanceScreen.css";
import Popup from "../components/Popup"; 
import useSpendWithMaintenance from "../hooks/useSpendWithMaintenance"; // Importando o Hook

interface Balance {
  BalanceCurrentValue: number;
  Impact: number;
  ImpactDate: string;
  ImpactOrigin: string;
}

interface LocationState {
  Name: string;
  Balances: Balance[];
}

const MaintenanceScreen: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { Name, Balances }: LocationState = location.state || { Name: "Usuário", Balances: [] };

  const [impactValue, setImpactValue] = useState<number>(10);
  const [justification, setJustification] = useState<string>("");

  const { sendRequest, popupMessage, showPopup } = useSpendWithMaintenance(); // Usando o Hook

  const totalSaldo = Balances.reduce((sum: number, balance: Balance) => sum + balance.BalanceCurrentValue, 0);

  return (
    <div className="manutencao-container">
      <h1 className="manutencao-title">Perfil do {Name}</h1>

      <Popup show={showPopup} message={popupMessage} />

      <div className="input-container">
        <label className="input-label">QUAL O MOTIVO:</label>
        <input
          type="text"
          className="manutencao-input"
          placeholder="Digite o motivo"
          value={justification}
          onChange={(e) => setJustification(e.target.value)}
        />
      </div>

      <div className="input-container">
        <label className="input-label">VALOR:</label>
        <div className="stepper-container">
          <button
            className={`stepper-button ${impactValue === -10 ? "active" : ""}`}
            onClick={() => setImpactValue(-10)}
          >
            -10
          </button>
          <input type="number" className="manutencao-input stepper-input" value={impactValue} readOnly />
          <button
            className={`stepper-button ${impactValue === 10 ? "active" : ""}`}
            onClick={() => setImpactValue(10)}
          >
            +10
          </button>
        </div>
      </div>

      <button className="manutencao-button" onClick={() => sendRequest(impactValue, justification)}>
        Adicionar
      </button>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Origem</th>
              <th>Pontos</th>
              <th>Pontos total</th>
              <th>Horário</th>
            </tr>
          </thead>
          <tbody>
            {Balances.map((balance: Balance, index: number) => (
              <tr key={index}>
                <td>{balance.ImpactOrigin}</td>
                <td>{balance.Impact > 0 ? `+${balance.Impact}` : balance.Impact}</td>
                <td>{balance.BalanceCurrentValue}</td>
                <td>{new Date(balance.ImpactDate).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button className="saldo-button">Saldo atual: {totalSaldo}</button>
      <button className="sair-button" onClick={() => navigate("/cpfinputscreen")}>SAIR</button>
    </div>
  );
};

export default MaintenanceScreen;
