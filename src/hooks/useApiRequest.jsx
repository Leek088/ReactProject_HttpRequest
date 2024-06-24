import { useEffect, useState } from "react";

export const useApiRequest = (url) => {
    const [data, setData] = useState(null);
    const [config, setConfig] = useState(null);
    const [method, setMethod] = useState(null);
    const [callFetch, setCallFetch] = useState(false);
    const [loading, setLoading] = useState(false);
    const [idDelete, setIdDelete] = useState("");

    //Na atualização dos dados GET, Insert POST e DELETE
    //será armazenado uma mensagem de erro, caso exista    
    const [error, setError] = useState(null);

    //Responsável por trazer os dados da API.
    //Faz a requisição sempre que a "url" é enviada.
    //Faz a requisição sempre que o "callFeth" é atualizado.
    //Muda o estado do carregamento (true\false)
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await fetch(url);
                const json = await res.json();
                setData(json);
                setMethod(null);
                setLoading(false);
            } catch (error) {
                setError("Não foi possível buscar os dados!");
                console.log(error.message);
            }
        };
        fetchData();
    }, [url, callFetch]);

    //Responsável por gerar a configuração do metodo POST ou DELETE.
    //Após, atualiza a constante "config" com essa configuração.
    //Após, atualiza a constante "method" para POST ou DELETE.
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
        } else if (method === "DELETE") {
            setConfig({
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            setIdDelete(data.id);
            setMethod("DELETE");
        }
    };

    //Responsavel por inserir ou apagar um registro na Api.
    //É acionado sempre que a "config" é atualizada
    //Após, atualiza a constante "callFetch"
    useEffect(() => {
        const httpRequest = async () => {
            try {
                setLoading(true);
                if (method === "POST") {
                    let fetchOptions = [url, config];
                    const res = await fetch(...fetchOptions);
                    const json = await res.json();
                    setCallFetch(json);
                } else if (method === "DELETE") {
                    let fetchOptions = [`${url}/${idDelete}`, config]
                    const res = await fetch(...fetchOptions);
                    const json = await res.json();
                    setCallFetch(json);
                }
                setLoading(false);
            } catch (error) {
                setError("Não foi possível inserir os dados!");
                console.log(error.message);
            }
        };
        httpRequest();
    }, [config]);

    //Retorna registros da API "data".
    //Retorna a função responsável pelo POST "httpConfig".
    //Retorna o estado de carregamento (true\false)
    //Retorna a constante que pode ou não conter erros
    return { data, httpConfig, loading, error };
};