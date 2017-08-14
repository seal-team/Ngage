import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './components/Home'
import EditorMain from './components/Editor/EditorMain'
import NotFound from './components/NotFound'
import Presentation from './components/Presentation/PresentationMain'

const Routes = () => (
    <Switch>

        <Route exact path="/" component={Home}/>

        <Route exact path="/editor/:presentationID" component={EditorMain} />

        <Route path='*' component={NotFound}/>
    </Switch>
)

export default Routes
