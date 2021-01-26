import React from "react";
import { useHistory } from "react-router-dom";
import Popup from "reactjs-popup";
import Search from "./Search";

const Header = ({goHome}) => {
    const history = useHistory();
    return(
        <header className="header fix">
            <div className="header-wrap">
                <div className="menu-wrap">
                    <h1 className="logo">
                        <button onClick={goHome}><img src={process.env.PUBLIC_URL + "01-logo-01-type-logo-black.svg"} alt="Milleniz"/></button>
                    </h1>
                    <ul>
                        <li><button onClick={() => {history.push("/")}}>Home</button></li>
                        <li><button onClick={() => {history.push("/influencer")}}>Influencer</button></li>
                    </ul>
                </div>
                <div className="login-wrap">
                    <Popup
                        trigger={<button className="js-search-btn-on"><img src={process.env.PUBLIC_URL + "02-icon-01-outline-search.svg"} alt="search"/></button>}
                        modal>
                        {close => (
                            <Search close={close}/>
                        )}
                    </Popup>
                    <button className="gray-btn" onClick={() => {history.push("/login")}}>Log in🤝</button>
                </div>
            </div>
        </header>
    )
}

export default Header;