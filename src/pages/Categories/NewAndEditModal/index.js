import PropTypes from "prop-types";
import React from "react";
import { Modal } from "reactstrap";

const NewAndEditModal = ({
  show,
  modalValue,
  onSubmitClick,
  onCloseClick,
  category,
}) => {
  return (
    <Modal isOpen={show} toggle={onCloseClick} centered={true}>
      <div>Modal</div>
      <p>{typeof(show)}</p>
      <p>{modalValue}</p>
      <p>
        {category.name} {category.id}
      </p>
      <button onClick={() => onSubmitClick(data)}></button>
      <button
        type="button"
        className="btn btn-danger btn-lg ms-2"
        onClick={onCloseClick}
      >
        Cancel
      </button>
    </Modal>
  );
};

NewAndEditModal.propTypes = {
  modalValue: PropTypes.string,
  onCloseClick: PropTypes.func,
  onSubmitClick: PropTypes.func,
  category: PropTypes.any,
  show: PropTypes.any,
};

export default NewAndEditModal;
