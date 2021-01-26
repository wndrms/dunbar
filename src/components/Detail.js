import axios from "axios";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Bar, BarChart, CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import Footer from "./Footer";
import Header from "./Header";

const Detail = ({match}) => {
    const history = useHistory();
    const instagramID = match.params.id;
    const [instaObj, setinstaObj] = useState("");
    const [imgs, setimgArray] = useState([]);
    const [linedata, setlinedata] = useState([]);
    const [bardata, setbardata] = useState([]);
    const [init, setinit] = useState(false);
    let domain = [];
    let domain2 = [];
    useEffect(async () => {
        const res = await axios.get('/api/info/' + instagramID);
        setinstaObj(res.data.data[0]);
        setimgArray(res.data.imgs);
        let datas = res.data.line_data;
        datas.map((data) => linedata.push({"date" : new Date(data.Timestamp).getTime(), "follower" : data.follower}));
        domain = [linedata[0].date, linedata[linedata.length - 1].date];
        datas.slice(-7).map((data) => bardata.push({"date" : new Date(data.Timestamp).getTime(), "likes" : data.likes}));
        domain2 = [bardata[0].date, bardata[bardata.length - 1].date];
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
    const dateFormatter = date => {
        let tmp = format(new Date(date), "MMM/dd");
        return tmp;
    }
    const goHome = () => history.push("/");
    const goTop = () => window.scrollTo(0, 0);
    return(
        <div className="free wrap sub">
            <Header goHome={goHome}/>
            <div className="container">
                {init ? (
                    <>
                        <div className="category">
                            <Link to={"/influencer"}>Influencer</Link>
                            <span>/</span>
                            <a className="on">{instaObj.id}</a>
                        </div>
                        <div className="banner_box">
                            <div className="info-wrap">
                                <figure className="user-img"><img src={instaObj.image} alt=""/></figure>
                                <div className="user-info">
                                    <span className={"class-badge " + instaclass(instaObj.class) + " solid"}>{instaclass(instaObj.class)}</span>
                                    <h2>{instaObj.id}</h2>
                                    <p>{instaObj.name}</p>
                                    <p className="hash-wrap">
                                        <span>#셀피</span>
                                        <span>#데일리</span>
                                        <span>#소통</span>
                                        <span>#오늘의 훈녀</span>
                                        <span>#followme</span>
                                    </p>
                                </div>
                                <ul className="sns-wrap">
                                    <li><button>instagram</button></li>
                                    <li><button>facebook</button></li>
                                    <li><button>youtube</button></li>
                                    <li><button>tiktok</button></li>
                                    <li><button>twitter</button></li>
                                </ul>
                            </div>
                        </div>
                        <ul className="info_box">
                            <li>
                                <span>Follower</span>
                                <b>{instaObj.follower && instaObj.follower.toLocaleString()}</b>
                            </li>
                            <li>
                                <span>평균 좋아요 수</span>
                                <b>{instaObj.likes && instaObj.likes.toLocaleString()}</b>
                            </li>
                            <li>
                                <span>Day</span>
                                <b className={instaObj.oneday>0 ? "up" : "down"}>{instaObj.oneday && instaObj.oneday.toLocaleString()}</b>
                            </li>
                            <li>
                                <span>Week</span>
                                <b className={instaObj.oneweek>0 ? "up" : "down"}>{instaObj.oneweek && instaObj.oneweek.toLocaleString()}</b>
                            </li>
                            <li>
                                <span>Month</span>
                                <b className={instaObj.onemonth>0 ? "up" : "down"}>{instaObj.onemonth && instaObj.onemonth.toLocaleString()}</b>
                            </li>
                        </ul>
                        <div className="chart">
                            <div className="followers-chart">
                                <div className="chart-header">
                                    <p>Followers Trend Flow</p>
                                    <span>
                                        <img src={process.env.PUBLIC_URL + "02-icon-01-outline-info-circle.svg"} alt="infomation"/>
                                    </span>
                                </div>
                                <LineChart width={684} height={640} data={linedata}>
                                    <Line type="linear" dataKey="follower"/>
                                    <XAxis dataKey="date" scale="time" type="number" hasTick domain={domain} tickFormatter={dateFormatter}/>
                                    <YAxis />
                                </LineChart>
                            </div>
                            <div className="likes-chart">
                                <div className="chart-header">
                                    <p>Likes Flow</p>
                                    <span>
                                    <img src={process.env.PUBLIC_URL + "02-icon-01-outline-info-circle.svg"} alt="infomation"/>
                                    </span>
                                </div>
                                <BarChart 
                                    width={486} 
                                    height={640} 
                                    layout="vertical"
                                    data={bardata}>
                                    <XAxis type="number" hide />
                                    <YAxis dataKey="date" scale="time" type="number" hasTick domain={domain2} tickFormatter={dateFormatter}/>
                                    <Bar dataKey="likes" fill="#DFDFDF"/>
                                </BarChart>
                            </div>
                        </div>
                        <h3>최근 게시물</h3>
                        <ul className="img-list">
                            {imgs.map((img) => (
                                <li><img src={img} alt=""/></li>
                            ))}
                        </ul>
                        <button className="gray-btn">더보기</button>
                    </>
                ) : (
                    "로딩중 입니다..."
                )}
                
            </div>
            <Footer/>
            <a className="go-top" onClick={goTop}><img src={process.env.PUBLIC_URL + "02-icon-01-outline-arrow-up.svg"} alt="위로"/></a>
        </div>
    );
}

export default Detail;