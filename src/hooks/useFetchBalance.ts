import { useEffect, useState } from "react";

const useFetchBalance = (rfidValue: string) => {
  const [balanceCurrentValue, setBalanceCurrentValue] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const apiUrl = "http://18.231.158.211:3335/Balance/GetCurrentBalanceByExternalCode";

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await fetch(`${apiUrl}?ExternalCode=${rfidValue}`);
        if (!response.ok) {
          throw new Error("Erro ao buscar saldo");
        }
        const data = await response.json();
        console.log(rfidValue)
        setBalanceCurrentValue(data.CurrentBalance);
      } catch (err) {
        setError("Erro ao carregar saldo");
      } finally {
        setLoading(false);
      }
    };

    if (rfidValue) {
      fetchBalance();
    }
  }, [rfidValue]);

  return { balanceCurrentValue, loading, error };
};

export default useFetchBalance;
