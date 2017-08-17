/*
Modal that let you upload the file to firebase storage
*/
import React, { Component } from 'react'
import { connect } from 'react-redux'
import firebase from 'APP/fire'

class Uploader extends Component {
    constructor() {
        super()
        this.state = {
            file: {},
            mediaDescription: ''
        }
        this.listenForFile = this.listenForFile.bind(this)
        this.submitFile = this.submitFile.bind(this)
        this.mediaNameHandleChange = this.mediaNameHandleChange.bind(this)
    }
    componentDidMount() {
        this.listenForFile()
    }
    listenForFile(e) {
        const uploader = document.getElementById('upload')
        const fileButton = document.getElementById('fileButton')
        // listen for file selection
        fileButton.addEventListener('change', (e) => {
            // get file and put it on state
            const file = e.target.files[0]
            this.setState({ file })
        })
    }
    mediaNameHandleChange(e) {
        this.setState({ mediaDescription: e.target.value })
    }

    submitFile() {
        const uploader = document.getElementById('upload')
        const file = this.state.file
        const description = this.state.mediaDescription
        console.log('this is the description', this.state.mediaDescription)
        console.log('lets see what the file is', file)
        const storageRef = firebase.storage().ref('/' + this.props.mediaType + '/' + file.name)
        const task = storageRef.put(file)
        task.on('state_changed',
            function progress(snapshot) {
                const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                uploader.value = percentage
            },
            function error(err) {
            },
            function complete() {
                const downloadUrl = task.snapshot.downloadURL
                const newMediaKey = firebase.database().ref().child(file.name.split('.')[0] + '/').push().key
                console.log('THIS IS THE USER ID', this.props.user)
                const update = {}
                const newMediaData = {
                    name: file.name,
                    url: downloadUrl,
                    uid: this.props.user,
                    description,
                }
                firebase.database().ref(this.props.mediaType + '/' + newMediakey)
                console.log('STUPID SAID WHAT!', downloadUrl)
            }
        )
        // })
    }

    render() {
        console.log('props in render ', this.props)
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
