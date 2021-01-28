import React, {useEffect, useState} from "react";
import AppRouter from "components/Router";
import axios from "axios";

function App() {
  const [userObj, setuserObj] = useState(null);
  const [InfluencerArray, setArray] = useState([]);
  const [init, setinit] = useState(false);
  const [raisingArray, setraising] = useState([]);
  useEffect(async () => {
    window.scrollTo(0, 0);
    const res = await axios.get("/api/influencer");
    setArray(res.data.data);
    let tmpArray = [];
    tmpArray = res.data.data.filter((InstaObj) => InstaObj.class == 1 || InstaObj.class == 2);
    tmpArray.sort((a, b) => {
        if((a.oneday / a.follower) < (b.oneday / b.follower)) return 1;
        if((a.oneday / a.follower) > (b.oneday / b.follower)) return -1;
        else return 0;
    });
    setraising(tmpArray.slice(0, 5));
    console.log(raisingArray);
    setinit(true);
}, []);
  return (
    <div className="App">
      {init && 
      <AppRouter 
        isLoggedIn={Boolean(userObj)} InfluencerArray={InfluencerArray} raisingArray={raisingArray}/>
      }
    </div>
  );
}

export default App;
