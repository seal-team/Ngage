import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import firebase from 'APP/fire'
import {Entity, Scene} from 'aframe-react'
import ReactDOM from 'react-dom'

class VRViewer extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  render() {
    let currentscale
    AFRAME.registerComponent('set-camera-top', {
      schema: {
        on: { type: 'string' },
        target: { type: 'selector' },
        dur: { type: 'number', default: 0 }
      },
      init: function() {
        const data = this.data
        const el = this.el

        el.addEventListener(data.on, function() {
          setTimeout(function() {
        // Set camera.
            data.target.setAttribute('position', '10 8 10')
            data.target.setAttribute('rotation', '-28 45 0')
          }, data.dur)
        })
      }
    })
    AFRAME.registerComponent('set-camera-bottom', {
      schema: {
        on: { type: 'string' },
        target: { type: 'selector' },
        dur: { type: 'number', default: 0 }
      },
      init: function() {
        const data = this.data
        const el = this.el

        el.addEventListener(data.on, function() {
          setTimeout(function() {
        // Set camera.
            data.target.setAttribute('position', '10 -8 10')
            data.target.setAttribute('rotation', '28 45 0')
          }, data.dur)
        })
      }
    })
    AFRAME.registerComponent('zoom-in', {
      schema: {
        on: { type: 'string' },
        target: { type: 'selector' },
        dur: { type: 'number', default: 0 }
      },
      init: function() {
        const data = this.data
        const el = this.el

        el.addEventListener(data.on, () => {
          if (currentscale) {
            currentscale = currentscale.split(' ').map((el) => ((Number(el) + 0.3))).join(' ')
          } else {
            currentscale = data.target.attributes.scale.nodeValue.split(' ').map((el) => ((Number(el) + 0.3))).join(' ')
          }
          console.log(currentscale)
                    // Set camera.
          data.target.setAttribute('scale', currentscale)
        })
      }
    })
    AFRAME.registerComponent('zoom-out', {
      schema: {
        on: { type: 'string' },
        target: { type: 'selector' },
      },
      init: function() {
        const data = this.data
        const el = this.el
        el.addEventListener(data.on, () => {
          if (currentscale) {
            currentscale = currentscale.split(' ').map((el) => ((Number(el) - 0.3))).join(' ')
          } else {
            currentscale = data.target.attributes.scale.nodeValue.split(' ').map((el) => ((Number(el) - 0.3))).join(' ')
          }
          console.log(currentscale)
                    // Set camera.
          data.target.setAttribute('scale', currentscale)
        })
      }
    })

    return (
            <Scene>
                    <a-assets>
                        {/* <!-- a-assets will load all the components at once to reduce lag --> */}
                        <a-asset-item id="object" src='../../../public/audioptimised02.obj'></a-asset-item>
                        <a-asset-item id="material" src='../../../public/audioptimised02.mtl'></a-asset-item>
                        <img id='camera-icon' src='../../../public/video-camera-icon.png'></img>
                        <img id='zoom-in' src='../../../public/top.png'></img>
                        <img id='zoom-out' src='../../../public/bottom.png'></img>

                        <audio id="click-sound" crossorigin="anonymous" src="https://cdn.aframe.io/360-image-gallery-boilerplate/audio/click.ogg"></audio>

                        {/* <!-- this creates a template that makes the buttons pop-out when you click and it calls the AFRAME component in changeView --> */}
                        <script id="toplink" type="text/html">
                            <Entity className="link" geometry="primitive: circle; height: 1; width: 1" material="shader: flat; src: ${thumb}" event-set__1="_event: mousedown; scale: 1 1 1"
                                event-set__2="_event: mouseup; scale: 1.2 1.2 1" event-set__3="_event: mouseenter; scale: 1.2 1.2 1" event-set__4="_event: mouseleave; scale: 1 1 1"
                                set-camera-top="on: click; target: #camera" sound="on: click; src: #click-sound">
                            </Entity>
                        </script>
                        <script id="bottomlink" type="text/html">
                            <Entity className="link" geometry="primitive: circle; height: 1; width: 1" material="shader: flat; src: ${thumb}" event-set__1="_event: mousedown; scale: 1 1 1"
                                event-set__2="_event: mouseup; scale: 1.2 1.2 1" event-set__3="_event: mouseenter; scale: 1.2 1.2 1" event-set__4="_event: mouseleave; scale: 1 1 1"
                                set-camera-bottom="on: click; target: #camera" sound="on: click; src: #click-sound">
                            </Entity>
                        </script>
                        <script id="zoomin" type="text/html">
                            <Entity className="link" geometry="primitive: circle; height: 1; width: 1" material="shader: flat; src: ${thumb}" event-set__1="_event: mousedown; scale: 1 1 1"
                                event-set__2="_event: mouseup; scale: 1.2 1.2 1" event-set__3="_event: mouseenter; scale: 1.2 1.2 1" event-set__4="_event: mouseleave; scale: 1 1 1"
                                zoom-in="on: click; target: #builded-object" sound="on: click; src: #click-sound">
                            </Entity>
                        </script>
                        <script id="zoomout" type="text/html">
                            <Entity className="link" geometry="primitive: circle; height: 1; width: 1" material="shader: flat; src: ${thumb}" event-set__1="_event: mousedown; scale: 1 1 1"
                                event-set__2="_event: mouseup; scale: 1.2 1.2 1" event-set__3="_event: mouseenter; scale: 1.2 1.2 1" event-set__4="_event: mouseleave; scale: 1 1 1"
                                zoom-out="on: click; target: #builded-object" sound="on: click; src: #click-sound">
                            </Entity>
                        </script>
                    </a-assets>

                    {/* <!-- this will load the model --> */}
                    <a-obj-model id='builded-object' src="#object" mtl="#material" rotate='0 0 0' position='0,0,0' scale="1 1 1">
                        {/* <!-- a-obj-model will load the model. We're only going to use obj and mtl--> */}
                        <a-animation attribute='rotation' repeat='indefinite' easing='linear' dur='50000' to='0 360 0'></a-animation>
                    </a-obj-model>

                    {/* <!-- button area(top camera, zoom-in, zoom-out) --> */}
                    <Entity id="links" layout="type: line; margin: 1.5" position="-2 7 -2">
                        <Entity template="src: #toplink" data-thumb="#camera-icon" scale=".7 .7 .7"></Entity>
                        <Entity template="src: #zoomin" data-thumb="#zoom-in" scale=".7 .7 .7"></Entity>
                        <Entity template="src: #zoomout" data-thumb="#zoom-out" scale=".7 .7 .7"></Entity>
                    </Entity>
                    {/* <!-- button for bottom camera angle --> */}
                    <Entity id="links" layout="type: line; margin: 1.5" position="2 -8 2">
                        <Entity template="src: #bottomlink" data-thumb="#camera-icon" scale=".7 .7 .7"></Entity>
                    </Entity>
                    {/* <!-- this is the inital camera --> */}
                    <a-camera id='camera' active='true' position='10 0 10' userHeight='1.6' zoom='1' rotation='0 45 0'>
                        <a-cursor id='cursor' color='red' animation__click="property: scale; startEvents: click; from: 0.1 0.1 0.1; to: 1 1 1; dur: 150"
                            animation__fusing="property: fusing; startEvents: fusing; from: 1 1 1; to: 0.1 0.1 0.1; dur: 1500" event-set__1="_event: mouseenter; color: springgreen"
                            event-set__2="_event: mouseleave; color: red" fuse="true" raycaster="objects: .link"></a-cursor>
                    </a-camera>

                </Scene>
    )
  }
}
export default withRouter(VRViewer)