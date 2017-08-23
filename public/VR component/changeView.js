/* global AFRAME */

/**
 * Component that listens to an event, change camera position and rotation(angle)
 */
let currentscale
let topcamera = false
let bottomcamera = false
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
      if (topcamera === false) {
        data.target.setAttribute('position', '10 8 10')
        data.target.setAttribute('rotation', '-28 45 0')
      } else {
        data.target.setAttribute('position', '10 0 10')
        data.target.setAttribute('rotation', '0 45 0')
      }
      topcamera = !topcamera
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
      if (bottomcamera === false) {
        data.target.setAttribute('position', '10 -8 10')
        data.target.setAttribute('rotation', '28 45 0')
      } else {
        data.target.setAttribute('position', '10 0 10')
        data.target.setAttribute('rotation', '0 45 0')
      }
      bottomcamera = !bottomcamera
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
        currentscale = currentscale.split(' ').map((el) => ((Number(el) * 1.3))).join(' ')
      } else {
        currentscale = data.target.attributes.scale.nodeValue.split(' ').map((el) => ((Number(el) + 0.3))).join(' ')
      }
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
        currentscale = currentscale.split(' ').map((el) => ((Number(el) / 1.3))).join(' ')
      } else {
        currentscale = data.target.attributes.scale.nodeValue.split(' ').map((el) => ((Number(el) - 0.3))).join(' ')
      }
      data.target.setAttribute('scale', currentscale)
    })
  }
})
AFRAME.registerComponent('zoom-extra-in', {
  schema: {
    on: { type: 'string' },
    target: { type: 'selector' },
  },
  init: function() {
    const data = this.data
    const el = this.el
    el.addEventListener(data.on, () => {
      if (currentscale) {
        currentscale = currentscale.split(' ').map((el) => ((Number(el) * 10))).join(' ')
      } else {
        currentscale = data.target.attributes.scale.nodeValue.split(' ').map((el) => ((Number(el) - 0.3))).join(' ')
      }
      data.target.setAttribute('scale', currentscale)
    })
  }
})
AFRAME.registerComponent('zoom-extra-out', {
  schema: {
    on: { type: 'string' },
    target: { type: 'selector' },
  },
  init: function() {
    const data = this.data
    const el = this.el
    el.addEventListener(data.on, () => {
      if (currentscale) {
        currentscale = currentscale.split(' ').map((el) => ((Number(el) / 10))).join(' ')
      } else {
        currentscale = data.target.attributes.scale.nodeValue.split(' ').map((el) => ((Number(el) - 0.3))).join(' ')
      }
      data.target.setAttribute('scale', currentscale)
    })
  }
})
