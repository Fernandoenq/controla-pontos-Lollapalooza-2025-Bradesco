import React, { useState, useEffect } from "react";
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
  const [fontSize, setFontSize] = useState("34px"); // Tamanho padrão da fonte
  const [tableHeight, setTableHeight] = useState("300px");
  const { balances, loading, error, fetchBalances } = useFetchBalances();
  const [impactValue, setImpactValue] = useState<number>(10);
  const [justification, setJustification] = useState<string>("");
  const { sendRequest, popupMessage, showPopup } = useSpendWithMaintenance();

  const personName = localStorage.getItem("PersonName") || "Usuário";
  const totalSaldo = balances.reduce(
    (sum: number, balance: Balance) => sum + balance.Impact,
    0
  );

  const handleAdd = async () => {
    await sendRequest(impactValue, justification);
    fetchBalances();
  };
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setFontSize("18px"); // Fonte reduzida para celulares
      } else if (window.innerWidth > 768 && window.innerWidth < 1024) {
        setFontSize("24px"); // Fonte padrão para tablets e desktops
      } else {
        setFontSize("54px"); // Fonte padrão para tablets e desktops
      }
    };

    handleResize(); // Executa no carregamento para definir o tamanho inicial
    window.addEventListener("resize", handleResize); // Ajusta o tamanho ao redimensionar a janela

    return () => {
      window.removeEventListener("resize", handleResize); // Limpa o event listener ao desmontar o componente
    };
  }, []);
  useEffect(() => {
    const updateTableHeight = () => {
      if (window.innerWidth < 768) {
        setTableHeight("300px");
      } else if (window.innerWidth >= 768 && window.innerWidth < 1024) {
        setTableHeight("400px");
      } else {
        setTableHeight("60vh");
      }
    };

    updateTableHeight();
    window.addEventListener("resize", updateTableHeight);

    return () => window.removeEventListener("resize", updateTableHeight);
  }, []);

  return (
    <div
      className="manutencao-container"
      style={{
        backgroundImage: `url('/calc.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        overflowY: "auto", // Adiciona rolagem vertical
      }}
    >
      <h1
        className="manutencao-title"
        style={{
          color: "#cd092f",
          fontFamily: "BradescoSansBold",
          fontSize: fontSize, // Aplica o tamanho dinâmico da fonte
          marginTop: "80px", // Adiciona um espaçamento no topo
        }}
      >
        Adicione ou subtraia mais pontos
      </h1>

      <Popup show={showPopup} message={popupMessage} />

      {loading ? (
        <p>Carregando dados...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <>
          <div className="input-container">
            <label
              className="input-label"
              style={{
                color: "#cd092f",
                fontFamily: "BradescoSans",
                fontSize: fontSize, // Aplica o tamanho dinâmico da fonte
                marginTop: "0px", // Adiciona um espaçamento no topo
              }}
            >
              Usuário: {personName}
            </label>
            <label
              className="input-label"
              style={{
                color: "#cd092f",
                fontFamily: "BradescoSans",
                fontSize: fontSize, // Aplica o tamanho dinâmico da fonte
                marginTop: "0px", // Adiciona um espaçamento no topo
              }}
            >
              QUAL O MOTIVO:
            </label>
            <style>
              {`
    .input-placeholder-white::placeholder {
      color: white; /* Define a cor do placeholder para branco */
    }
  `}
            </style>
            <input
              type="text"
              className="manutencao-input input-placeholder-white"
              placeholder="Digite o motivo"
              value={justification}
              onChange={(e) => setJustification(e.target.value)}
              style={{
                backgroundColor: "#cd092f",
                borderRadius: "9999px",
                fontFamily: "BradescoSans", // Aplica a fonte personalizada
              }}
            />
          </div>

          <div className="input-container">
            <div
              className="stepper-container"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center", // Centraliza os botões e o input na vertical
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-around",
                }}
              >
                <button
                  className={`stepper-button ${
                    impactValue === -10 ? "active" : ""
                  }`}
                  onClick={() => setImpactValue(-10)}
                  style={{
                    backgroundColor: "#cd092f",
                    color: "white",
                    borderColor: "white",
                    borderWidth: "1px",
                    borderStyle: "solid",
                    borderRadius: "9999px",
                    padding: "12px 20px",
                    fontSize: fontSize,
                    fontWeight: "bold",
                    height: "80px",
                    fontFamily: "BradescoSansBold",
                    marginBottom: "20px",
                  }}
                >
                  -10
                </button>
                <button
                  className={`stepper-button ${
                    impactValue === 10 ? "active" : ""
                  }`}
                  onClick={() => setImpactValue(10)}
                  style={{
                    backgroundColor: "#cd092f",
                    color: "white",
                    borderColor: "white",
                    borderWidth: "1px",
                    borderStyle: "solid",
                    borderRadius: "9999px",
                    padding: "12px 20px",
                    fontSize: fontSize,
                    fontWeight: "bold",
                    height: "80px",
                    fontFamily: "BradescoSansBold",
                    marginBottom: "20px",
                  }}
                >
                  +10
                </button>
              </div>
              <input
                type="number"
                className="manutencao-input stepper-input"
                value={impactValue}
                readOnly
                style={{
                  backgroundColor: "#cd092f",
                  borderRadius: "9999px",
                  fontFamily: "BradescoSans", // Aplica a fonte personalizada
                }}
              />
            </div>
          </div>

          <div className="button-container">
            <button
              className="manutencao-button"
              onClick={handleAdd}
              style={{
                backgroundColor: "#cd092f",
                color: "white",
                borderColor: "white",
                borderWidth: "1px",
                borderStyle: "solid",
                borderRadius: "9999px",
                padding: "12px 20px",
                fontSize: fontSize,
                fontWeight: "bold",
                height: "80px",
                fontFamily: "BradescoSansBold",
                marginRight: "20px", // Adiciona espaço entre os botões
              }}
            >
              Adicionar
            </button>
            <button
              className="sair-button"
              onClick={() => navigate("/redirectscreen")}
              style={{
                backgroundColor: "#cd092f",
                color: "white",
                borderColor: "white",
                borderWidth: "1px",
                borderStyle: "solid",
                borderRadius: "9999px",
                padding: "12px 20px",
                fontSize: fontSize,
                fontWeight: "bold",
                height: "80px",
                fontFamily: "BradescoSansBold",
              }}
            >
              Voltar
            </button>
          </div>
          <div
            style={{
              color: "#cd092f",
              padding: "12px 20px",
              fontSize: fontSize, // Aplica o tamanho dinâmico da fonte
              fontWeight: "bold",
              height: "10px",
              fontFamily: "BradescoSansBold",
              margin: "20px 100px", // Adiciona espaço entre o texto e a tabela
            }}
          >
            Saldo atual: {totalSaldo}
          </div>

          <div
            className="table-container p-4 mb-10"
            style={{
              maxHeight:
                window.innerWidth < 768
                  ? "300px"
                  : window.innerWidth >= 768 && window.innerWidth < 1024
                  ? "400px"
                  : "60vh",
              overflowY: "auto",
              width: "100%",
              margin: "auto",
              backgroundColor: "white",
            }}
          >
            <table className="table table-bordered table-striped ">
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
                    <td>
                      {balance.Impact > 0
                        ? `+${balance.Impact}`
                        : balance.Impact}
                    </td>
                    <td>{balance.BalanceCurrentValue}</td>
                    <td>{new Date(balance.ImpactDate).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default MaintenanceScreen;
