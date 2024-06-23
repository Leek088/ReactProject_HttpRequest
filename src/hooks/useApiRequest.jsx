import { useEffect, useState } from "react";

export const useApiRequest = (url) => {
    const [data, setData] = useState(null);

    const [config, setConfig] = useState(null);
    const [method, setMethod] = useState(null);
    const [callFetch, setCallFetch] = useState(false);

    //Responsável por trazer os dados da API.
    //Faz a requisição sempre que a "url" é enviada.
    //Faz a requisição sempre que o "callFeth" é atualizado.
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(url);
            const json = await res.json();
            setData(json);
            setMethod(null);
        };
        fetchData();
    }, [url, callFetch]);

    //Responsável por gerar a configuração do metodo POST.
    //Após, atualiza a constante "config" com essa configuração.
    //Após, atualiza a constante "method" para POST.
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
    //É acionado sempre que a "config" é atualizada
    //Após, atualiza a constante "callFetch"
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