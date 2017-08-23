import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import firebase from 'APP/fire'

import { getPresentationTitle, slideMetadata } from '../helpers'

export default class LivePresentation extends Component {
  constructor() {
    super()
    this.state ={
      presentations: {},
      activeSlides: new Set([]),
      presentationTitles: new Set([]),
      slidesMetadata: [],
      firstSlides: new Set([]),
      presentationIDs: new Set([])
    }
  }

  componentDidMount() {
    firebase.database()
      .ref('activePresentations')
      .on('value', snapshot => {
        const presentations = snapshot.val()
        this.setState({ presentations })
      })


    // firebase.database()
    //   .ref('activePresentations')
    //   .on('value', snapshot => {
    //     const presentations = snapshot.val()
        
    //     for (const presentation in presentations) {
    //       this.setState(prevState => ({
    //         presentationTitles: new Set([...prevState.presentationTitles, presentations[presentation]]),
    //         presentationIDs: new Set([...prevState.presentationIDs, presentation])
    //       }))

    //       firebase.database()
    //         .ref(`presentations/${presentation}/slides`).limitToFirst(1)
    //         .once('value')
    //         .then(res => res.val())
    //         .then(slide => {
    //           // console.log('\n\n----  FIRST SLIDE ----', slide, '\n\n')
    //           this.setState(prevState => ({ firstSlides: new Set([...prevState.firstSlides, slide]) }))
    //         })

          // LISTEN TO ACTIVE SLIDE PER PRESENTATION
          // firebase.database()
          // .ref(`presentations/${presentation}/active`)          
          // .on('value', snapshot => {
          //   const activeSlideID = snapshot.val(), newObj = {}
          //   firebase.database()
          //     .ref(`presentations/${presentation}/slides/${activeSlideID}`)
          //     .once('value')
          //     .then(res => res.val())
          //     .then(activeSlide => {
          //       this.setState(prevState => ({
          //         activeSlides: new Set([...prevState.activeSlides, activeSlide])
          //       }))
          //     })
          // })
      //   }
      // })
  }

  render() {
    // const { presentationTitles, presentations, activeSlides, firstSlides, presentationIDs } = this.state
    // console.log('first slide set', firstSlides)
    // const presentationArr = Array.from(presentationTitles)
    // const slideArr = Array.from(activeSlides)
    // const firstSlidesArr = Array.from(firstSlides)
    // const presentationIDsArr = Array.from(presentationIDs)
    // console.log('presentationIDs ', presentationIDs)
    const { presentations } = this.state
    return (
      <div>
        <h1 className="title live-title">Live Presentations</h1>
        <div className="line-after-title"></div>
        
        {presentations && Object.keys(presentations).map(presentationID => (
          <div className="columns">
            <div className="column"></div>
            <div className="column">
              <Link to={`/view/${presentationID}`}>
                <div className="live-slide-box column">
                  <h1 className="pres-name-box subtitle">{presentations[presentationID]}</h1>
                </div>
              </Link>
            </div>
            <div className="column"></div>
            {/*<div className="column link-to-pres-container">
              <Link to={`/view/`}
                className="link-to-presentation">
                  {presentation}
              </Link>
            </div>*/}
          </div>
        ))}

      </div>
    )
  }
}
