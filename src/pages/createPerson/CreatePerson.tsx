import React, { useContext } from 'react';
import CardContext from '../../components/CardContext';
import HeroPanel from '../../components/heroPanel/HeroPanel';
import './CreatePerson.css';

// Определяем CardData в текущем файле
interface CardData {
    id: string;
    name: string;
    health: number;
    power: number;
    class: string;
    weapon: string;
}

const CreatePerson: React.FC = () => {
    const { addCard, removeCard } = useContext(CardContext)!;

    const handleSave = (data: CardData) => {
        console.log("Данные для сохранения:", data); // Логирование
        addCard(data);
    };

    const handleReset = (id: string) => {
        console.log("Карточка с ID удалена:", id); // Логирование
        removeCard(id);
    };

    return (
        <div className="createHero">
            <HeroPanel
                id="panel-1"
                onSave={handleSave}
                onReset={handleReset}
            />
            <HeroPanel
                id="panel-2"
                onSave={handleSave}
                onReset={handleReset}
            />
            <HeroPanel
                id="panel-3"
                onSave={handleSave}
                onReset={handleReset}
            />
            <HeroPanel
                id="panel-4"
                onSave={handleSave}
                onReset={handleReset}
            />
        </div>
    );
};

export default CreatePerson;