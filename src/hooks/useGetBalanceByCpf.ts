import { useState } from "react";

const useGetBalanceByCpf = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);

  const fetchBalance = async (cpf: string) => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await fetch("http://18.231.158.211:3335/Dashboard/GetBalanceByCpf", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Cpf": cpf,
        },
      });
      
      const result = await response.json();
      setData(result);
      return result;
    } catch (error) {
      setError("Erro ao consultar CPF");
    } finally {
      setLoading(false);
    }
  };

  return { fetchBalance, data, loading, error };
};

export default useGetBalanceByCpf;
