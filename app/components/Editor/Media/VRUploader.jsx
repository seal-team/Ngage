/*
Modal that let you upload VR files to firebase storage
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
      file3: {},
      mediaDescription: '',
      newMediaKey: ''
    }
  }
  componentDidMount() {
    this.listenForFile()
    this.listenForFile2()
    this.listenForFile3()
  }
  listenForFile = (e) => {
    const uploader = document.getElementById('upload')
    const fileButton = document.getElementById('fileButton')
        // listen for file selections
    fileButton.addEventListener('change', (e) => {
            // get files and put it on state
      const file = e.target.files[0]
      console.log(file)
      // this.setState({ file })
      this.setState((prevState, props) => ({file}))
    })
  }
  listenForFile2 = (e) => {
    const uploader = document.getElementById('upload2')
    const fileButton = document.getElementById('fileButton2')
        // listen for file selection
    fileButton.addEventListener('change', (e) => {
            // put files on state
      const file2 = e.target.files[0]
      console.log(file2)      
      this.setState((prevState, props) => ({file2}))
    })
  }
  listenForFile3 = (e) => {
    const uploader = document.getElementById('upload3')
    const fileButton = document.getElementById('fileButton3')
        // listen for file selection
    fileButton.addEventListener('change', (e) => {
            // put files on state
      const file3 = e.target.files[0]
      console.log(file3)
      this.setState((prevState, props) => ({file3}))
    })
  }
  mediaNameHandleChange = (e) => {
    this.setState({ mediaDescription: e.target.value })
  }
// need to put this component in another file.
  submitFile = () => {
    const uploader = document.getElementById('upload')
    const uploader2 = document.getElementById('upload2')
    const uploader3 = document.getElementById('upload3')
    // grab the selected files from state
    const file = this.state.file
    const file2 =this.state.file2
    const file3 = this.state.file3
    // grab the description
    const description = this.state.mediaDescription
    // put the files on the Firebase cloud
    const storageRef = firebase.storage().ref('/' + this.props.mediaType + '/' + file.name)
    const storageRef2 = firebase.storage().ref('/' + this.props.mediaType + '/' + file2.name)
    const storageRef3 = firebase.storage().ref('/' + this.props.mediaType + '/' + file3.name)
    const task = storageRef.put(file)
    const task2 = storageRef2.put(file2)
    const task3 = storageRef3.put(file3)
    // select a new Key
    const newMediaKey = firebase.database().ref().child(file.name.split('.')[0] + '/').push().key
    // task take care of progress bar, if sucessful it'll update the database with corrosponding information.
    // information include url, user id, file name and file description.

    // take care of object file of VR rendering.
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
            description: this.state.mediaDescription,
          }
          firebase.database().ref(`Media/VR/${newMediaKey}`)
            .update(newMediaData)
        }
    )

    // keep track of material file for VR.
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
          firebase.database().ref(`Media/VR/${newMediaKey}`)
            .update(newMediaData2)
        }
    )
    // thumbnail
    task3.on('state_changed',
    function progress(snapshot) {
      const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      uploader3.value = percentage
    },
    function error(err) {
      alert(err)
    },
    () => {
      const thumbnailUrl = task3.snapshot.downloadURL
      const updatepath = ('Media/VR/' + newMediaKey)
      const addThumbnail = { thumbnailUrl: thumbnailUrl }
      firebase.database().ref(`Media/VR/${newMediaKey}`)
        .update(addThumbnail)
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
                                Object file (.obj)
                                <progress className="progress is-medium is-primary" value="0" max="100" id="upload">0%</progress>
                                <input type="file" value="upload" id="fileButton" />
                            </div>
                            <hr/>
                            <div className="control material">
                                Material file(.mtl)
                                <progress className="progress is-medium is-primary" value="0" max="100" id="upload2">0%</progress>
                                <input type="file" value="upload2" id="fileButton2" />
                            </div>
                            <hr/>
                            <div className="control ">
                                Thumbnail file(.png/.jpg)
                                <progress className="progress is-medium is-primary" value="0" max="100" id="upload3">0%</progress>
                                <input type="file" value="upload" id="fileButton3" />
                            </div>
                            <hr/>
                            <div>
                                Description
                                <br/>
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
