/*

Dummy Component for Media
is Modal for uploading different medias

*/
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import firebase from 'APP/fire'
import VRCanvas from './VRCanvas'

class MediaModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allMediaObject: {},
      testingarray: ['https://firebasestorage.googleapis.com/v0/b/ngage-fae7f.appspot.com/o/VR%2Faudioptimised02.obj?alt=media&token=aed2511d-4244-4f37-8a70-0363a6212521',
        'https://firebasestorage.googleapis.com/v0/b/ngage-fae7f.appspot.com/o/VR%2Fstandard-male-figure.mtl?alt=media&token=4d08b407-a866-4edc-97e6-150d2262872e']
    }
  }

  componentDidMount() {
    this.createTable()
  }

  createTable = () => {
    firebase.database().ref('/Media/' + `${this.props.mediaType}/`).once('value')
      .then((snapshot) => {
        this.setState({ allMediaObject: snapshot.val() })
      })
  }
  createVRSlide=() => {
    const VRurl = testingarray;
    const { presentationID, slideID } = this.props.match.params;
    const slideRef = firebase.database()
      .ref('presentations')
      .child(presentationID)
      .child('slides')
      .child(slideID)

    slideRef.child('type').set(`${this.props.mediaType}`)

    slideRef.child(`${this.props.mediaType}-contents`).set({
      VRurl
    })
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
    console.log(displayArray)
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
                      <a href={`${media.url}`}>{media.description}<br />{media.name} <hr></hr> </a>
                    </div>
                    )
                  }
                </div>
              </div>
            <hr></hr>
              <div className="margin-top-sm">
                <button className="button is-primary"
                  onClick={this.createTable} >Create
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
