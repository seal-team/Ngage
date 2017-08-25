import React from 'react'
export class Feature extends React.Component {
  render() {
    return (
        <section id ="feature" className="section-padding">
            <div className="container">
                    <div className="header-section column text-center subtitle">
                        <h2>Features</h2>
                        <p className = "description">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem nesciunt vitae, 
                            <br/> maiores, magni dolorum aliquam.</p>
                        <hr className="bottom-line"/>
                    </div>
                    <div className="columns center-object is-mutiline">
                        <div className="column is-one-third fea">
                            <div className="heading pull-right">
                            <h4>Latest Technologies</h4>
                            <p>Donec et lectus bibendum dolor dictum auctor in ac erat. Vestibulum egestas sollicitudin metus non urna in eros tincidunt convallis id id nisi in interdum.</p>
                            </div>
                            <div className="fea-img pull-left">
                            <i className="fa fa-cloud"></i>
                            </div>
                        </div>
                        <div className="column is-one-third fea">
                            <div className="heading pull-right">
                            <h4>Toons Background</h4>
                            <p>Donec et lectus bibendum dolor dictum auctor in ac erat. Vestibulum egestas sollicitudin metus non urna in eros tincidunt convallis id id nisi in interdum.</p>
                            </div>
                            <div className="fea-img pull-left">
                            <i className="fa fa-commenting"></i>
                            </div>
                        </div>
                        <div className="column is-one-third fea">
                            <div className="heading pull-right">
                            <h4>Award Winning Design</h4>
                            <p>Donec et lectus bibendum dolor dictum auctor in ac erat. Vestibulum egestas sollicitudin metus non urna in eros tincidunt convallis id id nisi in interdum.</p>
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
