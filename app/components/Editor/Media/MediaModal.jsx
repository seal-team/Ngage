/*

Dummy Component for Media
is Modal for uploading different medias

*/
import React from 'react'

const MediaModal = ({mediaType, handleModal, handleUpdateModal}) => (
    <div className='modal is-active'>
        <div className="modal-background"></div>
        <div className="modal-card">
            <section className="modal-card-body">
                <div className="field">
                    <label className="label has-text-left">{mediaType}</label>
                    <div className="control">
                        {mediaType} STUFF map stuff in data base use Media Object from bulma
                        {/* <input className="input" type="text" name="newPresentation" placeholder="Enter Name" onChange={this.handleChange} value={this.state.newPresentation} /> */}
                    </div>
                </div>

                <div className="margin-top-sm">
                    <button className="button is-primary"
                        onClick={this.handleSubmit} >Create
                    </button>
                    <span> </span>

                    <button className="button is-primary"
                        onClick={() => {
                            handleModal();
                            handleUpdateModal();
                        }}>
                        Upload
                    </button>
                    <span> </span>

                    <button className="button"
                        onClick={() => { handleModal() }}> Close
                    </button>
                </div>
            </section>
        </div>
    </div>
)

export default MediaModal
