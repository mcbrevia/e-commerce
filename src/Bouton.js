import React from "react";

const Bouton = props => {
    const btnCss = `btn ${props.typeBtn}`;
  return (
    <button
      className={props.typeBtn}
      onClick={() => props.click()}
    >
      {props.children}
    </button>
  );
}

export default Bouton;