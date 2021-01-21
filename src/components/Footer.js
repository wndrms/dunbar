import React from "react";

const Footer = () => {
    return(
        <footer className="footer">
            <div className="footer-wrap">
                <h1 className="logo"><img src={process.env.PUBLIC_URL + "01-logo-01-type-logo-black.svg"} alt="Milleniz"/></h1>
                <p className="info">
                    (주)밀레니즈<br/>대표이사 이천  |  개인정보책임자<br/>사업자등록번호 343-10-01394<br/>통신판매업신고번호 제 2020-서울성동-01762호
                </p>
                <p>서울특별시 성북구 길음로7길 20, 서울미디어랩 밀레니즈</p>
                <p className="link-wrap">
                    <a href="mailto:contact@milleniz.com">contact@milleniz.com</a>
                    <a>이용약관 및 개인정보보호</a>
                </p>
            </div>
        </footer>
    );
}

export default Footer;