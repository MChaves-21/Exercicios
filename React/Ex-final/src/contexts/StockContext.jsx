import { createContext, useState, useEffect, useContext } from "react";
 
// Cria o Contexto
const StockContext = createContext({});

// Hook customizado para facilitar o uso do contexto,se eu chamar useStock, ele ja importa o useContext e o StockContext
export const useStock = () => {
  return useContext(StockContext);
};

//Cria o Provider do contexto com os itens do local storage,caso nao tenha, cria um array vazio
export function StockContextProvider({ children }) {
  const [items, setItems] = useState(() => {
    const storedItems = localStorage.getItem('react-stock-app');
    if (!storedItems) return [];
    try {
      return JSON.parse(storedItems);
    } catch (error) {
      console.error("Failed to parse stock items from localStorage", error);
      return [];
    }
  });
//toda vez que items mudar, atualiza o local storage
  useEffect(() => {
    localStorage.setItem('react-stock-app', JSON.stringify(items));
  }, [items]);
//passa um item como parametro, cria um novo item com id, createdAt e updatedAt e adiciona no inicio do array
  const addItem = (item) => {
    const newItem = {
      ...item,
      id: Math.floor(Math.random() * 1000000), // ID simples para o exemplo
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setItems(current => [newItem, ...current]);
  };
//procura o item pelo id e retorna o item
  const getItem = (itemId) => {
    // O `+` converte o itemId (que pode ser string da URL) para número
    return items.find(item => item.id === +itemId);
  };
  //procura o item pelo id, se encontrar, atualiza os atributos e a data de atualização
  const updateItem = (itemId, newAttributes) => {
    setItems(current => {
      const itemIndex = current.findIndex(item => item.id === +itemId);
      if (itemIndex === -1) return current;

      const updatedItems = [...current];
      Object.assign(updatedItems[itemIndex], newAttributes, { updatedAt: new Date() });
      return updatedItems;
    });
  };
// delete o item pelo id
  const deleteItem = (itemId) => {
    setItems(current => current.filter(item => item.id !== +itemId));
  };
  
  const stock = {
    items,
    addItem,
    getItem,
    updateItem,
    deleteItem
  };

  return (
    <StockContext.Provider value={stock}>
      {children}
    </StockContext.Provider>
  );
}

