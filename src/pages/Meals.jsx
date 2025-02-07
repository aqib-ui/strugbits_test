import { useEffect, useState } from "react";
import axios from "axios";
import Modal from "../components/Modal";
import Card from "../components/Card";
import WeekTabs from "../components/Tab";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select } from "@mui/material";

const Meals = () => {
    const [meals, setMeals] = useState([]);
    const [selectedMeals, setSelectedMeals] = useState([]);
    const [activeWeek, setActiveWeek] = useState("all");
    const [weeks, setWeeks] = useState({ week1: [], week2: [], week3: [], week4: [] });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedWeek, setSelectedWeek] = useState("");

    useEffect(() => {
        axios.get("https://dummyjson.com/recipes")
            .then((res) => setMeals(res.data.recipes))
            .catch((err) => console.error(err));

        // Load stored weeks from localStorage
        const storedWeeks = JSON.parse(localStorage.getItem("weeks"));
        if (storedWeeks) setWeeks(storedWeeks);
    }, []);

    const toggleMealSelection = (meal) => {
        setSelectedMeals((prev) =>
            prev.some((m) => m.id === meal.id)
                ? prev.filter((m) => m.id !== meal.id) // Remove if already selected
                : [...prev, meal] // Add if not selected
        );
    };

    const openModal = () => {
        if (selectedMeals.length > 0) {
            setIsModalOpen(true);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedWeek(""); // Reset selected week
    };

    const saveToWeek = () => {
        if (selectedMeals.length > 0 && selectedWeek) {
            // Filter out meals that already exist in the selected week
            const newMeals = selectedMeals.filter(
                (meal) => !weeks[selectedWeek].some((existingMeal) => existingMeal.id === meal.id)
            );

            if (newMeals.length === 0) {
                alert("These meals are already in the selected week!");
                return;
            }

            const updatedWeeks = {
                ...weeks,
                [selectedWeek]: [...weeks[selectedWeek], ...newMeals],
            };

            setWeeks(updatedWeeks);
            localStorage.setItem("weeks", JSON.stringify(updatedWeeks)); // Save to local storage
            setSelectedMeals([]); // Clear selected meals after adding
            closeModal();
        }
    };

    const removeMealFromWeek = (week, mealId) => {
        const updatedWeeks = {
            ...weeks,
            [week]: weeks[week].filter((meal) => meal.id !== mealId),
        };

        setWeeks(updatedWeeks);
        localStorage.setItem("weeks", JSON.stringify(updatedWeeks));
    };

    return (
        <>
            <div className="banner">
                <div className="banner-bg"></div>
                <div className="container-fluid banner-content">
                    <div className="row">
                        <div className="col-md-12">
                            <h1>Optimize Your Meal</h1>
                            <small>Select Meal to Add in Week. You will be able to edit, modify, and change the Meal Weeks.</small>
                        </div>
                    </div>
                </div>
            </div>
            <div className="gredient">
                <Box sx={{ maxWidth: { xs: 380, sm: 770 }, display: 'flex', justifyContent: 'center', overflowX: 'auto' }}>

                    <h1>Week Orders</h1>
                </Box>
            </div>

            {/* Render WeekTabs */}
            <div className="d-flex flex-column">
                <div className="week-tabs">
                    <WeekTabs activeWeek={activeWeek} onSelectWeek={setActiveWeek} />
                </div>
                {/* {selectedMeals.length > 0 && ( */}
                <div className="add-to-week-btn">
                    <button onClick={openModal} disabled={selectedMeals.length === 0}>Add to Week</button>
                </div>
                {/* )} */}
            </div>


            {/* Meal List */}
            <div className="gredient">
                <div className="meal-list">
                    {activeWeek === "all"
                        ? meals.map((meal) => (
                            <Card
                                key={meal.id}
                                meal={meal}
                                isSelected={selectedMeals.some((m) => m.id === meal.id)}
                                toggleMealSelection={toggleMealSelection}
                            />
                        ))
                        : weeks[activeWeek]?.map((meal) => (
                            <Card
                                key={meal.id}
                                meal={meal}
                                isSelected={false}
                                onRemove={() => removeMealFromWeek(activeWeek, meal.id)}
                                isRemovable={true}
                            />
                        ))}
                </div>
            </div>

            <Dialog open={isModalOpen} onClose={closeModal} maxWidth="sm" fullWidth >
                <DialogTitle style={{ fontWeight: "bold", textAlign: "center", paddingTop: "30px" }}>Select  Week</DialogTitle>
                <DialogContent>
                    <div style={{ display: "flex", justifyContent: "space-around", gap: "10px", marginTop: "10px" }}>
                        {["week1", "week2", "week3", "week4"].map((week) => (
                            <Button
                                key={week}
                                variant={selectedWeek === week ? "contained" : "outlined"}
                                style={{ backgroundColor: "whitesmoke", color: "black", border: "0px" }}
                                onClick={() => setSelectedWeek(week)}
                            >
                                {week.replace("week", "Week ")}
                            </Button>
                        ))}
                    </div>
                </DialogContent>
                <DialogActions style={{ textAlign: "center", paddingBottom: "30px", display: "flex", justifyContent: "center" }}>
                    <Button onClick={closeModal} style={{ color: "#175d7f" }}>Cancel</Button>
                    <Button onClick={saveToWeek} disabled={!selectedWeek} style={{ backgroundColor: "#175d7f", color: "white" }} variant="contained">Save</Button>
                </DialogActions>
            </Dialog>

            {/* Add to Week Button */}

        </>
    );
};

export default Meals;
