import React from "react";
import {HashRouter as Router, Route, Switch } from "react-router-dom";
import AuthForm from "./AuthForm"
import Detail from "./Detail";
import Influencer from "./Influencer";
import Main from "./Main";
const AppRouter = ({isLoggedIn, InfluencerArray, raisingArray}) => {
    return(
        <Router>
            <Switch>
                <Route exact path="/">
                    <Main InfluencerArray={InfluencerArray} raisingArray={raisingArray}/>
                </Route>
                {isLoggedIn ? (
                    <>
                        
                    </>
                ) : (
                    <>
                        <Route exact path="/login">
                            <AuthForm/>
                        </Route>
                        <Route exact path="/influencer">
                            <Influencer InfluencerArray={InfluencerArray} raisingArray={raisingArray}/>
                        </Route>
                        <Route path="/detail/:id" component={Detail}/>
                    </>
                )}
            </Switch>
        </Router>
    );
}
export default AppRouter;