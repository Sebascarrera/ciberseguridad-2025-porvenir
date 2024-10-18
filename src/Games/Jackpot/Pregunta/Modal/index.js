import React, { Component } from 'react'

import Modal from 'react-modal'

import rightAnswerImage from '../../../../assets/img/correcto.svg'
import wrongAnswerImage from '../../../../assets/img/fallaste.svg'

import PropTypes from 'prop-types'

import './styles.css'

class AnswerModal extends Component {

  render() {
    return (
      <Modal
        ariaHideApp={false}
        isOpen={ this.props.open }
        className="Modal"
        overlayClassName="Overlay">
        <div className="ContainerAnswerModal">
          <img src={ this.props.right ? rightAnswerImage : wrongAnswerImage } />
          <div className="ContainerAnswerModalLabel">
            { this.props.right ? "Es correcto" : "Es incorrecto" }
          </div>
        </div>
      </Modal>
    )
  }
}

AnswerModal.propTypes = {
  right: PropTypes.bool,
  open: PropTypes.bool,
}


export default AnswerModal
