import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import SlideCanvas from './SlideCanvas'
import Chat from './chat'
import Scratchpad from './scratchpad'
import firebase from 'firebase'
import { connect } from 'react-redux'
import Graph from './Graph'
// const sectionStyle = {
//   width: '100%',
//   height: '100%',
//   background-color: 'black'
// }

class ViewerMain extends Component {
    constructor() {
        super()
        this.state = {
            presentationID: '',
            slideID: '',
            owner: "",
            user: "",
            disabled: true
        }
    }

    componentDidMount(props) {
        const presentationID = this.props.match.params.presentationID

        const owner = firebase.database()
            .ref('presentations')
            .child('userID')
        owner.on('value', snapshot => {
            const creator = snapshot.val()
            this.setState({owner: creator, user: this.props.user})
        })

        const slides = firebase.database()
            .ref('presentations')
            .child(presentationID)
            .child('slides')

        slides.on('value', snapshot => {
            const value = snapshot.val()
            const firstSlide = Object.keys(value)[0]
            this.setState({ presentationID, slideID: firstSlide })
        })
        if (this.state.owner === this.state.user) {
            this.setState({ disabled: false })
        }
    }

    render() {
        const disabled = this.state.disabled
        console.log('my slide', this.state.slideID)
        return (
            <div className="viewer-main-container">
               {this.state.slideID &&
                   <div>
                    <div className="section columns slide-and-chat">
                        <div className="slide is-mobile column is-9">
                            <SlideCanvas
                                presID={this.props.match.params.presentationID}
                                slideID={this.state.slideID}
                                disabled={disabled}
                            />
                        </div>
                        <div className="chat is-mobile column is-3">
                            <strong>ChatBox</strong>
                            <Chat presentationID={this.state.presentationID} />
                        </div>
                    </div>
                    <div className="scratchpad-and-graph section columns">
                        <div className="slide is-mobile column is-9">
                            this is scratchpad
                        <Scratchpad presentationID={this.state.presentationID} userID={this.props.user} />
                        </div>
                        <div className="graph is-mobile column is-3">
                            this is graph
                         <Graph />
                        </div>
                    </div>
                </div>
            }
            </div>
        )
    }
}

const mapState = (state) => ({
    user: state.user
})


export default withRouter(connect(mapState)(ViewerMain))
