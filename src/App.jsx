// Add components for displaying products, the cart (in a modal) and a checkout form (also in a modal)

// Fetch the (dummy) meals data from the backend & show it on the screen (GET/meals)

// Allow users to add & remove products to/from the cart

// Send cart data along with user data (full name, email, street, postal code, city) to the backend (POST/orders)

// Handle loading & error states

import AvailableMeals from "./components/AvailableMeals";
import Cart from "./components/Cart";
import CheckoutForm from "./components/CheckoutForm";
import Header from "./components/Header";
import CartContextProvider from "./store/CartContext";
import UserProgressContextProvider from "./store/UserProgressContext";

function App() {
    return (
        <CartContextProvider>
            <UserProgressContextProvider>
                <Header />
                <Cart />
                <CheckoutForm />
            </UserProgressContextProvider>
            <AvailableMeals />
        </CartContextProvider>
    );
}

export default App;
