export async function fetchAvailableMeals() {
    const response = await fetch("http://localhost:3000/meals");
    const availableMeals = await response.json();

    if(!response.ok){
        // 
    }

    return availableMeals;
}

export async function submitOrderDetails(orderDetails) {
    const response = await fetch("http://localhost:3000/orders", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ order: orderDetails }),
    });

    const resData = await response.json();
    return resData;
}
