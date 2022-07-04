import background from "./img/contact.jpg";

let monCss = { backgroundImage: `url(${background})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center", display: 'flex',  justifyContent:'center', alignItems:'center', height: "100vh" };

function FicheContact(props) {
    return (
        <div style={monCss}>
            <table>
                <tbody>
                    <tr>
                        <td>
                            <h1>Pour tout renseignement, veuillez contacter :</h1>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <h2>{props.name}</h2>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <h4>Par téléphone : {props.tel}</h4>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <h4>Par courrier électronique : {props.email}</h4>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <a href='#' 
                                onClick={() => props.setCurrentPage('ProductList')} className="Tab">
                                Revenir à la liste des produits
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
  }

export default FicheContact;
