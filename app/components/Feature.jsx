import React from 'react'
export class Feature extends React.Component {
  render() {
    return (
        <section id ="feature" className="section-padding pre-footer-padding">
            <div className="container">
                    <div className="header-section column text-center subtitle">
                        <h2>Features</h2>
                        <br/>
                        <p className = "description">VR-Enabled 3-D Slides, Interactive Quizzes
                            <br/> Live Chats, Notes</p>
                        <hr className="bottom-line"/>
                    </div>
                    <div className="columns center-object is-mutiline">
                        <div className="column is-one-third fea">
                            <div className="heading pull-right">
                            <h4>Latest Technologies</h4>
                            <p>Cloud Storage Powered by Firebase</p>
                            </div>
                            <div className="fea-img pull-left">
                            <i className="fa fa-cloud"></i>
                            </div>
                        </div>
                        <div className="column is-one-third fea">
                            <div className="heading pull-right">
                            <h4>Interactive Slides</h4>
                            <p>Create Quizzes, Chat with Your Viewers,<br/>Take Notes</p>
                            </div>
                            <div className="fea-img pull-left">
                            <i className="fa fa-commenting"></i>
                            </div>
                        </div>
                        <div className="column is-one-third fea">
                            <div className="heading pull-right">
                            <h4>Virtual Reality</h4>
                            <p>Upload 3-D Images and View in Virtual Reality</p>
                            </div>
                            <div className="fea-img pull-left">
                            <img src="https://cdn4.iconfinder.com/data/icons/electronic-and-storage-devices/512/cardboard_glasses_virtual_reality_3D_VR-512.png" className="fa vr-icon"></img>
                            </div>
                        </div>
                    </div>
            </div>
        </section>
    )
  }
}
