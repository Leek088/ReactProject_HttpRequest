import { useState } from 'react';
import { useApiRequest } from './hooks/useApiRequest'
import './App.css';

//Url que contem o caminho para o objeto produto, na API.
const urlApiProduct = "http://localhost:3000/products";

function App() {

    const { data, httpConfig } = useApiRequest(urlApiProduct);

    //Reservado para as chaves do objeto produto
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [available, setAvailable] = useState(false);

    //Responsável por armazenar e alterar o valor
    //da constante "available", no momento da ação
    //do checkbox do formulário
    const handleCheckboxChange = () => {
        setAvailable(!available); // Inverte o valor da constante
    };

    //Responsável por adicionar, via POST, um produto ao banco de dados
    //Após, recupera o produto adicionado e atualiza a lista atual
    const handlePost = async (e) => {
        e.preventDefault();
        const product = {
            name,
            description,
            price,
            available
        };
        httpConfig(product, "POST");
        clearInputs();
    };

    const clearInputs = () => {
        setName("");
        setDescription("");
        setPrice("");
        setAvailable(false);
    };

    return (
        <>
            <h1>Lista de produtos</h1>
            {
                data && data.map((product) => (
                    <div key={product.id}>
                        <h3>{product.name}</h3>
                        <ul>
                            <li>
                                Preço: R$ {product.price}
                            </li>
                            <li>
                                Descrição: {product.description}
                            </li>
                            <li>Disponível:
                                {
                                    product.available ? ("Sim") : ("Não")
                                }
                            </li>
                        </ul>
                    </div>
                ))
            }
            <div className="add-product">
                <form onSubmit={handlePost}>
                    <label>
                        <span>Nome</span>
                        <input
                            name="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        ></input>
                    </label>
                    <label>
                        <span>Descrição</span>
                        <textarea
                            name="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    </label>
                    <label>
                        <span>Preço</span>
                        <input
                            name="price"
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        ></input>
                    </label>
                    <label>
                        <span>Disponível</span>
                        <input
                            name="available"
                            type="checkbox"
                            checked={available}
                            onChange={handleCheckboxChange}
                        ></input>
                    </label>
                    <button>Criar</button>
                </form>
            </div>
        </>
    )
}

export default App
