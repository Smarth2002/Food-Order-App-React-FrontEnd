import { createContext, useState } from "react";

export const UserProgressContext = createContext({
    userProgress: 0,
    showCart: () => {},
    hideCart: () => {},
    showCheckout: () => {},
    hideCheckout: () => {},
});

export default function UserProgressContextProvider({ children }) {
    // '' -> no modal, 'cart' -> cart modal, 'checkout' -> form modal, 
    const [userProgress, setUserProgress] = useState('');

    function showCart() {
        setUserProgress('cart');
    }

    function hideCart() {
        setUserProgress('')
    }

    function showCheckout() {
        setUserProgress('checkout');
    }

    function hideCheckout() {
        setUserProgress('')
    }


    // function handleClose() {
    //     setUserProgress(0);
    // }

    const userProgressContext = {
        // userProgress: userProgress,
        userProgress,
        showCart,
        hideCart,
        showCheckout,
        hideCheckout,
    };

    return (
        <UserProgressContext.Provider value={userProgressContext}>
            {children}
        </UserProgressContext.Provider>
    );
}
