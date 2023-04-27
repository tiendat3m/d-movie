import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../pages/Home";
import Catalog from "../pages/Catalog";
import Detail from "../pages/Detail"

const Routes = () => {
    return (
        <Switch>
            <Route path='/:category/search/:keyword' component={Catalog}></Route>
            <Route path='/:category/:id' component={Detail}></Route>
            <Route path='/:category' component={Catalog}></Route>
            <Route path='/' exact component={Home}></Route>s
        </Switch>
    )
}

export default Routes