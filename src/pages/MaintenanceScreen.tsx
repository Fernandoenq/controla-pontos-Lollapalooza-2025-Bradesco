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
  const [_fontSize, setFontSize] = useState("34px"); // Tamanho padrão da fonte
  const [tableHeight, setTableHeight] = useState<string>("300px");
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
        setTableHeight(tableHeight);
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
        paddingBottom:"2vh"
      }}
    >
      <h1
        className="manutencao-title"
        style={{
          color: "white",
          fontFamily: "BradescoSansBold",
          fontSize: "3vh", // Ajuste opcional para tamanho da fonte
          marginTop: "15vh", // Adiciona um espaçamento no topo
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
                color: "white",
                fontFamily: "BradescoSans",
                fontSize: "2vh", // Ajuste opcional para tamanho da fonte
                marginTop: "0px", // Adiciona um espaçamento no topo
              }}
            >
              Usuário: {personName}
            </label>
            <label
              className="input-label"
              style={{
                color: "white",
                fontFamily: "BradescoSans",

                marginTop: "0px", // Adiciona um espaçamento no topo
                fontSize: "2vh", // Ajuste opcional para tamanho da fonte
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
                className="button-container"
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  padding: "10px",
                }}
              >
                <button
                  className="stepper-button"
                  onClick={() => setImpactValue(-10)}
                  style={{
                    backgroundColor:
                      impactValue === -10 ? "#cd092f" : "transparent",
                    color: "white",
                    borderColor: "white",
                    borderWidth: "1px",
                    borderStyle: "solid",
                    borderRadius: "9999px",
                    padding: "12px 20px",
                    fontSize: "3vh",
                    fontWeight: "bold",
                    height: "5vh",
                    fontFamily: "BradescoSansBold",
                    width: "50%",
                    margin: "0 10px",
                    transition: "background-color 0.3s", // Suaviza a transição de cor
                  }}
                >
                  -10
                </button>
                <button
                  className="stepper-button"
                  onClick={() => setImpactValue(10)}
                  style={{
                    backgroundColor:
                      impactValue === 10 ? "#cd092f" : "transparent",
                    color: "white",
                    borderColor: "white",
                    borderWidth: "1px",
                    borderStyle: "solid",
                    borderRadius: "9999px",
                    padding: "12px 20px",
                    fontSize: "3vh",
                    fontWeight: "bold",
                    height: "5vh",
                    fontFamily: "BradescoSansBold",
                    width: "50%",
                    margin: "0 10px",
                    transition: "background-color 0.3s", // Suaviza a transição de cor
                  }}
                >
                  +10
                </button>
              </div>
            </div>
          </div>

          <div
            className="button-container"
            style={{
              display: "flex", // Usa flexbox para alinhar os botões
              justifyContent: "space-around", // Distribui o espaço de forma uniforme ao redor dos botões
              gap: "30px", // Adiciona um espaçamento entre os botões
              alignItems: "center", // Centraliza os botões verticalmente
              padding: "10px", // Adiciona padding ao redor dos botões dentro do container
              marginBottom: "20px", // Adiciona margem inferior para criar espaço
            }}
          >
            <button
              className="manutencao-button"
              onClick={handleAdd}
              style={{
                backgroundColor: "#cd092f", // Cor de fundo vermelha
                color: "white", // Texto branco
                borderColor: "white", // Borda branca
                borderWidth: "1px", // Largura da borda de 1px
                borderStyle: "solid", // Estilo da borda sólido
                borderRadius: "9999px", // Bordas completamente arredondadas
                padding: "12px 20px", // Aumenta o padding vertical para 12px e horizontal para 20px
                fontSize: "2vh", // Ajuste opcional para tamanho da fonte
                fontWeight: "bold", // Define a fonte como negrito
                height: "5vh", // Define a altura do botão
                fontFamily: "BradescoSansButtom", // Aplica a fonte personalizada
                width: "70%", // Aumenta a largura para 50% do container
                margin: "0 10px", // Adiciona margem horizontal para criar espaço
              }}
            >
              Adicionar
            </button>
            <button
              className="sair-button"
              onClick={() => navigate("/redirectscreen")}
              style={{
                backgroundColor: "transparent", // Cor de fundo transparente
                color: "white", // Texto branco
                borderColor: "white", // Borda branca
                borderWidth: "1px", // Largura da borda de 1px
                borderStyle: "solid", // Estilo da borda sólido
                borderRadius: "9999px", // Bordas completamente arredondadas
                padding: "12px 20px", // Aumenta o padding vertical para 12px e horizontal para 20px
                fontSize: "2vh", // Ajuste opcional para tamanho da fonte
                fontWeight: "bold", // Define a fonte como negrito
                height: "5vh", // Define a altura do botão
                fontFamily: "BradescoSansButtom", // Aplica a fonte personalizada
                width: "50%", // Aumenta a largura para 50% do container
                margin: "0 10px", // Adiciona margem horizontal para criar espaço
              }}
            >
              Voltar
            </button>
          </div>

          <div
            style={{
              backgroundColor: "#cd092f", // Cor de fundo vermelha
              color: "white", // Texto branco
              borderColor: "white", // Borda branca
              borderWidth: "1px", // Largura da borda de 1px
              borderStyle: "solid", // Estilo da borda sólido
              borderRadius: "9999px", // Bordas completamente arredondadas
              padding: "12px 20px", // Aumenta o padding vertical para 12px e horizontal para 20px
              fontSize: "2vh", // Ajuste opcional para tamanho da fonte
              fontWeight: "bold", // Define a fonte como negrito
              height: "5vh", // Define a altura do botão para 50px
              fontFamily: "BradescoSansBold", // Aplica a fonte personalizada
              width: "40%", // Define a largura do botão para 100% do container
            }}
          >
            Saldo atual: {totalSaldo}
          </div>

          <div
            className="table-container p-4 mb-10"
            style={{
              maxHeight: "40vh",
              overflowY: "auto",
              width: "100%",

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
