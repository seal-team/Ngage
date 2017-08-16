/*
Modal that let you upload the file to firebase storage
*/
import React, { Component } from 'react'
import firebase from 'APP/fire'

export default class Uploader extends Component {
    constructor() {
        super()
        this.state = {
        }
    }
    componentDidMount() {
        this.uploadFile()
    }
    uploadFile = (e) => {
        const uploader = document.getElementById('upload')
        const fileButton = document.getElementById('fileButton')
        // listen for file selection
        fileButton.addEventListener('change', function (e) {
            // get file
            console.log('HERE')
            const file = e.target.files[0]
            // create a storage ref
            const storageRef = firebase.storage().ref(file.name)
            const task = storageRef.put(file)
            task.on('state_changed',
                function progress(snapshot) {
                    const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    uploader.value = percentage
                },
                function error(err) {
                },
                function complete() {
                }
            )
        })
    }

    render() {
        return (
            <div className='modal is-active'>
                <div className="modal-background"></div>
                <div className="modal-card">
                    <section className="modal-card-body">
                        <div className="field">
                            <label className="label has-text-left">Upload {this.props.mediaType}</label>
                            <div className="control">
                                <progress className="progress is-medium is-primary" value="0" max="100" id="upload">0%</progress>
                                <input type="file" value="upload" id="fileButton" />
                            </div>
                        </div>

                        <div className="margin-top-sm">
                            {/* <button className="button is-primary"
                                onClick={this.uploadFile} >UPLOAD
                            </button>
                            <span> </span> */}
                            <button className="button"
                                onClick={() => { this.props.handleUpdateModal() }}>Close
                            </button>
                        </div>
                    </section>
                </div>
            </div>
        )
    }
}
