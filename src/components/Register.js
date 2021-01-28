import React, { useState } from "react";

const Register = ({close}) => {
    const [regEmail, setregEmail] = useState("");
    const [error, seterror] = useState(false);
    const [focus, setfocus] = useState(false);
    const [success, setsuccess] = useState(false);
    const onChange = (event) => {
        const {target: {value}} = event;
        setregEmail(value);
        const korean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
        if(value.match(korean)) seterror(true);
        else seterror(false);
    }
    const onSubmit = () => {
        !error && setsuccess(true);
    }
    return(
        <div className="register-popup">
            <div>
                <p className="header">🧐 Register</p>
                <p className="text">원하는 계정을 등록 해주세요,<br/>
                    등록하신 계정 분석을 시작합니다.</p>
                <div className={"form-box" + (focus ? " selected" : "") + (regEmail ? " filled" : "") + (error ? " error" : "") + (success ? " success" : "")}>
                    <input 
                        type="search" 
                        id="register-search"
                        value={regEmail} 
                        onChange={onChange}
                        placeholder="계정 이름"/>
                    <label htmlFor="register-search" className="gray-btn" onClick={onSubmit}>분석하기🔬</label>
                    <button></button>
                    <p className="message">계정은 영문으로만 입력 가능해요</p>
                </div>
                <button className="js-register-close" onClick={close}><img src={process.env.PUBLIC_URL + "02-icon-01-outline-times-red.svg"} alt="닫기"/></button>
            </div>
        </div>
    );
};

export default Register;