import PropTypes from "prop-types";
import React from "react";
import {
  Col,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  FormFeedback,
  Input,
  Form,
} from "reactstrap";

const NewAndEditModal = ({
  show,
  modalValue,
  onSubmitClick,
  onCloseClick,
  category,
}) => {
  return (
    // <Modal isOpen={show} toggle={onCloseClick} centered={true}>
    //   <div>Modal</div>
    //   <p>{typeof(show)}</p>
    //   <p>{modalValue}</p>
    //   <p>
    //     {category.name} {category.id}
    //   </p>
    //   <button onClick={() => onSubmitClick(data)}></button>
    //   <button
    //     type="button"
    //     className="btn btn-danger btn-lg ms-2"
    //     onClick={onCloseClick}
    //   >
    //     Cancel
    //   </button>
    // </Modal>

    <Modal isOpen={show} toggle={onCloseClick} centered={true}>
      <ModalHeader tag="h4">
        {modalValue === "edit" ? "Edit User" : "Add User"}
      </ModalHeader>
      <ModalBody>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            validation.handleSubmit();
            return false;
          }}
        >
          <Row form>
            <Col xs={12}>
              <div className="mb-3">
                <Label className="form-label">Name</Label>
                <Input
                  name="name"
                  type="text"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.name || ""}
                  invalid={
                    validation.touched.name && validation.errors.name
                      ? true
                      : false
                  }
                />
                {validation.touched.name && validation.errors.name ? (
                  <FormFeedback type="invalid">
                    {validation.errors.name}
                  </FormFeedback>
                ) : null}
              </div>
              <div className="mb-3">
                <Label className="form-label">Name Arabic</Label>
                <Input
                  name="nameAr"
                  type="text"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.nameAr || ""}
                  invalid={
                    validation.touched.nameAr && validation.errors.nameAr
                      ? true
                      : false
                  }
                />
                {validation.touched.nameAr && validation.errors.nameAr ? (
                  <FormFeedback type="invalid">
                    {validation.errors.nameAr}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="text-end">
                <button type="submit" className="btn btn-success save-user">
                  Save
                </button>
              </div>
            </Col>
          </Row>
        </Form>
      </ModalBody>
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
