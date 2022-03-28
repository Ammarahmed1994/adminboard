import PropTypes from "prop-types";
import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
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
  setShowModal,
  modalValue,
  onCloseClick,
  category,
}) => {
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      name: (category && category.name) || "",
      nameAr: (category && category.nameAr) || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter Your Name"),
      nameAr: Yup.string().required("Please Enter Your nameAr"),
    }),
    onSubmit: (values) => {
      if (modalValue === "edit") {
        const updateUser = {
          id: category.id,
          name: values.name,
          nameAr: values.nameAr,
        };

        // update user
        console.log(`new`, updateUser);
        validation.resetForm();
        setShowModal(false);
      } else {
        const newUser = {
          id: Math.floor(Math.random() * (30 - 20)) + 20,
          name: values["name"],
          nameAr: values["nameAr"],
        };
        // save new user
        console.log(`new`, newUser);
      }
      setShowModal(false);
    },
  });

  return (
    <Modal isOpen={show} toggle={onCloseClick} centered={true}>
      <ModalHeader tag="h4">
        {modalValue === "edit" ? "Edit Category" : "Add Category"}
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
                <button
                  onClick={onCloseClick}
                  className="btn btn-danger save-user m-2"
                >
                  Cancel
                </button>
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
  category: PropTypes.any,
  show: PropTypes.any,
  setShowModal: PropTypes.func,
};

export default NewAndEditModal;
