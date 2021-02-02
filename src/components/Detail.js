import axios from "axios";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Popup from "reactjs-popup";
import { Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import CustomTooltip from "./CustomTooltip";
import Footer from "./Footer";
import Header from "./Header";

const Detail = ({InfluencerArray, raisingArray, match}) => {
    const history = useHistory();
    const instagramID = match.params.id;
    const [instaObj, setinstaObj] = useState("");
    const [imgs, setimgArray] = useState([]);
    const [linedata, setlinedata] = useState([]);
    const [bardata, setbardata] = useState([]);
    const [init, setinit] = useState(false);
    const [color, setcolor] = useState("#DFDFDF");
    const [activeIndex, setindex] = useState(null);
    let domain = [];
    let domain2 = [];
    useEffect(async () => {
        window.scrollTo(0, 0);
        const res = await axios.get('/api/info/' + instagramID);
        setinstaObj(res.data.data[0]);
        setimgArray(res.data.imgs);
        let datas = res.data.line_data;
        datas.map((data) => linedata.push({"date" : new Date(data.Timestamp).getTime(), "follower" : data.follower}));
        domain = [linedata[0].date, linedata[linedata.length - 1].date];
        datas.slice(-7).map((data) => bardata.push({"date" : new Date(data.Timestamp).getTime(), "likes" : data.likes}));
        domain2 = [bardata[0].date, bardata[bardata.length - 1].date];
        setinit(true);
    }, [match.params.id]);
    const instaclass = (num) => {
        if(num === 1) return "MZ"
        else if(num === 2) return "influencer"
        else if(num === 3) return "celebrity"
        else if(num === 4) return "enterprise"
        else if(num === 5) return "public"
        else if(num === 6) return "etc" 
    }
    const dateFormatter = date => {
        let tmp = format(new Date(date), "MMMdd");
        return tmp;
    }
    const numberFormatter = num => {
        let tmp = (num/1000).toString() + 'k';
        return tmp;
    }
    const goHome = () => history.push("/");
    const goTop = () => window.scrollTo(0, 0);
    return(
        <div className="free wrap sub">
            <Header goHome={goHome} InfluencerArray={InfluencerArray} raisingArray={raisingArray}/>
            <div className="container">
                {init ? (
                    <>
                        <div className="category">
                            <Link to={"/influencer"}>Influencer</Link>
                            <span>/</span>
                            <a onClick={() => window.location.reload()} className="on">{instaObj.id}</a>
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
                                    <li><button onClick={() => {window.location="https://www.instagram.com/" + instaObj.id}}>instagram</button></li>
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
                                        <Popup
                                            trigger={<img src={process.env.PUBLIC_URL + "02-icon-01-outline-info-circle.svg"} alt="infomation"/>}
                                            on="hover">
                                            <div className="pop">
                                                <p>📈 Followers Trend Flow</p>
                                                <p>최근 10주간의 팔로워 수 증감량입니다.</p>
                                            </div>
                                        </Popup>
                                    </span>
                                </div>
                                <LineChart width={648} height={434} data={linedata} margin={{ top: 0, left: 0, right: 0, bottom: 0 }}>
                                    <CartesianGrid horizontal vertical={false}/>
                                    <Line type="linear" dataKey="follower" stroke="#e94757" dot={false} strokeWidth="4"/>
                                    <XAxis dataKey="date" scale="time" type="number" hasTick domain={domain} tickFormatter={dateFormatter} stroke="#EEEEEE" tick={{fill: "#8b8b8b", fontSize: 12}}/>
                                    <YAxis tickCount={5} axisLine={false} tickFormatter={numberFormatter} tick={{fill: "#8b8b8b", fontSize: 12}} />
                                </LineChart>
                            </div>
                            <div className="likes-chart">
                                <div className="chart-header">
                                    <p>Likes Flow</p>
                                    <span>
                                        <Popup
                                            trigger={<img src={process.env.PUBLIC_URL + "02-icon-01-outline-info-circle.svg"} alt="infomation"/>}
                                            on="hover">
                                            <div className="pop">
                                                <p>📈 Likes Trend Flow</p>
                                                <p>최근 7일간의 좋아요 수 증감량입니다.</p>
                                            </div>
                                        </Popup>
                                    </span>
                                </div>
                                <BarChart 
                                    width={436} 
                                    height={485} 
                                    layout="vertical"
                                    data={bardata}
                                    barGap={"58px"}>
                                    <XAxis type="number" hide />
                                    <YAxis 
                                        dataKey="date" 
                                        scale="time" 
                                        type="number" 
                                        hasTick 
                                        domain={domain2}
                                        interval="preserveStartEnd"
                                        tickFormatter={dateFormatter} 
                                        tick={{fill: "#8b8b8b", fontSize: 14}}/>
                                    <Bar dataKey="likes" fill={color} barSize={16}>
                                        {bardata.map((entry, index) => (
                                            <Cell cursor="pointer" onMouseEnter={() => setindex(index)} onMouseLeave={() => setindex(null)} fill={index === activeIndex ? "#e94757" : "#DFDFDF"} key={`cell-${index}`}/>
                                        ))}
                                    </Bar>
                                    <Tooltip content={<CustomTooltip/>}/>
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