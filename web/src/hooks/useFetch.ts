import { useEffect, useState } from "react";
import { Api } from '../Api';
import { ApiMethod } from "../interfaces";


interface useFetchProps {
    url: string
    method?: ApiMethod,
    requestBody?: any
}
export const useFetch = <T>({ method = ApiMethod.GET, url, requestBody }: useFetchProps) => {
    const [data, setData] = useState<T>();
    const [error, setError] = useState<string>("");
    const [isLoading, setIsLoading] = useState(true);

    const getData = async () => {
        const api = new Api();

        try {
            const data = await api.getData<T>(ApiMethod.GET, url);
            setData(data);
        } catch(err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        switch(method) {
            case ApiMethod.GET: 
                getData();
                break;
        }
    }, [])

    return { isLoading, data, error }
}
