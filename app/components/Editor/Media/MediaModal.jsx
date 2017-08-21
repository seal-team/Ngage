/*

Dummy Component for Media
This is Modal for uploading medias

*/
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import firebase from 'APP/fire'

class MediaModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allMediaObject: {},
      urlArray: [],
      mediaUrl: ''
    }
  }

  componentDidMount() {
    this.createTable()
  }

  createTable = () => {
    firebase.database().ref(`/Media/${this.props.mediaType}/`).once('value')
      .then(snapshot => snapshot.val())
      .then(result => this.setState({ allMediaObject: result }))
  }

  setSelectedItemToState = (media) => {
    media.url2 ? (this.setState({urlArray: [media.url, media.url2]})) : (this.setState({mediaUrl: media.url}))
  }

  createVRSlide=() => {
    const VRurl = this.state.urlArray
    const { presentationID, slideID } = this.props.match.params
    const slideRef = firebase.database().ref(`/presentations/${presentationID}/slides/${slideID}`)
    slideRef.child('type')
      .set(`${this.props.mediaType}`)
    slideRef.child(`${this.props.mediaType}-contents`).set({
      VRurl
    })
  }

  createMedia = () => {
    const mediaUrl = this.state.mediaUrl
    const { presentationID, slideID } = this.props.match.params
    const slideRef = firebase.database().ref(`/presentations/${presentationID}/slides/${slideID}`)
    slideRef.child(`${this.props.mediaType}-contents`)
      .set({mediaUrl})
  }

  renderTypeOfMedia = () => {
    if (this.props.mediaType ==='VR') {
      this.props.handleModal()
      this.createVRSlide()
    } else {
      this.props.handleModal()
      this.createMedia()
    }
  }

  render() {
    const allMediaObject = this.state.allMediaObject
    const keys = Object.keys(allMediaObject)
    const slideID = this.props.match.params.slideID
    const presentationID = this.props.match.params.presentationID
    const displayArray = []
    for (let i = 0; i < keys.length; i++) {
      displayArray.push(allMediaObject[keys[i]])
    }
    return (
      <div className='modal is-active'>
        <div className="modal-background"></div>
        <div className="modal-card">
          <section className="modal-card-body">
            <div className="field">
              <label className="label has-text-left">{this.props.mediaType}</label>
              <div className="control">
                {this.props.mediaType} STUFF map stuff in data base use Media Object from bulma
                <div className="columns is-multiline is-mobile">
                  {
                    displayArray.map((media) =>
                    <div key = {media.url} className='column is-one-third'>
                      <a onClick={() => this.setSelectedItemToState(media)} >
                        {media.description}<br />{media.name} <hr></hr> </a>
                    </div>
                    )
                  }
                </div>
              </div>
            <hr></hr>
              <div className="margin-top-sm">
                <button className="button is-primary"
                  onClick={() => this.renderTypeOfMedia()} >Create
                </button>
                <span> </span>
                <button className="button is-primary"
                  onClick={() => { { this.props.handleModal() }; { this.props.handleUpdateModal() } }}>Upload
                </button>
                <span> </span>
                <button className="button"
                  onClick={() => { this.props.handleModal() }}> Close
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    )
  }
}

export default withRouter(MediaModal)
