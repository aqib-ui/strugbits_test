import { useState } from "react";

const Modal = ({ meal, onClose }) => {
    const [selectedWeek, setSelectedWeek] = useState("week1");

    const addToWeek = () => {
        let storedData = JSON.parse(localStorage.getItem("mealPlan")) || {};
        if (!storedData[selectedWeek]) storedData[selectedWeek] = [];

        if (!storedData[selectedWeek].find((m) => m.id === meal.id)) {
            storedData[selectedWeek].push(meal);
            localStorage.setItem("mealPlan", JSON.stringify(storedData));
        } else {
            alert("Meal already added to this week!");
        }
        onClose();
    };

    return (
        <div className="modal">
            <h2>Select a Week</h2>
            <select onChange={(e) => setSelectedWeek(e.target.value)}>
                <option value="week1">Week 1</option>
                <option value="week2">Week 2</option>
                <option value="week3">Week 3</option>
                <option value="week4">Week 4</option>
            </select>
            <button onClick={addToWeek}>Save</button>
            <button onClick={onClose}>Cancel</button>
        </div>
    );
};

export default Modal;
