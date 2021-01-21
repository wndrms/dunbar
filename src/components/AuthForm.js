import React from "react";
import { useHistory } from "react-router-dom";

const AuthForm = () => {
    const history = useHistory();
    const goHome = () => history.push("/");
    return(
        <div id="wrap" className="login">
            <header className="header">
                <div className="header-wrap">
                    <div className="menu-wrap">
                        <h1 className="logo">
                            <button onClick={goHome}><img src={process.env.PUBLIC_URL + "01-logo-01-type-logo-black.svg"} alt="Milleniz"/></button>
                        </h1>
                    </div>
                </div>
            </header>
            <div className="content">
                <div>
                    <button><img src={process.env.PUBLIC_URL + "02-icon-01-outline-arrow-left.svg"} alt="이전으로"/></button>
                    <h2>Welcome to Milleniz :)</h2>
                    <div className="text-box">
                        <p>밀레니즈와 함께 인플루언서의 새로운<br/>영향력을 발견해보세요 🔭</p>
                        <p className="join-us">신규 사용자이신가요?<a>회원가입 하기</a></p>
                    </div>
                    <div className="form-wrap">
                        <div className="form-box">
                            <input
                                type="text"
                                id="user-id"
                                placeholder="ID"
                                className="style-bottom"/>
                            <button></button>
                            <p className="message">올바른 이메일 형식이 아니에요.</p>
                        </div>
                        <div className="form-box">
                            <input
                                type="password"
                                id="user-pw"
                                placeholder="Password"
                                className="style-bottom"/>
                            <button></button>
                            <p className="message">비밀번호가 올바르지 않아요.</p>
                        </div>
                        <div className="check-square form-box">
                            <input type="checkbox" id="id-remember"/>
                            <label for="id-remember">아이디저장</label>
                        </div>
                        <button>로그인 하기 🤝</button>
                        <button className="find-email">🤔계정을 잊으셨나요?</button>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}

export default AuthForm;