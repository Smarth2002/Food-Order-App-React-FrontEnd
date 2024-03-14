import { useEffect } from "react";
// import { fetchAvailableMeals } from "../http";
import MealItem from "./MealItem";
import useHttp from "../hooks/useHttp";
import Error from "./Error";

export default function AvailableMeals() {
    const { data: meals, isLoading, error, sendHttpRequest } = useHttp([]);

    useEffect(() => {
        // sendHttpRequest(fetchAvailableMeals);
        sendHttpRequest("https://food-order-app-backend-98hr.onrender.com/meals");
    }, [sendHttpRequest]);

    if (isLoading) return <p className="center">Fetching meals...</p>;

    if (error)
        return <Error title="Failed to fetch meals" message={error} />;

    return (
        <ul id="meals">
            {meals.map((meal) => {
                return <MealItem key={meal.id} meal={meal} />;
            })}
        </ul>
    );
}
