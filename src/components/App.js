import React, {useState} from "react";
import AppRouter from "components/Router";

function App() {
  const [userObj, setuserObj] = useState(null);
  return (
    <div className="App">
      <AppRouter 
        isLoggedIn={Boolean(userObj)}/>
    </div>
  );
}

export default App;
