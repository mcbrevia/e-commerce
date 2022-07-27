import background from "./img/contact.jpg";

let monCss = { backgroundImage: `url(${background})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center", display: 'flex',  justifyContent:'center', alignItems:'center', height: "100vh" };

function paiement(props) {
    return (
        <div style={monCss}>
            <table>
                <tbody>
                    <tr>
                        <td>
                            <h1>Merci pour votre commande</h1>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <a href='#' 
                                onClick={() => props.setCurrentPage('ProductList')} className="Tab">
                                Revenir à la boutique
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default paiement;