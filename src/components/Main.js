import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import AOS from "aos";
import { Link, useHistory } from "react-router-dom";
import CountUp from "react-countup";

const Main = ({InfluencerArray, raisingArray}) => {
    const history = useHistory();
    const [flow, setflow] = useState(true);
    const [check, setcheck] = useState(false);
    const goHome = () => history.push("/");
    useEffect(() => {
        window.scrollTo(0, 0);
        
        AOS.init();
    }, []);
    const goTop = () => window.scrollTo(0, 0);
    return(
        <div className="free wrap main-page">
            <Header goHome={goHome} InfluencerArray={InfluencerArray} raisingArray={raisingArray}/>
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
                <div className="simple">
                    <div className="flex-box">
                        <div className="text-box">
                            <h3 data-aos="fade-up" data-aos-delay="0" data-aos-duration="1000">
                                간편하게 찾고<br/>세심하게 살펴보기</h3>
                            <p data-aos="fade-up" data-aos-delay="200" data-aos-duration="1000">범위를 설정하고 검색 해보세요,<br/>
                                원하는 조건의 인플루언서를 찾아볼 수 있습니다.</p>
                            <a data-aos="fade-up" data-aos-delay="300" data-aos-duration="1000" className="go-page">조건 검색하러 가기</a>
                        </div>
                        <figure data-aos="fade-up" data-aos-duration="40000"><img src={process.env.PUBLIC_URL + "search-l.gif"} alt=""/></figure>
                    </div>
                </div>
                <div className="register">
                    <div className="flex-box">
                        <div className="text-box">
                            <h3 data-aos="fade-up" data-aos-delay="0" data-aos-duration="1000">
                                새로운 계정 등록<br/>데이터 분석 시작</h3>
                            <p data-aos="fade-up" data-aos-delay="200" data-aos-duration="1000">파악하고 싶은 계정,<br/>
                                등록 이후 바로 데이터 분석을 시작합니다.</p>
                            <a data-aos="fade-up" data-aos-dealy="300" data-aos-duration="1000" className="go-page">계정 등록하러 가기</a>
                        </div>
                        <figure data-aos="fade-up" data-aos-duration="40000"><img src={process.env.PUBLIC_URL + "register-l.gif"} alt=""/></figure>
                    </div>
                </div>
                <div className="real-time">
                    <div>
                        <div className="text-box">
                            <h3 data-aos="fade-up" data-aos-delay="0" data-aos-duration="1000">
                            실시간 데이터 반영<br/>랭킹을 확인하세요</h3>
                            <p data-aos="fade-up" data-aos-delay="200" data-aos-duration="1000">조건별 실시간 순위를 통해,<br/>
                                지금, 영향력을 빠르게 키우는 인물을 발견할 수 있습니다.</p>
                            <a data-aos="fade-up" data-aos-delay="300" data-aos-duration="1000" className="go-page">실시간 랭킹 보기</a>
                        </div>
                        <figure><img src={process.env.PUBLIC_URL + "ranking-list-12.jpg"} alt="랭킹 차트 이미지"/></figure>
                    </div>
                </div>
                <div className="chart">
                    <div className="flex-box">
                        <div className="text-box">
                            <h3 data-aos="fade-up" data-aos-delay="0" data-aos-duration="1000">
                                관심있는 인물은<br/>더 자세히<br/>살펴보세요</h3>
                                {check ? (
                                    <>
                                        <ul>
                                            <li data-aos="fade-up" data-aos-delay="200" data-aos-duration="1000" className="on" data-chart="trend-flow">Followers</li>
                                            <li data-aos="fade-up" data-aos-delay="200" data-aos-duration="1000" data-chart="likes-flow" onClick={() => {
                                                setcheck(true);
                                                setflow((prev) => !prev);
                                            }}>Likes Flow</li>
                                        </ul>
                                        <p data-aos="fade-up" data-aos-delay="300" data-aos-duration="1000">그래프를 통해 최근 팔로워 추세 흐름을 파악하세요.</p>
                                    </>
                                ) : (
                                    <>
                                        <ul>
                                            <li className={flow ? "on" : ""} data-chart="trend-flow" onClick={() => setflow((prev) => !prev)}>Followers</li>
                                            <li className={!flow ? "on" : ""} data-chart="likes-flow" onClick={() => setflow((prev) => !prev)}>Likes Flow</li>
                                        </ul>
                                        <p>{flow ? "그래프를 통해 최근 팔로워 추세 흐름을 파악하세요." : "그래프를 통해 좋아요 수의 변화량을 확인하세요."}</p>
                                    </>
                                )}
                                
                            
                        </div>
                        <div class="img-box">
                            <div style={{left: flow ? "0px" : "-548px"}}>
                                <figure><img src={process.env.PUBLIC_URL + "trend-flow.svg"} alt="trend-flow"/></figure>
                                <figure><img src={process.env.PUBLIC_URL + "likes-flow.svg"} alt="likes-flow"/></figure>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
            <a className="go-top" onClick={goTop}><img src={process.env.PUBLIC_URL + "02-icon-01-outline-arrow-up.svg"} alt="위로"/></a>
        </div>
    );
}

export default Main;