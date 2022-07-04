import {useState, useEffect} from 'react';

function Login(props) {

    function verifyLogin(event) {
        event.preventDefault()
        let url="http://localhost:3050/login"
        fetch(url, {
            method: 'post', credentials: 'include',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: event.target[0].value,
                password: event.target[1].value
            })
        })
        .then((res) => {
            props.setLogin(event.target[0].value) 
            props.setCurrentPage('ProductList')
        })
        .catch((err) => {
            console.log(err)
        })
    }

    let formCss = `bg-light border border-dark m-2 p-2 rounded text-left text-black height:100vh`;
    return (
        <div className={formCss}>
            <form id="login" onSubmit={verifyLogin}>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <label htmlform="login">Nom : </label>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input id="login" name="login" />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlform="password">Mot de passe : </label>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input id="password" name="password" />
                            </td>
                        </tr>
                        <tr>
                            <td>
                            <input type="submit" className="btn btn-success" value="Se connecter" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
}

export default Login;