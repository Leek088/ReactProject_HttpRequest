import { useState, useEffect } from 'react';
import './App.css';

//Url que contem o caminho para o objeto produto, na API.
const urlApiProduct = "http://localhost:3000/products";

function App() {
    //Reservado para armazenar o objeto produto, no banco de dados
    const [products, setProducts] = useState([]);

    //Reservado para as chaves do objeto produto
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [available, setAvailable] = useState(false);

    //Responsável por buscar o objeto produto, via Http GET na API.
    useEffect(() => {
        async function fetchData() {
            const res = await fetch(urlApiProduct);
            const data = await res.json();
            setProducts(data);
        }
        fetchData();
    }, []);

    //Responsável por armazenar e alterar o valor
    //da da constante available, no momento da ação
    //do checkbox do formulário
    const handleCheckboxChange = () => {
        setAvailable(!available); // Inverte o valor da constante
    };

    //Responsávle por enviar, via POST, e adiciar mais um item
    //ao objeto produto, no banco de dados
    const handleSubmit = async (e) => {
        e.preventDefault();

        const product = {
            name,
            description,
            price,
            available
        };

        const res = await fetch(urlApiProduct, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(product)
        });

        const addedProduct = await res.json();
        setProducts((prevProducts) => [...prevProducts, addedProduct]);
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
                products.map((product) => (
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
                <form onSubmit={handleSubmit}>
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
