function nutrientsTotalPerTime(foodData) {
    const nutrients = {
        calories: 0,
        carbohydrates: 0,
        protein: 0,
        fat: 0,
    };

    if (foodData) {
        foodData.forEach(dish => {
            nutrients.calories = parseFloat((nutrients.calories + dish.calories).toFixed(0));
            nutrients.carbohydrates = parseFloat((nutrients.carbohydrates + dish.carbohydrates).toFixed(2));
            nutrients.protein = parseFloat((nutrients.protein + dish.protein).toFixed(2));
            nutrients.fat = parseFloat((nutrients.fat + dish.fat).toFixed(3));
        });
    }

    return nutrients;
}

module.exports = { nutrientsTotalPerTime };
