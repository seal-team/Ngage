/* global AFRAME */

/**
 * Component that listens to an event, change camera position and rotation(angle)
 */
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
    }
        )
  }
})
