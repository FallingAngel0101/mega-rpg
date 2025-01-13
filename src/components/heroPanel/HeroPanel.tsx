import React, { useState } from 'react';
import './HeroPanel.css';

interface HeroPanelProps {
    id: string;
    onSave: (data: CardData) => void;
    onReset: (id: string) => void;
}

interface CardData {
    id: string;
    name: string;
    health: number;
    power: number;
    class: string;
    weapon: string;
}

const Weapons = {
    Knight: [
        { name: "Меч Света", damageBonus: 3, description: "Священный меч, наносящий дополнительный урон нежити." },
        { name: "Топор Разрушителя", damageBonus: 5, description: "Мощный топор, разрушающий доспехи врагов." },
        { name: "Копье Ветра", damageBonus: 4, description: "Легкое копье, позволяющее атаковать на расстоянии." }
    ],
    Archer: [
        { name: "Лук Теней", damageBonus: 3, description: "Лук, стрелы которого невидимы в полете." },
        { name: "Арбалет Смерти", damageBonus: 5, description: "Тяжелый арбалет, пробивающий броню." },
        { name: "Лук Льда", damageBonus: 4, description: "Лук, замораживающий врагов." }
    ],
    Mage: [
        { name: "Посох Огня", damageBonus: 3, description: "Посох, усиливающий огненные заклинания." },
        { name: "Жезл Молний", damageBonus: 5, description: "Жезл, вызывающий мощные молнии." },
        { name: "Книга Тьмы", damageBonus: 4, description: "Книга, открывающая доступ к темной магии." }
    ]
};

type ClassType = keyof typeof Weapons;

const HeroPanel: React.FC<HeroPanelProps> = ({ id, onSave, onReset }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [name, setName] = useState('');
    const [health, setHealth] = useState('');
    const [power, setPower] = useState('');
    const [selectedClass, setSelectedClass] = useState<ClassType>('Knight');
    const [selectedWeapon, setSelectedWeapon] = useState('');
    const [isFilled, setIsFilled] = useState(false);

    const handlePlusClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSave = () => {
        if (name.trim() && health.trim() && power.trim() && selectedWeapon) {
            const newCard = {
                id,
                name,
                health: parseInt(health, 10),
                power: parseInt(power, 10),
                class: selectedClass,
                weapon: selectedWeapon,
            };
            onSave(newCard);
            setIsFilled(true);
            setIsModalOpen(false);
        } else {
            alert("Заполните все поля!");
        }
    };

    const handleReset = () => {
        onReset(id);
        setName('');
        setHealth('');
        setPower('');
        setSelectedClass('Knight');
        setSelectedWeapon('');
        setIsFilled(false);
    };

    const handleClassChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedClass(e.target.value as ClassType);
        setSelectedWeapon('');
    };

    const handleWeaponChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedWeapon(e.target.value);
    };

    const handleHealthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value === "") {
            setHealth("");
        } else if (/^\d*$/.test(value)) {
            const numericValue = parseInt(value, 10);
            if (numericValue <= 100) {
                setHealth(value);
            } else {
                setHealth("100");
            }
        }
    };

    const handlePowerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value === "") {
            setPower("");
        } else if (/^\d*$/.test(value)) {
            const numericValue = parseInt(value, 10);
            if (numericValue <= 10) {
                setPower(value);
            } else {
                setPower("10");
            }
        }
    };

    return (
        <div className={`hero-panel ${isFilled ? "filled" : ""}`} id={id}>
            {isFilled ? (
                <>
                    <div className="panel-content">
                        <h3>{name}</h3>
                        <p>Здоровье: {health}</p>
                        <p>Сила: {power}</p>
                        <p>Класс: {selectedClass}</p>
                        <p>Оружие: {selectedWeapon}</p>
                    </div>
                    <button className="close-button" onClick={handleReset}>
                        ×
                    </button>
                </>
            ) : (
                <button className="plus-button" onClick={handlePlusClick}>
                    +
                </button>
            )}

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h2>Заполните данные</h2>
                        <input
                            type="text"
                            placeholder="Имя"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            type="number"
                            placeholder="Здоровье (макс. 100)"
                            value={health}
                            onChange={handleHealthChange}
                        />
                        <input
                            type="number"
                            placeholder="Сила (макс. 10)"
                            value={power}
                            onChange={handlePowerChange}
                        />
                        <select value={selectedClass} onChange={handleClassChange}>
                            <option value="Knight">Knight</option>
                            <option value="Archer">Archer</option>
                            <option value="Mage">Mage</option>
                        </select>
                        <select value={selectedWeapon} onChange={handleWeaponChange}>
                            <option value="">Выберите оружие</option>
                            {Weapons[selectedClass].map((weapon, index) => (
                                <option key={index} value={weapon.name}>
                                    {weapon.name}
                                </option>
                            ))}
                        </select>
                        <button className="save-button" onClick={handleSave}>
                            Готово
                        </button>
                        <button className="cancel-button" onClick={handleCloseModal}>
                            Отмена
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HeroPanel;