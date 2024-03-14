import { createContext, useReducer } from "react";

export const CartContext = createContext({
    cartItems: [],
    addItem: () => {},
    removeItem: () => {},
    clearCart: () => {},
});

function cartReducer(state, action) {
    if (action.type === "ADD_ITEM") {
        const orderIdx = state.items.findIndex(
            (cartItem) => cartItem.id === action.item.id
        );

        let newItems = [...state.items];

        if (orderIdx !== -1) {
            const prevOrder = state.items[orderIdx];
            let newOrder = { ...prevOrder, quantity: prevOrder.quantity + 1 };

            newItems[orderIdx] = newOrder;
        } else {
            const newOrder = {
                ...action.item,
                quantity: 1,
            };

            newItems.push(newOrder);
        }

        return { ...state, items: newItems };
    }

    if (action.type === "REMOVE_ITEM") {
        const orderIdx = state.items.findIndex(
            (cartItem) => cartItem.id === action.id
        );

        let newItems = [...state.items];
        const orderDetails = state.items[orderIdx];

        if (orderDetails.quantity === 1) {
            newItems.splice(orderIdx, 1);
        } else {
            const newOrder = {
                ...orderDetails,
                quantity: orderDetails.quantity - 1,
            };
            newItems[orderIdx] = newOrder;
        }

        return { ...state, items: newItems };
    }

    if (action.type === "CLEAR_CART") {
        return {
            ...state,
            items: [],
        };
    }

    return state;
}

export default function CartContextProvider({ children }) {
    const [cart, dispatchCartAction] = useReducer(cartReducer, {
        items: [],
    });

    function addItem(item) {
        dispatchCartAction({
            type: "ADD_ITEM",
            item,
        });
    }

    function removeItem(id) {
        dispatchCartAction({
            type: "REMOVE_ITEM",
            id,
        });
    }

    function clearCart() {
        dispatchCartAction({
            type: "CLEAR_CART",
        });
    }

    const cartContext = {
        cartItems: cart.items,
        addItem,
        removeItem,
        clearCart
    };

    return (
        <CartContext.Provider value={cartContext}>
            {children}
        </CartContext.Provider>
    );
}
