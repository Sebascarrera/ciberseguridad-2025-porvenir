import React, { Component } from 'react'

import PropTypes from 'prop-types'

import { Stage, Layer, Group, Image } from 'react-konva'

import Konva from 'konva'

import { Howl } from 'howler'

import Slice from './Slice'

const ARROW_VIRTUAL_WIDTH = 600;

class Wheel extends Component {

  constructor(props) {
    super(props)

    this.state = {
      wheelRotation: 0,
      angularRotation: 0,
      pointerImage: null,
    }

    this.anim = null
    this.angularVelocities = []
    this.angularVelocity = 0
    this.lastRotation = 0
    this.finished = false
    Konva.angleDeg = false
    this.rotating = false
    this.activeWedge = null
    this.clapAudio = new Howl({
      src: [require('../../../assets/sounds/clap_ruleta.mp3')]
    })


  }

  componentDidMount() {
    this.control = false
    this.anim = new Konva.Animation(frame => this._animateFrame(frame), this.layer)
    this.anim.start()

    var imageObj = new window.Image()
    imageObj.src = require('../../../assets/img/wheel/flecha.png')
    imageObj.onload = () => {
      this.setState({ pointerImage: imageObj })
    }
    imageObj.onerror = error => {
      console.log('Error: ', error)
    }

    var backgroundImageObj = new window.Image()
    backgroundImageObj.src = require('../../../assets/img/wheel/circulo.png')
    backgroundImageObj.onload = () => {
      this.setState({ backgroundWheelImage: backgroundImageObj })
    }
    backgroundImageObj.onerror = error => {
      console.log('Error: ', error)
    }

    window.addEventListener('resize', this.updateSize);

  }

  componentWillUnmount() {
    this.anim.stop()
  }

  _animateFrame(frame) {

    if (!this.target || !this.wheelGroup) return

    const angularVelocityChange = this.angularVelocity * frame.timeDiff * (1 - this.props.friction) / 1000
    this.angularVelocity -= angularVelocityChange;

    const shape = this.stage.getIntersection({
                x: this.stage.getWidth() / 2,
                y: (this.stage.getWidth() / 2) - (83 * this.scale) - 1
            });

    if (this.control) {
      if (this.angularVelocities.length > 10) this.angularVelocities.shift()
      this.angularVelocities.push( ( this.wheelGroup.getRotation() - this.lastRotation) * 1000 / frame.timeDiff )
    } else {

      const diff = frame.timeDiff * this.angularVelocity / 1000;

      if (diff > 0.0002 || diff < -0.0002) {
        this.wheelGroup.rotate(diff)
      } else if (!this.finished && !this.control) {

          if (shape) {
            this.rotating = false
            this.finished = true
            this.props.onSelectedWinnerSlice(shape.parent.index)
          }

      }

    }

    this.lastRotation = this.wheelGroup ? this.wheelGroup.getRotation() : null

    if (shape ) {
        if (shape && (!this.activeWedge || (shape._id !== this.activeWedge._id))) {
          this.clapAudio.play()
          this.activeWedge = shape
        }
    }
  }

  _getAverageAngularVelocity() {
      var total = 0;
      var len = this.angularVelocities.length;

      if(len === 0) return 0

      for(var n = 0; n < len; n++) {
          total += this.angularVelocities[n];
      }

      return total / len
  }

  _onMouseDown(event) {
    if (this.rotating) return

    this.control = true
    this.target = event.target.parent.children[0]
    this.finished = false

  }

  _onMouseMove(event) {

    const pos = event.target.getStage().getPointerPosition()

    if (this.control && pos && this.target) {

      const x = pos.x - this.props.width / 2
      const y = pos.y - this.props.width / 2

      const atan = Math.atan(y / x)
      const rotation = x >= 0 ? atan : atan + Math.PI

      this.setState({ wheelRotation: rotation - this.target.startRotation - this.target.getAngle() / 2 })
    }

  }

  _onMouseUp(event) {

    if (this.rotating) return

    this.angularVelocity = this._getAverageAngularVelocity() * 5
    this.control = false
    this.rotating = true


    if(this.angularVelocity > 20) {
        this.angularVelocity = 20
    }
    else if(this.angularVelocity < -20) {
        this.angularVelocity = -20
    }

    this.angularVelocities = []
  }

  _onMouseOut(event) {

  }

  updateSize() {

    if (this.stage) {

      const scale = this.props.width / ARROW_VIRTUAL_WIDTH;

      this.stage.width(this.props.width * scale);
      this.stage.height(this.props.width * scale);
      this.stage.scale({ x: scale, y: scale });

    }

  }

  render() {

    this.scale = this.props.width / ARROW_VIRTUAL_WIDTH;

    const currentWidth = this.props.width;

    const slices = this.props.slices.map( (slice, n, values) => {

      const angle = 2 * Math.PI / values.length
      const rotation = 2 * n * Math.PI / values.length
      const radius = currentWidth / 2

      return (<Slice
                scale={this.scale}
                isEnabled={slice.isEnabled}
                key={ n }
                image={ slice.icon }
                color={ slice.color }
                radius={ radius }
                rotation={ rotation }
                angle={ angle } /> )
    })


    return (
      <Stage
        style={ { ...this.props.style, display: 'flex', justifyContent: 'center' } }
        width={currentWidth}
        height={currentWidth}

        ref={ node => { this.stage = node } }>

        <Layer ref={ ref => this.layer = ref }>

          <Group
            ref={ node => { this.wheelGroup = node } }
            rotation={ this.state.wheelRotation }
            x={ currentWidth / 2 }
            y={ currentWidth / 2 }
            onMouseDown={ e => this._onMouseDown(e) }
            onMouseMove={ e => this._onMouseMove(e) }
            onMouseUp={ e => this._onMouseUp(e) }
            onMouseOut={ e => this._onMouseOut(e) }
            onTouchStart={ e => this._onMouseDown(e) }
            onTouchMove={ e => this._onMouseMove(e) }
            onTouchEnd={ e => this._onMouseUp(e) } >
            { slices }
          </Group>
          <Image
            scaleX={this.scale}
            scaleY={this.scale}
            image={ this.state.pointerImage }
            x={ (currentWidth / 2) - (64 * this.scale) }
            y={ (currentWidth / 2) - (83 * this.scale) }
            width={128}
            height={166} />

          {/*{ this.stage && (
            <Circle
              radius={1}
              fill="red"
              x={this.stage.getWidth() / 2}
              y={(this.stage.getWidth() / 2) - (83 * this.scale)} />
          )}
*/}
          <Image
            listening={false}
            image={ this.state.backgroundWheelImage }
            x={0}
            y={0}
            width={currentWidth}
            height={currentWidth} />
        </Layer>
      </Stage>
    );
  }

}

Wheel.propTypes = {
  slices: PropTypes.array.isRequired,
  friction: PropTypes.number.isRequired,
  onSelectedWinnerSlice: PropTypes.func.isRequired,
}

export default Wheel
