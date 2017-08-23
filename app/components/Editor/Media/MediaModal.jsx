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
      mediaUrl: '',
      description: 'null'
    }
  }

  componentWillMount() {
    this.createTable()
  }

  createTable = () => {
    firebase.database().ref(`/Media/${this.props.mediaType}/`).once('value')
      .then(snapshot => snapshot.val())
      .then(result => this.setState((prevState) => ({ allMediaObject: result })))
  }

  setSelectedItemToState = (media) => {
    media.url2 ? (this.setState((prevState) => ({urlArray: [media.url, media.url2], description: media.description}))) :console.log('hi')
      (this.setState((prevState) => ({mediaUrl: media.url, description: media.description})))
  }

  createVRSlide=() => {
    const VRurl = this.state.urlArray
    const description = this.state.description
    const { presentationID, slideID } = this.props.match.params
    const slideRef = firebase.database().ref(`/presentations/${presentationID}/slides/${slideID}`)
    slideRef.child('type')
      .set(`${this.props.mediaType}`)
    slideRef.child(`${this.props.mediaType}Contents`).set({
      VRurl, description
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
              Select one of the following files or upload your own file.
              <br/>
              <br/>
              <div className="control">
                <div className="columns is-multiline is-mobile">
                    {displayArray.map((media) =>
                    <div key = {media.url} className={
                        ((media.url === this.state.urlArray[0]) && (media.url2 === this.state.urlArray[1]))
                        || (media.url === this.state.mediaUrl)
                        ? 'column is-one-third timeline-slide-selected'
                        : 'column is-one-third'
                      } onClick={() => this.setSelectedItemToState(media)}>
                      <img src={media.thumbnailUrl}/>
                      {media.description}
                    </div>
                    )
                  }
                </div>
              </div>
            <hr></hr>
              <div className="margin-top-sm">
                <button className="button is-primary"
                  onClick={() => { { this.renderTypeOfMedia() }; { this.props.handleModal() } }}>Add To Slide
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
