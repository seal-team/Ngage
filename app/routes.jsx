import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './components/Home'
import EditorMain from './components/Editor/EditorMain'
import NotFound from './components/NotFound'
import Presentation from './components/Presentation/PresentationMain'
import Viewer from './components/Viewer/Main'
import QuillComp from './components/QuillComp.jsx'

const Routes = () => (
        <Switch>

                <Route exact path="/" component={Home} />

                <Route exact path="/editor/:presentationID" component={EditorMain} />

                <Route exact path="/present" component={Presentation} />

                <Route exact path='/view/:presentationID' component={Viewer} />

                <Route exact path='/quill' component={QuillComp} /> //testing

                <Route path='*' component={NotFound} />

        </Switch>
)

export default Routes
