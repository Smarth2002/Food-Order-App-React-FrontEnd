import { useContext } from "react";
import foodImg from "../assets/logo.jpg";
import { CartContext } from "../store/CartContext";
import { UserProgressContext } from "../store/UserProgressContext";
import Button from "./UI/Button";

export default function Header() {
    const { cartItems } = useContext(CartContext);
    const { showCart } = useContext(UserProgressContext);

    const totalItems = cartItems.reduce((total, item) => {
        return total + item.quantity;
    }, 0);

    function handleShowCart() {
        showCart();
    }

    return (
        <header id="main-header">
            <div id="title">
                <img src={foodImg} alt="food-img" />
                <h1>FOOD ORDER APP</h1>
            </div>
            <nav>
                <Button textOnly onClick={handleShowCart}>
                    Cart ({totalItems})
                </Button>
            </nav>
        </header>
    );
}
