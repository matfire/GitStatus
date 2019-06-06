import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import Login from './containers/Login'
import Home from './containers/Home'
const AuthRoute = (props) => {
    if (localStorage.getItem("jwt")) {
        return(
            <Route path={props.path} exact={props.exact} component={props.component} />
        )
    }
    return (
        <Redirect to="/login" />
    )
}

const Routes = (props) => (
    <div>
        <Route path="/login" component={Login} />
            <AuthRoute path="/" exact component={Home}/>
    </div>
)

export default Routes