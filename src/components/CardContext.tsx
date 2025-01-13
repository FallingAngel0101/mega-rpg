import React, { createContext, useState, ReactNode } from "react";

interface CardData {
    id: string;
    name: string;
    health: number;
    power: number;
    class: string;
    weapon: string;
}

interface CardContextType {
    cards: CardData[];
    addCard: (card: CardData) => void;
    removeCard: (id: string) => void;
}

const CardContext = createContext<CardContextType | undefined>(undefined);

export const CardProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cards, setCards] = useState<CardData[]>([]);

    const addCard = (card: CardData) => {
        setCards((prevCards) => {
            const newCards = [...prevCards, card];
            console.log("Карточка добавлена. Текущий список карточек:", newCards); // Логирование
            return newCards;
        });
    };

    const removeCard = (id: string) => {
        setCards((prevCards) => {
            const newCards = prevCards.filter((card) => card.id !== id);
            console.log("Карточка удалена. Текущий список карточек:", newCards); // Логирование
            return newCards;
        });
    };

    return (
        <CardContext.Provider value={{ cards, addCard, removeCard }}>
            {children}
        </CardContext.Provider>
    );
};

export default CardContext;