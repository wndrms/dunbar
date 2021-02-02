import React, { useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import Popup from "reactjs-popup";
import axios from 'axios';
import Footer from "./Footer";
import Header from "./Header";
import Register from "./Register";

const Influencer = ({InfluencerArray, raisingArray}) => {
    const history = useHistory();
    const [InfluencerTable, setInfluencerTable] = useState([]);
    const [classfilter, setclassfilter] = useState([false, false, false, false, false, false]);
    const [follwerfilter, setfollwerfilter] = useState([false, false, false, false]);
    const [page, setpage] = useState(1);
    const [group, setgroup] = useState(1);
    const goHome = () => history.push("/");
    useEffect(() => {
        window.scrollTo(0, 0);
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
        let tmp = [...classfilter];
        tmp[num] = !tmp[num];
        setclassfilter(tmp);
        setfilter(tmp, follwerfilter);
    }
    const addfilter2 = (num) => {
        let tmp = [...follwerfilter];
        tmp[num] = !tmp[num];
        setfollwerfilter(tmp);
        setfilter(classfilter, tmp);
    }
    const setfilter = (classA, followerA) => {
        let tmpArray = [];
        tmpArray = InfluencerArray.filter((inf) => classA[inf.class]).filter((inf) => followerA[filtering(inf.follower)]);
        setInfluencerTable(tmpArray);
    }
    const filtering = (n) => {
        if(n < 10000) return 1;
        else if(n < 100000) return 2;
        else if(n < 300000) return 3;
        else return 4;
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
    const reset = (check) => {
        if(check) setclassfilter([false, false, false, false, false, false]);
        else setfollwerfilter([false, false, false, false]);
        setInfluencerTable([]);
    }
    return(
        <div className="free wrap influencer">
            <Header goHome={goHome} InfluencerArray={InfluencerArray} raisingArray={raisingArray}/>
            <div className="container main">
                <h2>Influencer</h2>
                <form>
                    <div className="select_wrap">
                        <p>Follower Select<button onClick={(e) => {
                            e.preventDefault();
                            reset(false);
                        }}><img src={process.env.PUBLIC_URL + "02-icon-03-18-px-outline-undo.svg"} alt="reset"/></button></p>
                        <ul>
                            <li><input type="checkbox" name="range" id="fs1" onClick={() => addfilter2(1)} checked={follwerfilter[1]}/><label htmlFor="fs1">1만</label></li>
                            <li><input type="checkbox" name="range" id="fs2" onClick={() => addfilter2(2)} checked={follwerfilter[2]}/><label htmlFor="fs2">1만~10만</label></li>
                            <li><input type="checkbox" name="range" id="fs3" onClick={() => addfilter2(3)} checked={follwerfilter[3]}/><label htmlFor="fs3">10만~30만</label></li>
                            <li><input type="checkbox" name="range" id="fs4" onClick={() => addfilter2(4)} checked={follwerfilter[4]}/><label htmlFor="fs4">30만</label></li>
                        </ul>
                    </div>
                    <div className="select_wrap">
                        <p>Class Select<button onClick={(e) => {
                            e.preventDefault();
                            reset(true);
                        }}><img src={process.env.PUBLIC_URL + "02-icon-03-18-px-outline-undo.svg"} alt="reset"/></button></p>
                        <ul>
                            <li><input type="checkbox" name="_class" id="cs1" onClick={() => addfilter(1)} checked={classfilter[1]}/><label htmlFor="cs1">MZ</label></li>
                            <li><input type="checkbox" name="_class" id="cs2" onClick={() => addfilter(2)} checked={classfilter[2]}/><label htmlFor="cs2">인플루언서</label></li>
                            <li><input type="checkbox" name="_class" id="cs3" onClick={() => addfilter(3)} checked={classfilter[3]}/><label htmlFor="cs3">연예인</label></li>
                            <li><input type="checkbox" name="_class" id="cs4" onClick={() => addfilter(4)} checked={classfilter[4]}/><label htmlFor="cs4">기업</label></li>
                            <li><input type="checkbox" name="_class" id="cs5" onClick={() => addfilter(5)} checked={classfilter[5]}/><label htmlFor="cs5">공직자</label></li>
                            <li><input type="checkbox" name="_class" id="cs6" onClick={() => addfilter(6)} checked={classfilter[6]}/><label htmlFor="cs6">etc</label></li>
                        </ul>
                    </div>
                </form>
                <button className="register">
                    <img src={process.env.PUBLIC_URL + "02-icon-01-outline-plus.svg"} alt="register"/>
                    <Popup
                        trigger={<p>Register</p>}
                        modal
                        lockScroll
                        position="center center">
                        { close => (
                            <Register close={close}/>
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
                                <li><button onClick={() => setpage(index+1)} className={(index+1 === page) ? "checked" : ""}>{index+1}</button></li>
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