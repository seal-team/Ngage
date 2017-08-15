import React, { Component } from 'react'
import AddSlides from '../AddSlides'
import firebase from 'firebase'

class Timeline extends Component {
  constructor() {
    super()
    this.state = {
      slides: null,
      slidesCount: 0,
      uid: null,
      activeSlide: null,
      currentPres: null
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({uid: user.uid})
        console.log('user.uid', user.uid)

        const activePresentation = firebase.database()
          .ref('users')
          .child(user.uid)
          .child('activePresentation')

        activePresentation.on('value', (snapshot) => {
          const value = snapshot.val()

          this.setState({currentPres: value})

          const slides = firebase.database()
            .ref('presentations')
            .child(value)
            .child('slides')
          
          slides.on('value', (snapshot) => {
            const values = snapshot.val()
            console.log('slides', values)
            this.setState({slides: values})
          })
        })
      } else {
        this.setState({uid: null})
      }
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const activePresentation = firebase.database()
      .ref('users')
      .child(this.state.uid)
      .child('activePresentation')

    activePresentation.on('value', (snapshot) => {
      const value = snapshot.val()
      const slides = firebase.database()
        .ref('presentations')
        .child(value)
        .child('slides')
      
      slides.push({
        number: this.state.slidesCount
        // add content here...
      })
    })

    this.setState({ slidesCount: this.state.slidesCount++ })
  }

  activateSlide = key => {
    console.log('key is:  ', key)
    this.setState({activeSlide: key})
    
    const currPres = firebase.database()
      .ref('presentations')
      .child(this.state.currentPres)
      .child('active')
    currPres.set({slide: this.state.activeSlide})
    // console.log('slide', this.state.activeSlide)
    console.log('currentpres', currPres)
    // console.log('key', key.target)
  }

  render() {
    const slides = this.state.slides
    const activeSlide = this.state.activeSlide
    return (
      <div>
        <div className="timeline-strip">
          <div className="left-arrow-btn">
            <span className="icon">
              <i className="fa fa-chevron-circle-left"></i>
            </span>
          </div>
          {
            slides && Object.keys(slides).map(slide => (
              <div className={`timeline-slide ${activeSlide === slide && 'active-slide'}`} key={slide}
                onClick={() => this.activateSlide(slide)}>
                  <text>{slides[slide].number}</text>
              </div>
            ))
          }

          <div className="plus-slide-btn"
            onClick={this.handleSubmit}>
            <span className="icon">
              <i className="fa fa-plus-square-o"></i>
            </span>
          </div>

          <div className="right-arrow-btn">
            <span className="icon">
              <i className="fa fa-chevron-circle-right"></i>
            </span>
          </div>
        </div>
      </div>
    )
  }
}

export default Timeline
