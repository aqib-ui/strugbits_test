import React from "react";
import MuiCard from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";

const Card = ({ meal, isSelected, toggleMealSelection, isRemovable, onRemove }) => {
    return (
        <MuiCard
            onClick={() => toggleMealSelection && toggleMealSelection(meal)}
            sx={{
                width: 345,
                borderRadius: 3,
                boxShadow: 3,
                marginTop: "20px",
                marginBottom: "20px",
                cursor: toggleMealSelection ? "pointer" : "default",
                border: isSelected ? "3px solid #175d7f" : "3px solid transparent",
                transition: "0.3s",
                "&:hover": { transform: "scale(1.02)" }
            }}
        >
            <Box sx={{ position: "relative", padding: "15px" }}>
                <CardMedia
                    component="img"
                    height="200"
                    image={meal.image}
                    alt={meal.name}
                    sx={{ borderRadius: "12px" }}
                />
                <Chip
                    label={meal.mealType[0]}
                    sx={{
                        position: "absolute",
                        top: 30,
                        right: 20,
                        backgroundColor: "black",
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "12px",
                        borderRadius: "5px",
                        height: "20px",
                        width: "85px"
                    }}
                />
            </Box>
            <CardContent sx={{ display: "flex", flexDirection: "column", minHeight: "200px" }}>
                <Typography variant="h6" fontWeight="bold">
                    {meal.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1, marginBottom: 1 }}>
                    {meal.instructions[0]}
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto" }}>
                    <Typography variant="body2" color="text.black">
                        <strong style={{ fontSize: "12px" }}>Cuisine: </strong>{meal.cuisine}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <strong>Rating: </strong>{meal.rating} <Rating style={{ color: "#175d7f", fontSize: "18px" }} value={meal.rating} precision={0.5} readOnly />
                    </Box>
                </Box>
            </CardContent>
            {isRemovable && (
                <Button variant="contained" color="error" onClick={onRemove} sx={{ margin: "10px" }}>
                    Remove
                </Button>
            )}
        </MuiCard>
    );
};

export default Card;
