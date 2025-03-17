import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/MaintenanceScreen.css";
import Popup from "../components/Popup"; 
import useSpendWithMaintenance from "../hooks/useSpendWithMaintenance";
import useFetchBalances from "../hooks/useFetchBalances";

interface Balance {
  BalanceCurrentValue: number;
  Impact: number;
  ImpactDate: string;
  ImpactOrigin: string;
}

const MaintenanceScreen: React.FC = () => {
  const navigate = useNavigate();
  const { balances, loading, error, fetchBalances } = useFetchBalances();
  const [impactValue, setImpactValue] = useState<number>(10);
  const [justification, setJustification] = useState<string>("");
  const { sendRequest, popupMessage, showPopup } = useSpendWithMaintenance();

  const personName = localStorage.getItem("PersonName") || "Usuário";
  const totalSaldo = balances.reduce((sum: number, balance: Balance) => sum + balance.Impact, 0);

  const handleAdd = async () => {
    await sendRequest(impactValue, justification);
    fetchBalances(); 
  };

  return (
    <div className="manutencao-container">
      <h1 className="manutencao-title">Perfil do {personName}</h1>

      <Popup show={showPopup} message={popupMessage} />

      {loading ? (
        <p>Carregando dados...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <>
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

          <button className="manutencao-button" onClick={handleAdd}>
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
                {balances.map((balance: Balance, index: number) => (
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
        </>
      )}

      <button className="sair-button" onClick={() => navigate("/redirectscreen")}>SAIR</button>
    </div>
  );
};

export default MaintenanceScreen;
