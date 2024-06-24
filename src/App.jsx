import { useState } from 'react';
import { useApiRequest } from './hooks/useApiRequest'
import './App.css';

//Url da Api que contem os registros dos produtos.
const urlApiProduct = "http://localhost:3000/products";

function App() {

    //Recupeara, no carregamento da página, 
    //os produtos, a função de Post e o estado de carregamento.
    const { data, httpConfig, loading, error } = useApiRequest(urlApiProduct);

    //Reservado para as chaves do objeto produto
    const [id, setId] = useState("");
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
    //Utiliza a função httpConfig, passando o objeto e o metodo.
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

    //Responsável por remover o produto pelo id digitado
    //Utiliza a função httpConfig, passando o objeto e o metodo.
    const handleDelete = async (e) => {
        e.preventDefault();
        const product = { id };
        httpConfig(product, "DELETE");
        clearInputs();
    }

    //Limpa os inputs do formulário
    const clearInputs = () => {
        setId("");
        setName("");
        setDescription("");
        setPrice("");
        setAvailable(false);
    };

    return (
        <>
            <h1>Lista de produtos</h1>
            {
                loading ? (<div>Carregando....</div>)
                    : (
                        data && data.map((product) =>
                        (
                            <div key={product.id}>
                                <h3>{product.name}</h3>
                                <ul>
                                    <li>
                                        Id: {product.id}
                                    </li>
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
                            </div>)
                        )
                    )
            }
            {error && <div>{error}</div>}
            <div className="add-product">
                <h4>Adicionar Produto</h4>
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
                    {loading
                        ? (<button type="button" disabled>Aguarde</button>)
                        : (<button>Criar</button>)
                    }
                </form>
            </div>
            <br></br>
            <div className="add-product">
                <form onSubmit={handleDelete}>
                    <h4>Deletar produto</h4>
                    <label>
                        <input
                            name="id"
                            type="text"
                            placeholder="digite o id para excluir."
                            onChange={(e) => setId(e.target.value)}
                        >
                        </input>
                    </label>
                    <input type="submit" value="Deletar produto"></input>
                </form>
            </div>
        </>
    )
}

export default App
