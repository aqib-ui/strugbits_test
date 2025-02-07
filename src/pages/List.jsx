import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const Lists = () => {
    const { weekNumber } = useParams();
    const weekKey = `week${weekNumber}`;
    const [meals, setMeals] = useState([]);

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem("mealPlan")) || {};
        setMeals(storedData[weekKey] || []);
    }, [weekKey]);

    const removeMeal = (mealId) => {
        const storedData = JSON.parse(localStorage.getItem("mealPlan")) || {};
        storedData[weekKey] = storedData[weekKey]?.filter((meal) => meal.id !== mealId) || [];
        localStorage.setItem("mealPlan", JSON.stringify(storedData));
        setMeals(storedData[weekKey]);
    };

    return (
        <div className="week-meals">
            <h2>Meals for Week {weekNumber}</h2>
            {meals.length > 0 ? (
                meals.map((meal) => (
                    <div key={meal.id} className="meal-card">
                        <h3>{meal.name}</h3>
                        <button onClick={() => removeMeal(meal.id)}>Remove</button>
                    </div>
                ))
            ) : (
                <p>No meals added for this week.</p>
            )}
        </div>
    );
};

export default Lists;
