import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Popup from "reactjs-popup";
import axios from 'axios';
import Footer from "./Footer";
import Header from "./Header";

const Influencer = () => {
    const history = useHistory();
    const [InfluencerArray, setArray] = useState([]);
    const [InfluencerTable, setInfluencerTable] = useState([]);
    const [init, setinit] = useState(false);
    const [classfilter, setclassfilter] = useState([]);
    const [follwerfilter, setfollwerfilter] = useState([]);
    const [page, setpage] = useState(1);
    const goHome = () => history.push("/");
    useEffect(async () => {
        const res = await axios.get("/api/influencer");
        setArray(res.data.data);
        setinit(true);
    }, []);
    const instaclass = (num) => {
        if(num === 1) return "MZ"
        else if(num === 2) return "influencer"
        else if(num === 3) return "celebrity"
        else if(num === 4) return "enterprise"
        else if(num === 5) return "public"
        else if(num === 6) return "etc" 
    }
    const classname = (num) => {
        if(num === 1) return "MZ"
        else if(num === 2) return "인플루언서"
        else if(num === 3) return "연예인"
        else if(num === 4) return "기업"
        else if(num === 5) return "공직자"
        else if(num === 6) return "etc" 
    }
    const addfilter = (num) => {
        let tmp = classfilter;
        if(tmp.includes(num)) tmp = tmp.filter(n => n!==num)
        else tmp.push(num);
        setclassfilter(tmp);
    }
    const addfilter2 = (num) => {
        let tmp = follwerfilter;
        if(tmp.includes(num)) tmp = tmp.filter(n => n!==num)
        else tmp.push(num);
        setfollwerfilter(tmp);
    }
    const setfilter = () => {
        let tmpArray = [];
        tmpArray = InfluencerArray.filter((inf) => classfilter.includes(inf.class)).filter((inf) => filtering(inf.follower));
        setInfluencerTable(tmpArray);
        console.log(InfluencerTable);
    }
    const filtering = (n) => {
        if(follwerfilter.includes(1)) {
            if(n < 10000) return true;
        } 
        if(follwerfilter.includes(2)){
            if(n >= 10000 && n < 100000) return true;
        } 
        if(follwerfilter.includes(3)){
            if(n >= 100000 && n < 300000) return true;
        } 
        if(follwerfilter.includes(4)){
            if(n >= 300000) return true;
        } 
        return false;
    }
    const daysort = () => {
        let tmp = InfluencerTable;
        tmp = tmp.sort(function(a, b) {
            if(a.oneday > b.oneday) return -1;
            else if(a.oneday < b.oneday) return 1;
            else return 0;
        });
        setInfluencerTable(tmp);
        console.log(InfluencerTable);
    }
    const weeksort = (a, b) => {
        if(a.oneweek > b.oneweek) return -1;
        else if(a.oneweek < b.oneweek) return 1;
        else return 0;
    }
    const monthsort = (a, b) => {
        if(a.onemonth > b.onemonth) return -1;
        else if(a.onemonth < b.onemonth) return 1;
        else return 0;
    }
    return(
        <div className="free wrap influencer">
            <Header goHome={goHome}/>
            <div className="container main">
                <h2>Influencer</h2>
                <form>
                    <div className="select_wrap">
                        <p>Follower Select<button><img src={process.env.PUBLIC_URL + "02-icon-03-18-px-outline-undo.svg"} alt="reset"/></button></p>
                        <ul>
                            <li><input type="checkbox" name="range" id="fs1" onClick={() => addfilter2(1)}/><label htmlFor="fs1">1만</label></li>
                            <li><input type="checkbox" name="range" id="fs2" onClick={() => addfilter2(2)}/><label htmlFor="fs2">1만~10만</label></li>
                            <li><input type="checkbox" name="range" id="fs3" onClick={() => addfilter2(3)}/><label htmlFor="fs3">10만~30만</label></li>
                            <li><input type="checkbox" name="range" id="fs4" onClick={() => addfilter2(4)}/><label htmlFor="fs4">30만</label></li>
                        </ul>
                    </div>
                    <div className="select_wrap">
                        <p>Class Select<button><img src={process.env.PUBLIC_URL + "02-icon-03-18-px-outline-undo.svg"} alt="reset"/></button></p>
                        <ul>
                            <li><input type="checkbox" name="_class" id="cs1" onClick={() => addfilter(1)} /><label htmlFor="cs1">MZ</label></li>
                            <li><input type="checkbox" name="_class" id="cs2" onClick={() => addfilter(2)} /><label htmlFor="cs2">인플루언서</label></li>
                            <li><input type="checkbox" name="_class" id="cs3" onClick={() => addfilter(3)} /><label htmlFor="cs3">연예인</label></li>
                            <li><input type="checkbox" name="_class" id="cs4" onClick={() => addfilter(4)} /><label htmlFor="cs4">기업</label></li>
                            <li><input type="checkbox" name="_class" id="cs5" onClick={() => addfilter(5)} /><label htmlFor="cs5">공직자</label></li>
                            <li><input type="checkbox" name="_class" id="cs6" onClick={() => addfilter(6)} /><label htmlFor="cs6">etc</label></li>
                        </ul>
                    </div>
                </form>
                <button className="gray-btn" onClick={() => setfilter()}>검색하기🔎</button>
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
                                        <label htmlFor="register-search" className="gray-btn">분석하기🔬</label>
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
                                                    <button onClick={() => daysort()}><img src={process.env.PUBLIC_URL + "icon-03-18-px-outline-up-off.svg"} alt="up"/></button>
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
                                    {InfluencerTable.map((inf, index) => {
                                        if(index >= (page-1) * 20 && index < page * 20)
                                        return (
                                        <tr onClick={() => history.push("/detail/" + inf.id)} key={inf.id}>
                                            <td>{index + 1}</td>
                                            <td><img src={inf.image} alt=""/></td>
                                            <td>
                                                <span className={"class-badge " + instaclass(inf.class)}>{instaclass(inf.class)}</span>
                                                <p>{inf.id}</p>
                                                <p>{inf.name}</p>
                                            </td>
                                            <td>{inf.follower.toLocaleString()}</td>
                                            <td>{classname(inf.class)}</td>
                                            <td><b className={inf.oneday>0 ? "up" : "down"}>{inf.oneday && inf.oneday.toLocaleString()}</b></td>
                                            <td><b className={inf.oneweek>0 ? "up" : "down"}>{inf.oneweek && inf.oneweek.toLocaleString()}</b></td>
                                            <td><b className={inf.onemonth>0 ? "up" : "down"}>{inf.onemonth && inf.onemonth.toLocaleString()}</b></td>
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
                        <li><button onClick={() => setpage(1)}>1</button></li>
                        <li><button onClick={() => setpage(2)}>2</button></li>
                        <li><button onClick={() => setpage(3)}>3</button></li>
                        <li><button onClick={() => setpage(4)}>4</button></li>
                        <li><button onClick={() => setpage(5)}>5</button></li>
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