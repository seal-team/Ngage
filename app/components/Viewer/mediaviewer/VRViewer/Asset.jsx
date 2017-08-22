import React from 'react'
import {Entity} from 'aframe-react'

const Assets = props => (
      <a-assets>
            {/* <!-- a-assets will load all the components at once to reduce lag --> */}
            <a-asset-item id="object" crossOrigin="anonymous" src='../../../../../public/audioptimised02.obj'></a-asset-item>
            <a-asset-item id="material" crossOrigin="anonymous" src='../../../../../public/audioptimised02.mtl'></a-asset-item>
            <img id='camera-icon' src='../../../../../public/video-camera-icon.png'></img>
            <img id='zoom-in' src='../../../../../public/top.png'></img>
            <img id='zoom-out' src='../../../../../public/bottom.png'></img>

            <audio id="click-sound" crossOrigin="anonymous" src="https://cdn.aframe.io/360-image-gallery-boilerplate/audio/click.ogg"></audio>
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
)

export default Assets
