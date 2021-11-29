import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import FocusTrap from 'focus-trap-react'
import {isEscEvent} from "../../utils";


const Modal = ({isOpen, onClose, ...props}) => {

  const _handleEscPress = (evt) => {
    isEscEvent(evt, () => {
      onClose();
    })
  };

  const _handleCloseClick = (evt) => {
    evt.preventDefault();
    onClose();
  };

  useEffect(() => {

    if (!isOpen) {
      return
    }

    document.addEventListener(`keydown`, _handleEscPress)
    document.body.style.overflow = `hidden`;

    return () => {
      document.removeEventListener(`keydown`, _handleEscPress)
      document.body.style.overflow = `auto`;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])


  return (
    isOpen &&
    <FocusTrap>
      <section className="modal" onClick={_handleCloseClick}>
        <div className="modal__wrapper" onClick={(evt) => evt.stopPropagation()}>
          <button className="modal__close" onClick={_handleCloseClick} aria-label="Close">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.77 11.835L6.00004 7.05754L1.23004 11.835L0.165039 10.77L4.94254 6.00004L0.165039 1.23004L1.23004 0.165039L6.00004 4.94254L10.77 0.172539L11.8275 1.23004L7.05754 6.00004L11.8275 10.77L10.77 11.835Z"
                fill="#9F9E9E"/>
            </svg>
          </button>
          {props.children}
        </div>
      </section>
    </FocusTrap>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,

};

export default Modal;


