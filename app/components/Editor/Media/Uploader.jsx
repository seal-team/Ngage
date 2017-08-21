/*
Modal that let you upload non-VR file to firebase storage
*/
import React, { Component } from 'react'
import { connect } from 'react-redux'
import firebase from 'APP/fire'

class Uploader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      file: {},
      mediaDescription: ''
    }
  }

  componentDidMount() {
    this.listenForFile()
  }

  listenForFile = (e) => {
    const uploader = document.getElementById('upload')
    const fileButton = document.getElementById('fileButton')
        // listen for file selection
    fileButton.addEventListener('change', (e) => {
            // put file on state
      const file = e.target.files[0]
      this.setState({ file })
    })
  }

  mediaNameHandleChange = (e) => {
    this.setState({ mediaDescription: e.target.value })
  }

  // submit file on to cloud and log corresponding data information on database if sucessful.
  submitFile = () => {
    const uploader = document.getElementById('upload')
    const file = this.state.file
    const description = this.state.mediaDescription
    // following two lines put file on cloud.
    const storageRef = firebase.storage().ref('/' + this.props.mediaType + '/' + file.name)
    const task = storageRef.put(file)
    // if sucessful, log data in database with name, url, uid, description.
    task.on('state_changed',
      function progress(snapshot) {
        const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        uploader.value = percentage
      },
      function error(err) {
        alert(err)
      },
      () => {
        const downloadUrl = task.snapshot.downloadURL
        const newMediaKey = firebase.database().ref().child(file.name.split('.')[0] + '/').push().key
        const update = {}
        const newMediaData = {
          name: file.name,
          url: downloadUrl,
          uid: this.props.user,
          description,
        }
        const updatepath = ('Media/' + `${this.props.mediaType}/` + newMediaKey)
        update[updatepath] = newMediaData
        firebase.database().ref().update(update)
      }
    )
  }

  render() {
    return (
            <div className='modal is-active' >
                <div className="modal-background"></div>
                <div className="modal-card">
                    <section className="modal-card-body">
                        <div className="field">
                            <label className="label has-text-left">Upload {this.props.mediaType}</label>
                            <div className="control">
                                <progress className="progress is-medium is-primary" value="0" max="100" id="upload">0%</progress>
                                <input type="file" value="upload" id="fileButton" />
                            </div>
                            <div>
                                <input type="text" id="mediatitle" placeholder="title and description" onChange={this.mediaNameHandleChange} />
                            </div>
                        </div>
                        <div className="margin-top-sm">
                            <button className="button is-primary"
                                onClick={this.submitFile} >Submit
                            </button>
                            <span> </span>
                            <button className="button"
                                onClick={() => { this.props.handleUpdateModal() }}>Close
                            </button>
                        </div>
                    </section>
                </div>
            </div >
    )
  }
}
const mapState = state => ({
  user: state.user
})

export default connect(mapState)(Uploader)
