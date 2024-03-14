import { useContext } from "react";
import { UserProgressContext } from "../store/UserProgressContext";
// import { submitOrderDetails } from "../http";
import { CartContext } from "../store/CartContext";
import Modal from "./UI/Modal";
import { currencyFormatter } from "../util/formatting";
import Input from "./UI/Input";
import Button from "./UI/Button";
import useHttp from "../hooks/useHttp";
import Error from "./Error";

export default function CheckoutForm() {
    const { data, isLoading: isSending, error, sendHttpRequest, clearData } = useHttp();

    const { userProgress, hideCheckout } = useContext(UserProgressContext);
    const { cartItems, clearCart } = useContext(CartContext);

    const cartTotal = cartItems.reduce((acc, item) => {
        return acc + item.price * item.quantity;
    }, 0);

    function handleClose() {
        hideCheckout();
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const formEntries = Object.fromEntries(formData.entries());
        // console.log(formEntries);

        const orderDetails = {
            items: cartItems,
            customer: formEntries,
        };

        // console.log(orderDetails);

        // sendHttpRequest(submitOrderDetails, orderDetails)
        sendHttpRequest("https://food-order-app-backend-98hr.onrender.com/orders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ order: orderDetails }),
        });

        // onSubmitForm();
    }

    function handleFinish() {
        hideCheckout();
        clearCart();
        clearData();
    }

    let actions = (
        <>
            <Button type="button" textOnly onClick={handleClose}>
                Close
            </Button>
            <Button>Submit Order</Button>
        </>
    );

    if (isSending) actions = <span>Sending order...</span>;

    if (data)
        return (
            <Modal open={userProgress === "checkout"} onClose={handleFinish}>
                <h2>Success</h2>
                <p>Your order was submitted successfully...</p>
                <p>
                    We will get back to you with more details via email within
                    new few minutes
                </p>

                <p className="modal-actions">
                    <Button onClick={handleFinish}>Okay</Button>
                </p>
            </Modal>
        );

    return (
        <Modal open={userProgress === "checkout"} onClose={handleClose}>
            <form onSubmit={handleSubmit}>
                <h2>Checkout</h2>
                <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>

                <Input label="Full Name" type="text" id="name" />

                <Input label="E-Mail Address" type="email" id="email" />

                <Input label="Street" type="text" id="street" />

                <div className="control-row">
                    <Input label="Postal Code" type="text" id="postal-code" />
                    <Input label="City" type="text" id="city" />
                </div>

                {error && (
                    <Error title="Failed to submit info..." message={error} />
                )}

                <p className="modal-actions">{actions}</p>
            </form>
        </Modal>
    );
}
