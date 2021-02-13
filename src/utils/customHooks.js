import { useState } from 'react';

export const useError = (initState) => {
    const [error, setError] = useState(initState);

    const setErr = (msg) => {
        setError(msg);
        setTimeout(() => {
            setError(null)
        }, 2000 )
    }

    const service = {
        setErr
    }

    return [
        error, service
    ]
}