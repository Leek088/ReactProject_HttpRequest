import { useEffect, useState } from "react";

export const useApiRequest = (url) => {
    const [data, setData] = useState(null);

    const [config, setConfig] = useState(null);
    const [method, setMethod] = useState(null);
    const [callFetch, setCallFetch] = useState(false);

    //Respons�vel por trazer os dados da API.
    //Faz a requisi��o sempre que a "url" � enviada.
    //Faz a requisi��o sempre que o "callFeth" � atualizado.
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(url);
            const json = await res.json();
            setData(json);
            setMethod(null);
        };
        fetchData();
    }, [url, callFetch]);

    //Respons�vel por gerar a configura��o do metodo POST.
    //Ap�s, atualiza a constante "config" com essa configura��o.
    //Ap�s, atualiza a constante "method" para POST.
    const httpConfig = (data, method) => {
        if (method === "POST") {
            setConfig({
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            setMethod("POST");
        }
    };

    //Responsavel por inserir um registro na Api.
    //� acionado sempre que a "config" � atualizada
    //Ap�s, atualiza a constante "callFetch"
    useEffect(() => {
        const httpRequest = async () => {
            if (method === "POST") {
                let fetchOptions = [url, config];
                const res = await fetch(...fetchOptions);
                const json = await res.json();
                setCallFetch(json);
            }
        };
        httpRequest();
    }, [config]);

    return { data, httpConfig };
};