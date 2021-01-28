import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Search = ({close, InfluencerArray, raisingArray}) => {
    const history = useHistory();
    const [searchID, setsearchID] = useState("");
    const [matchArray, setmatchArray] = useState([]);
    const [focus, setfocus] = useState(false);
    const onChange = (event) => {
        const {target: {name, value}} = event;
        if(name === "search"){
            setsearchID(value);
        }
        let tmpArray = [...InfluencerArray];
        tmpArray = tmpArray.filter((InstaObj) => InstaObj.id.includes(value));
        if(value === '') tmpArray=[];
        setmatchArray(tmpArray);
    }
    const btnClick = (instaid) => {
        setsearchID(instaid);
        let tmpArray = [...InfluencerArray];
        tmpArray = tmpArray.filter((InstaObj) => InstaObj.id.includes(instaid));
        setmatchArray(tmpArray);
    }
    const goSearch = () => history.push("/detail/" + searchID);
    return(
        <div className="search-modal on">
            <div className="close-btn-wrap">
                <div><button className="js-search-btn-hide" onClick={close}><img src={process.env.PUBLIC_URL + "02-icon-01-outline-times.svg"} alt="close"/></button></div>
            </div>
            <div className="search-modal-wrap">
                <div>
                    <h2>Search.</h2>
                    <div className={"form-box" + (focus ? " selected" : "") + (searchID ? " filled" : "")}>
                        <input 
                            type="search"
                            id="search-modal"
                            className="style-bottom"
                            name="search"
                            value={searchID}
                            onChange={onChange}
                            onFocus={() => setfocus(true)}
                            onBlur={() => setfocus(false)}
                            placeholder="검색하고 싶은 인스타그램 주소를 입력해주세요. ex) jong_min__park, dltlxxs_ss, nayomi0331"/>
                        <label htmlFor="search-modal" onClick={goSearch}><img src={process.env.PUBLIC_URL + "02-icon-01-outline-search.svg"} alt="검색하기"/></label>
                    </div>
                    <ul className={"auto-search" + (searchID ? " on" : "")} style={{display: "block"}}>
                       {matchArray.map((InstaObj) => (
                           <li onClick={() => btnClick(InstaObj.id)}><button>{InstaObj.id}</button></li>
                       ))}
                    </ul>
                    <div className="recently-search">
                        <div>
                            <p>최근 검색</p>
                            <button>기록 전체삭제</button>
                        </div>
                        <ul>
                            <li>all_zero_k</li>
                        </ul>
                    </div>
                    <div className="rising">
                        <p>요즘 떠오르는 인플루언서</p>
                        <ul>
                            {raisingArray.map((InstaObj) => (
                                <li onClick={() => {window.location="#/detail/" + InstaObj.id}}>
                                    <img src={InstaObj.image}/>
                                    <span className={"class-badge " + (InstaObj.class === 1 ? "MZ" : "influencer")}>{InstaObj.class === 1 ? "MZ" : "influencer"}</span>
                                    <p>{InstaObj.id}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Search;
