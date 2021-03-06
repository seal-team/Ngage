import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './components/Home'
import Profile from './components/Profile'
import EditorMain from './components/Editor/EditorMain'
import Viewer from './components/Viewer/ViewerMain'
import WhoAmI from './components/WhoAmI'

import NotFound from './components/NotFound'

const Routes = (props) => (
  <Switch>
    <Route exact path='/' render={(routeProps) => <Home userName={props.userName} />} />
    <Route exact path="/profile" component={Profile} />
    <Route exact path="/login" component={WhoAmI} />
    <Route exact path="/edit/:presentationID" component={EditorMain} />
    <Route exact path="/edit/:presentationID/slide/:slideID" component={EditorMain} />
    <Route exact path="/view/:presentationID" component={Viewer} />
    <Route path='*' component={NotFound} />
  </Switch>
)

export default Routes
