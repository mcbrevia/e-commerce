import React from "react";
import background from "./img/shopping.png";

function Welcome(props) {
    let monCss = { backgroundImage: `url(${background})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center", display: 'flex',  justifyContent:'center', alignItems:'center', height: "100vh" };

  return (
    <div style={monCss}>
      <table className="bg-light border border-dark m-2 p-2 rounded">
        <tbody>
          <tr>
            <td>
              <h1>Bienvenue dans votre site d'achat en ligne !</h1>
            </td>
          </tr>
          <tr>
            <td>
              <a href='#' 
                  onClick={() => props.setCurrentPage('Login')}>
                  Entrez dans la boutique
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

  export default Welcome;