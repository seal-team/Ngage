/*
Modal that let you upload the file to firebase storage
*/
import React, { Component } from 'react'
import { connect } from 'react-redux'
import firebase from 'APP/fire'

class VRUploader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      file: {},
      file2: {},
      mediaDescription: '',
      newMediaKey: ''
    }
  }
  componentDidMount() {
    this.listenForFile()
    this.listenForFile2()
  }
  listenForFile = (e) => {
    const uploader = document.getElementById('upload')
    const fileButton = document.getElementById('fileButton')
        // listen for file selection
    fileButton.addEventListener('change', (e) => {
            // get file and put it on state
      const file = e.target.files[0]
      this.setState({ file })
    })
  }
  listenForFile2 = (e) => {
    const uploader = document.getElementById('upload2')
    const fileButton = document.getElementById('fileButton2')
        // listen for file selection
    fileButton.addEventListener('change', (e) => {
            // get file and put it on state
      const file2 = e.target.files[0]
      this.setState({ file2 })
    })
  }
  mediaNameHandleChange = (e) => {
    this.setState({ mediaDescription: e.target.value })
  }

  submitFile = () => {
    const uploader = document.getElementById('upload')
    const uploader2 = document.getElementById('upload2')
    // grab the selected file from state
    const file = this.state.file
    const file2 =this.state.file2
    // grab the description
    const description = this.state.mediaDescription
    // put the stuff on the cloud
    const storageRef = firebase.storage().ref('/' + this.props.mediaType + '/' + file.name)
    const storageRef2 = firebase.storage().ref('/' + this.props.mediaType + '/' + file2.name)
    const task = storageRef.put(file)
    const task2 = storageRef2.put(file2)
    // select a new Key
    const newMediaKey = firebase.database().ref().child(file.name.split('.')[0] + '/').push().key
    console.log('this is mediakey', newMediaKey)
    // task take care of progress bar, if sucessful it'll update the database with corrosponding information.
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
          const newMediaData = {
            name: file.name,
            url: downloadUrl,
            uid: this.props.user,
            description,
          }
          firebase.database().ref('Media')
            .child('VR')
            .child(newMediaKey)
            .update(newMediaData)
        }
    )
    task2.on('state_changed',
        function progress(snapshot) {
            const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            uploader2.value = percentage
        },
        function error(err) {
            alert(err)
        },
        () => {
            const downloadUrl2 = task2.snapshot.downloadURL
            const updatepath = ('Media/VR/' + newMediaKey)
            const newMediaData2 = { url2: downloadUrl2 }
            firebase.database().ref('Media')
            .child('VR')
            .child(newMediaKey)
            .update(newMediaData2)
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
                            <div className="control model">
                                <progress className="progress is-medium is-primary" value="0" max="100" id="upload">0%</progress>
                                <input type="file" value="upload" id="fileButton" />
                            </div>
                            <div className="control material">
                                <progress className="progress is-medium is-primary" value="0" max="100" id="upload2">0%</progress>
                                <input type="file" value="upload2" id="fileButton2" />
                            </div>
                            <div>
                                <input type="text" id="mediatitle" placeholder="title and description" onChange={this.mediaNameHandleChange} />
                            </div>
                        </div>

                        <div className="margin-top-sm">
                            <button className="button is-primary"
                                onClick={() => { this.submitFile() }} >Submit
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

export default connect(mapState)(VRUploader)
