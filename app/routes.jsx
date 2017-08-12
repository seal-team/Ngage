import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './components/Home'
import NotFound from './components/NotFound'
import Presentation from './components/Presentation/PresentationMain'

const Routes = () => (
    <Switch>
        <Route exact path="/present" component={Presentation}/>
        <Route exact path="/" component={Home}/>
        <Route path='*' component={NotFound}/>
    </Switch>
)

export default Routes
