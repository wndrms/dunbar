import React, {useEffect, useState} from "react";
import AppRouter from "components/Router";
import axios from "axios";

function App() {
  const [userObj, setuserObj] = useState(null);
  const [InfluencerArray, setArray] = useState([]);
  const [init, setinit] = useState(false);
  useEffect(async () => {
    window.scrollTo(0, 0);
    const res = await axios.get("/api/influencer");
    setArray(res.data.data);
    setinit(true);
}, []);
  return (
    <div className="App">
      {init && 
      <AppRouter 
        isLoggedIn={Boolean(userObj)} InfluencerArray={InfluencerArray}/>
      }
    </div>
  );
}

export default App;
