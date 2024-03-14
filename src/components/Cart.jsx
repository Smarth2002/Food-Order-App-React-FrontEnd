// import { useEffect, useRef } from "react";
// import { createPortal } from "react-dom";

import { useContext } from "react";
import { CartContext } from "../store/CartContext";
import { UserProgressContext } from "../store/UserProgressContext";
import Modal from "./UI/Modal";
import { currencyFormatter } from "../util/formatting";
import Button from "./UI/Button";
import CartItem from "./CartItem";

export default function Cart() {

    const { cartItems, addItem, removeItem } = useContext(CartContext);
    const { userProgress, hideCart, showCheckout } =
        useContext(UserProgressContext);

    const cartTotal = cartItems.reduce((acc, item) => {
        return acc + item.price * item.quantity;
    }, 0);

    function handleCheckout() {
        showCheckout();
    }

    function handleCloseCart() {
        hideCart();
    }

    return (
        // passed modal component handleCloseCart only when we are rendering Cart modal, otherwise 
        // if we go to checkout in Cart component and userProgress='checkout' then Cart Modal still closes
        // but this time we dont need to update the userProgress state to '' on closing Cart Modal
        // so we dont pass handleCloseCart if we ourself close modal(Cart) and not use Esc key
        <Modal
            open={userProgress === "cart"}
            onClose={userProgress === "cart" ? handleCloseCart : null}
            className="cart"
        >
            <h2>Your Cart</h2>

            <ul>
                {cartItems.length !== 0 &&
                    cartItems.map((cartItem) => {
                        return (
                            <CartItem
                                key={cartItem.id}
                                item={cartItem}
                                onIncrease={() => addItem(cartItem)}
                                onDecrease={() => removeItem(cartItem.id)}
                            />
                        );
                    })}
            </ul>
            <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>

            <p className="modal-actions">
                <Button textOnly onClick={handleCloseCart}>
                    Close
                </Button>

                {cartItems.length !== 0 && (
                    <Button onClick={handleCheckout}>Checkout</Button>
                )}
            </p>
        </Modal>
    );
}
