import React from 'react'
import { Link } from 'react-router-dom'


export default class Home extends React.Component {
   render() {
        return(
            <div>
                <h1 className="text-center">Welcome to nGage.</h1>

                <div className="columns">
                    <div className="column text-center">
                        <Link to="">New Presentation</Link>
                    </div>

                    <div className="column text-center">
                        <Link to="">Edit Presentation</Link>
                    </div>

                    <div className="column text-center">
                        <Link to="">Present Mode</Link>
                    </div>
                </div>
            </div>
        )
    }
}