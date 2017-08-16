import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './components/Profile'
import EditorMain from './components/Editor/EditorMain'
import NotFound from './components/NotFound'
import Presentation from './components/Presentation/PresentationMain'
import Viewer from './components/Viewer/Main'

const Routes = () => (
        <Switch>

                <Route exact path="/" component={Home} />

                <Route exact path="/editor/:presentationID" component={EditorMain} />

                <Route exact path="/present" component={Presentation} />

                <Route exact path='/view/:presentationID' component={Viewer} />

                <Route path='*' component={NotFound} />

        </Switch>
)

export default Routes
