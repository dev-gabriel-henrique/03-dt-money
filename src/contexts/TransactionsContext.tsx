import { api } from "../lib/axios";
import { createContext } from "use-context-selector";
import { ReactNode, useEffect, useState, useCallback } from "react";

interface ITransactions {
  id: number;
  description: string;
  type: 'income' | 'outcome';
  price: number;
  category: string;
  createdAt: string;
}

interface CreateTransactionInput {
  description: string;
  price: number;
  category: string;
  type: 'income' | 'outcome'
}

interface TransactionContextType {
  transactions: ITransactions[];
  fetchTransactions: (query?: string) => Promise<void>;
  createTransaction: (data: CreateTransactionInput) => Promise<void>;
}

interface TransactionsProviderProps {
  children: ReactNode;
}

export const TransactionsContext = createContext({
} as TransactionContextType)

export function TransactionsProvider({children}: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<ITransactions[]>([])

  const fetchTransactions = useCallback(
    async (query?: string) => {
      const response = await api.get("/transactions", {
        params: {
          _sort: 'createdAt',
          _order: 'desc',
          q: query,
        }
      })
  
      setTransactions(response.data);
    }, [],
  );

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const createTransaction = useCallback(
    async (data: CreateTransactionInput) => {
      const { description, category, price, type } = data;
  
      const response = await api.post("/transactions", {
        description,
        price,
        category,
        type,
        createdAt: new Date(),
      });
  
      setTransactions(state => [response.data, ...state])
    },
    [],
  )

  return (
    <TransactionsContext.Provider value={{ 
      transactions, 
      fetchTransactions,
      createTransaction
      }}>
      {children}
    </TransactionsContext.Provider>
  )
}