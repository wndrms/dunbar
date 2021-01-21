import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Popup from "reactjs-popup";
import axios from 'axios';
import Footer from "./Footer";
import Header from "./Header";

const Influencer = () => {
    const history = useHistory();
    const [InfluencerArray, setArray] = useState([]);
    const [init, setinit] = useState(false);
    const goHome = () => history.push("/");
    useEffect(async () => {
        const res = await axios.get("/api/influencer");
        setArray(res.data.data);
        console.log(res.data.data);
        setinit(true);
    }, []);
    return(
        <div className="free wrap influencer">
            <Header goHome={goHome}/>
            <div className="container main">
                <h2>Influencer</h2>
                <form>
                    <div className="select_wrap">
                        <p>Follower Select<button><img src={process.env.PUBLIC_URL + "02-icon-03-18-px-outline-undo.svg"} alt="reset"/></button></p>
                        <ul>
                            <li><input type="checkbox" name="range" id="fs1"/><label for="fs1">1만</label></li>
                            <li><input type="checkbox" name="range" id="fs2"/><label for="fs2">1만~10만</label></li>
                            <li><input type="checkbox" name="range" id="fs3"/><label for="fs3">10만~30만</label></li>
                            <li><input type="checkbox" name="range" id="fs4"/><label for="fs4">30만</label></li>
                        </ul>
                    </div>
                    <div className="select_wrap">
                        <p>Class Select<button><img src={process.env.PUBLIC_URL + "02-icon-03-18-px-outline-undo.svg"} alt="reset"/></button></p>
                        <ul>
                            <li><input type="checkbox" name="_class" id="cs1"/><label for="cs1">MZ</label></li>
                            <li><input type="checkbox" name="_class" id="cs2"/><label for="cs2">인플루언서</label></li>
                            <li><input type="checkbox" name="_class" id="cs3"/><label for="cs3">연예인</label></li>
                            <li><input type="checkbox" name="_class" id="cs4"/><label for="cs4">기업</label></li>
                            <li><input type="checkbox" name="_class" id="cs5"/><label for="cs5">공직자</label></li>
                            <li><input type="checkbox" name="_class" id="cs6"/><label for="cs6">etc</label></li>
                        </ul>
                    </div>
                </form>
                <button className="gray-btn">검색하기🔎</button>
                <button className="register">
                    <img src={process.env.PUBLIC_URL + "02-icon-01-outline-plus.svg"} alt="register"/>
                    <Popup
                        trigger={<p>Register</p>}
                        modal>
                        { close => (
                            <div className="register-popup on">
                                <div>
                                    <p className="header">🧐 Register</p>
                                    <p className="text">원하는 계정을 등록 해주세요,<br/>
                                        등록하신 계정 분석을 시작합니다.</p>
                                    <div className="form-box">
                                        <input 
                                            type="search" 
                                            id="register-search" 
                                            placeholder="계정 이름"/>
                                        <label for="register-search" className="gray-btn">분석하기🔬</label>
                                        <button></button>
                                        <p className="message">계정은 영문으로만 입력 가능해요</p>
                                    </div>
                                    <button className="js-register-close" onClick={close}><img src={process.env.PUBLIC_URL + "02-icon-01-outline-times-red.svg"} alt="닫기"/></button>
                                </div>
                            </div>
                        )}
                    </Popup>
                    
                </button>
                {(() => {
                    if(init){
                        return(
                            <table id="insta_data" className="tbl">
                                <colgroup>
                                    <col style={{width:"60px"}}/>
                                    <col style={{width:"96px"}}/>
                                    <col style={{width:"252px"}}/>
                                    <col style={{width:"168px"}}/>
                                    <col style={{width:"140px"}}/>
                                    <col style={{width:"140px"}}/>
                                    <col style={{width:"140px"}}/>
                                    <col style={{width:"140px"}}/>
                                    <col style={{width:"64px"}}/>
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th></th>
                                        <th>ID/Name</th>
                                        <th>Follower</th>
                                        <th>Class</th>
                                        <th>
                                            <div>
                                                <b>Day</b>
                                                <span>
                                                    <button><img src={process.env.PUBLIC_URL + "icon-03-18-px-outline-up-off.svg"} alt="up"/></button>
                                                    <button><img src={process.env.PUBLIC_URL + "icon-03-18-px-outline-down-on.svg"} alt="down"/></button>
                                                </span>
                                            </div>
                                        </th>
                                        <th>
                                            <div>
                                                <b>Week</b>
                                                <span>
                                                    <button><img src={process.env.PUBLIC_URL + "icon-03-18-px-outline-up-off.svg"} alt="up"/></button>
                                                    <button><img src={process.env.PUBLIC_URL + "icon-03-18-px-outline-down-on.svg"} alt="down"/></button>
                                                </span>
                                            </div>
                                        </th>
                                        <th>
                                            <div>
                                                <b>Month</b>
                                                <span>
                                                    <button><img src={process.env.PUBLIC_URL + "icon-03-18-px-outline-up-off.svg"} alt="up"/></button>
                                                    <button><img src={process.env.PUBLIC_URL + "icon-03-18-px-outline-down-on.svg"} alt="down"/></button>
                                                </span>
                                            </div>
                                        </th>
                                        <th><button><img src={process.env.PUBLIC_URL + "02-icon-01-outline-info-circle.svg"} alt="infomation"/></button></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {InfluencerArray.map((inf, index) => {
                                        if(index < 20)
                                        return (
                                        <tr onClick={() => history.push("/detail/" + inf.id)}>
                                            <td>{index + 1}</td>
                                            <td><img src={inf.image} alt=""/></td>
                                            <td>
                                                <span className="class-badge MZ"></span>
                                                <p>{inf.id}</p>
                                                <p>{inf.name}</p>
                                            </td>
                                            <td>{inf.follower}</td>
                                            <td>{inf.class}</td>
                                            <td><b className={inf.oneday>0 ? "up" : "down"}>{inf.oneday}</b></td>
                                            <td><b className={inf.oneweek>0 ? "up" : "down"}>{inf.oneweek}</b></td>
                                            <td><b className={inf.onemonth>0 ? "up" : "down"}>{inf.onemonth}</b></td>
                                            <td>
                                                <img src={process.env.PUBLIC_URL + "02-icon-01-outline-circle.svg"} alt=""/>
                                            </td>
                                        </tr>
                                    )})}
                                </tbody>
                            </table>
                        )
                    } else {
                        return("로딩중입니다...")
                    }
                })()
                }
                
                <div className="tb-page-list">
                    <button><img src={process.env.PUBLIC_URL + "02-icon-01-outline-chevron-left.svg"} alt="이전"/></button>
                    <ul>
                        <li><button>1</button></li>
                        <li><button>2</button></li>
                        <li><button>3</button></li>
                        <li><button>4</button></li>
                        <li><button>5</button></li>
                    </ul>
                    <button><img src={process.env.PUBLIC_URL + "02-icon-01-outline-chevron-right.svg"} alt="다음"/></button>
                </div>
            </div>
            <Footer/>
            <a className="go-top"><img src={process.env.PUBLIC_URL + "02-icon-01-outline-arrow-up.svg"} alt="위로"/></a>
        </div>
    );
}

export default Influencer;