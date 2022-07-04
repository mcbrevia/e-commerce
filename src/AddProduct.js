function NewProduct(event){
    event.preventDefault()

    let url="http://localhost:3050/new-product"
    fetch(url, {
        method: 'post',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: event.target[0].value,
            description: event.target[1].value,
            price: event.target[2].value,
            url: event.target[3].value
        })
    })
    .then((res) => {
        console.log(res)
    })

}

function ModifyNameProduct(event){
    console.log(event.target.value)
}

function AddProduct(props) {
    let formCss = `bg-light border border-dark m-2 p-2 rounded text-left text-black height:100vh`;
    return (
        <div className={formCss}>
            <form id="newProduct" onSubmit={NewProduct}>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <label htmlform="nom">Nom du produit</label>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input id="nom" name="nom" onChange={ModifyNameProduct} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlform="description">Description</label>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input id="description" name="description" />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlform="price">Prix</label>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input id="price" name="price" />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlform="url">Url de l'image</label>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input id="url" name="url" />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <input type="submit" className="btn btn-success" value="Créer nouveau Produit" />
            </form>
        </div>
    );
  }

export default AddProduct;
