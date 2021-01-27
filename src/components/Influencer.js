import React, { useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import Popup from "reactjs-popup";
import axios from 'axios';
import Footer from "./Footer";
import Header from "./Header";

const Influencer = ({InfluencerArray}) => {
    const history = useHistory();
    const [InfluencerTable, setInfluencerTable] = useState([]);
    const [init, setinit] = useState(true);
    const [classfilter, setclassfilter] = useState([]);
    const [follwerfilter, setfollwerfilter] = useState([]);
    const [sortedField, setsortedField] = useState(null);
    const [Direction, setDirection] = useState();
    const [page, setpage] = useState(1);
    const [group, setgroup] = useState(1);
    let tmpArray = [];
    const goHome = () => history.push("/");
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    useMemo(() => {
        let tmpArray = InfluencerTable;
        if (sortedField !== null) {
            tmpArray = InfluencerTable;
            tmpArray.sort((a, b) => {
                if(a[sortedField] > b[sortedField]) return Direction ? -1 : 1;
                if(a[sortedField] < b[sortedField]) return Direction ? 1 : -1;
                return 0;
            });
        }
        return tmpArray
    }, [InfluencerTable]);
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
    const Influencersort = async (field, direction) => {
        let tmpArray = [...InfluencerTable];
        tmpArray.sort((a, b) => {
            if(a[field] > b[field]) return direction ? 1 : -1;
            if(a[field] < b[field]) return direction ? -1 : 1;
            return 0;
        });
        setInfluencerTable(tmpArray);
    }
    
    return(
        <div className="free wrap influencer">
            <Header goHome={goHome} InfluencerArray={InfluencerArray}/>
            <div className="container main">
                <h2>Influencer</h2>
                <form>
                    <div className="select_wrap">
                        <p>Follower Select<button onClick={(e) => {
                            e.preventDefault();
                        }}><img src={process.env.PUBLIC_URL + "02-icon-03-18-px-outline-undo.svg"} alt="reset"/></button></p>
                        <ul>
                            <li><input type="checkbox" name="range" id="fs1" onClick={() => addfilter2(1)}/><label htmlFor="fs1">1만</label></li>
                            <li><input type="checkbox" name="range" id="fs2" onClick={() => addfilter2(2)}/><label htmlFor="fs2">1만~10만</label></li>
                            <li><input type="checkbox" name="range" id="fs3" onClick={() => addfilter2(3)}/><label htmlFor="fs3">10만~30만</label></li>
                            <li><input type="checkbox" name="range" id="fs4" onClick={() => addfilter2(4)}/><label htmlFor="fs4">30만</label></li>
                        </ul>
                    </div>
                    <div className="select_wrap">
                        <p>Class Select<button onClick={(e) => {
                            e.preventDefault();
                        }}><img src={process.env.PUBLIC_URL + "02-icon-03-18-px-outline-undo.svg"} alt="reset"/></button></p>
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
                        modal
                        position="center center">
                        { close => (
                            <div className="register-popup">
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
                                        <button onClick={() => Influencersort("oneday", true)}><img src={process.env.PUBLIC_URL + "icon-03-18-px-outline-up-off.svg"} alt="up"/></button>
                                        <button onClick={() => Influencersort("oneday", false)}><img src={process.env.PUBLIC_URL + "icon-03-18-px-outline-down-on.svg"} alt="down"/></button>
                                    </span>
                                </div>
                            </th>
                            <th>
                                <div>
                                    <b>Week</b>
                                    <span>
                                        <button onClick={() => Influencersort("oneweek", true)}><img src={process.env.PUBLIC_URL + "icon-03-18-px-outline-up-off.svg"} alt="up"/></button>
                                        <button onClick={() => Influencersort("oneweek", false)}><img src={process.env.PUBLIC_URL + "icon-03-18-px-outline-down-on.svg"} alt="down"/></button>
                                    </span>
                                </div>
                            </th>
                            <th>
                                <div>
                                    <b>Month</b>
                                    <span>
                                        <button onClick={() => Influencersort("onemonth", true)}><img src={process.env.PUBLIC_URL + "icon-03-18-px-outline-up-off.svg"} alt="up"/></button>
                                        <button onClick={() => Influencersort("onemonth", false)}><img src={process.env.PUBLIC_URL + "icon-03-18-px-outline-down-on.svg"} alt="down"/></button>
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
                <div className="tb-page-list">
                    <button onClick={() => group > 1 && setgroup(group-1)}><img src={process.env.PUBLIC_URL + "02-icon-01-outline-chevron-left.svg"} alt="이전"/></button>
                    <ul>
                        {[...Array(Math.ceil(InfluencerTable.length/20))].map((n, index) => {
                            if( index + 1 > (group-1) * 5 && index + 1 <= group * 5) return(
                                <li><button onClick={() => setpage(index+1)}>{index+1}</button></li>
                            )
                        })}
                    </ul>
                    <button onClick={() => group*100 < InfluencerTable.length && setgroup(group+1)}><img src={process.env.PUBLIC_URL + "02-icon-01-outline-chevron-right.svg"} alt="다음"/></button>
                </div>
            </div>
            <Footer/>
            <a className="go-top"><img src={process.env.PUBLIC_URL + "02-icon-01-outline-arrow-up.svg"} alt="위로"/></a>
        </div>
    );
}

export default Influencer;