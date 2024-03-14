import { useCallback, useState } from "react";

async function httpRequest(url, config) {
    const response = await fetch(url, config);
    const resData = await response.json();

    if (!response.ok) {
        // console.log(typeof(resData.message) );
        throw new Error(resData.message);
    }

    return resData;
}

export default function useHttp(defaultValue) {

    const [data, setData] = useState(defaultValue);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    // const sendHttpRequest = useCallback(async function sendHttpRequest(fn, orderData) {
    //     setIsLoading(true);
    //     try {
    //         const data = await fn(orderData);
    //         setData(data);
    //     } catch (error) {
    //         setError(error.message);
    //     }

    //     setIsLoading(false);
    // }, []);

    const sendHttpRequest = useCallback(async function sendHttpRequest(
        url,
        config
    ) {
        setIsLoading(true);
        try {
            const data = await httpRequest(url, config);
            setData(data);
        } catch (error) {
            console.log(error);
            setError(error.message);
        }

        setIsLoading(false);
    },
    []);

    function clearData() {
        setData(defaultValue);
    }

    return {
        data,
        isLoading,
        error,
        sendHttpRequest,
        clearData
    };
}
