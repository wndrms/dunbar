import React, { useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";
import AOS from "aos";
import { Link, useHistory } from "react-router-dom";
import CountUp from "react-countup";

const Main = () => {
    const history = useHistory();
    const goHome = () => history.push("/");
    useEffect(() => {
        AOS.init();
    }, [])
    return(
        <div className="free wrap main-page">
            <Header goHome={goHome}/>
            <div className="container">
                <div className="main">
                    <div className="text-box">
                        <p>현재 가장 인기 있는<br/>인플루언서를<br/>찾아보세요.</p>
                        <div className="btn-wrap">
                            <a className="gray-btn">Sign up for free</a>
                            <a className="gray-btn">Contact us</a>
                        </div>
                    </div>
                    <a><img src={process.env.PUBLIC_URL + "02-icon-01-outline-chevron-down.svg"} alt=""/></a>
                </div>
                <div className="data-num">
                    <p data-aos="fade-up" data-aos-delay="0" data-aos-duration="1000">
                        <span className="counter01"><CountUp end={181647}/></span><span>건</span>&nbsp;데이터 수집
                    </p>
                    <p data-aos="fade-up" data-aos-delay="200" data-aos-duration="1000">
                        <span className="counter02"><CountUp end={2486}/></span><span>명</span>&nbsp;검증된 인플루언서</p>
                    <a data-aos="fade-up" data-aos-delay="300" data-aos-duration="1000" className="go-page">데이터 확인하러 가기</a>
                    <p data-aos="fade-up" data-aos-delay="400" data-aos-duration="1000">2021년 1월 기준</p>
                </div>
                <div className="simple" data-aos="fade-up">
                    <div className="flex-box">
                        <div className="text-box">
                            <h3>간편하게 찾고<br/>세심하게 살펴보기</h3>
                            <p>범위를 설정하고 검색 해보세요,<br/>
                                원하는 조건의 인플루언서를 찾아볼 수 있습니다.</p>
                            <a className="go-page">조건 검색하러 가기</a>
                        </div>
                        <figure><img src={process.env.PUBLIC_URL + "group.svg"} alt=""/></figure>
                    </div>
                </div>
                <div className="register">
                    <div className="flex-box" data-aos="fade-up">
                        <div className="text-box">
                            <h3>새로운 계정 등록<br/>데이터 분석 시작</h3>
                            <p>파악하고 싶은 계정,<br/>
                                등록 이후 바로 데이터 분석을 시작합니다.</p>
                            <a className="go-page">Go to Register</a>
                        </div>
                        <figure><img src={process.env.PUBLIC_URL + "register-1.svg"} alt=""/></figure>
                    </div>
                </div>
                <div className="real-time">
                    <div className="flex-box" data-aos="fade-up">
                        <div className="text-box">
                            <h3>새로운 계정 등록<br/>데이터 분석 시작</h3>
                            <p>파악하고 싶은 계정,<br/>
                                등록 이후 바로 데이터 분석을 시작합니다.</p>
                            <a className="go-page">Go to Register</a>
                        </div>
                        <figure><img src={process.env.PUBLIC_URL + "list-group.jpg"} alt=""/></figure>
                    </div>
                </div>
                <div className="chart">
                    <div className="flex-box" data-aos="fade-up">
                        <div className="text-box">
                            <h3>관심있는 인물은<br/>더 자세히<br/>살펴보세요</h3>
                            <ul>
                                <li className="on" data-chart="trend-flow">Followers</li>
                                <li data-chart="likes-flow">Likes Flow</li>
                            </ul>
                            <p>그래프를 통해 최근 팔로워 추세 흐름을 파악하세요.</p>
                        </div>
                        <figure><img src={process.env.PUBLIC_URL + "likes-flow.svg"} alt=""/></figure>
                    </div>
                </div>
                <div className="dunbar">
                    <h3>밀레니즈는 던바를 통해<br/>뭐아러아러 추구합니다.</h3>
                    <Link to="/login" className="gray-btn">
                        Log in🤝
                    </Link>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default Main;