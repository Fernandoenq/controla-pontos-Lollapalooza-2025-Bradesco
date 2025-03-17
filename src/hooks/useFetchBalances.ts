import { useState, useEffect, useCallback } from "react";

interface Balance {
  BalanceCurrentValue: number;
  Impact: number;
  ImpactDate: string;
  ImpactOrigin: string;
}

const useFetchBalances = () => {
  const [balances, setBalances] = useState<Balance[]>([]); // Definindo o tipo corretamente
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBalances = useCallback(async () => {
    try {
      setLoading(true);
      const rfidValue = localStorage.getItem("rfidValue") || "";
      const organizerId = localStorage.getItem("OrganizerId") || "";

      if (!rfidValue || !organizerId) {
        throw new Error("RFID ou OrganizerId não encontrados no localStorage");
      }

      const personResponse = await fetch(
        `https://api-back.picbrand.dev.br/Person/Person/${rfidValue}/${organizerId}`
      );

      if (!personResponse.ok) {
        throw new Error("Erro ao buscar dados da pessoa");
      }

      const personData = await personResponse.json();
      const { Cpf, PersonName } = personData;

      localStorage.setItem("PersonName", PersonName);

      const balanceResponse = await fetch(
        "https://api-back.picbrand.dev.br/Dashboard/GetBalanceByCpf",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Cpf: Cpf,
          },
        }
      );

      if (!balanceResponse.ok) {
        throw new Error("Erro ao buscar balanços");
      }

      const balanceData = await balanceResponse.json();
      setBalances(balanceData.Balances || []);
      setError(null);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Ocorreu um erro desconhecido.");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBalances();
  }, [fetchBalances]);

  return { balances, loading, error, fetchBalances };
};

export default useFetchBalances;
