import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './components/Home'
import NotFound from './components/NotFound'

const Routes = () => (
    <Switch>

        <Route path="/" component={Home}/>

        <Route path='*' component={NotFound}/>

    </Switch>
)

export default Routes
