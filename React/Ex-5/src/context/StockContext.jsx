import { createContext, useState } from "react";
import PropTypes from "prop-types"

export const StockContext = createContext({})

StockContextProvider.propTypes = {
    children: PropTypes.node
}

export function StockContextProvider({ children }) {
    const [items, setItems] = useState(() => {
        const storedItems = localStorage.getItem('obc-react-stock')
        if (!storedItems) return []
        const items = JSON.parse(storedItems)
        items.forEach((item) => {
            item.createdAt = new Date(item.createdAt)
            item.updatedAt = new Date(item.updatedAt)
            //as 2 linhas acima convertem as datas que estavam como string em objeto Date novamente
        })
        return items
    })

    const addItem = (item) => {
        setItems(current => {
            const updatedItems = [item, ...current]
            //a linha acima adiciona o novo item no começo do array
            //a linha abaixo atualiza o localStorage com o array atualizado
            localStorage.setItem('obc-react-stock', JSON.stringify(updatedItems))
            return updatedItems
        })
    }

    const getItem = (itemId) => {
        return items.find(i => i.id === +itemId)
    }

    const updateItem = (itemId, newAttributes) => {
        setItems(current => {
            const itemIndex = current.findIndex(i => i.id === itemId)
            const updatedItems = [...current]
            Object.assign(updatedItems[itemIndex], newAttributes, { updatedAt: new Date() })
            localStorage.setItem('obc-react-stock', JSON.stringify(updatedItems))
            return updatedItems
        })
    }

    const deleteItem = (itemId) => {
        setItems(current => {
            const updatedItems = current.filter(item => item.id !== itemId)
            localStorage.setItem('obc-react-stock', JSON.stringify(updatedItems))
            return updatedItems
        })
    }

    const stock = {
        items,
        addItem,
        getItem,
        updateItem,
        deleteItem
    }

    return (
        <StockContext.Provider value={stock}>
            {children}
        </StockContext.Provider>
    )
}