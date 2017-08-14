import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Home extends Component {
   render() {
        // in the future this presentationID will be passed in by react router as match.params
        const presentationID = 1

        return(
            <div>
                <h1 className="text-center">Welcome to nGage.</h1>

                <div className="columns">
                    <div className="column text-center">
                        <Link to="/present">New Presentation</Link>
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

export default Home
