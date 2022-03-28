import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import MetaTags from "react-meta-tags";
import { Container, Button, Col, Row } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { withTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import moment from "moment";
import axios from "axios";

import { CategoryService } from "services/category.service";
import DeleteModal from "../../components/Common/DeleteModal";
import NewAndEditModal from "./NewAndEditModal/index";
import CategoriesGrid from "./CategoriesGrid/index";

const rows = [
  {
    id: "c1db007f-1cb1-48a0-853f-6b1d20592ff0",
    name: "laptop",
    nameAr: null,
    image:
      "https://i.pinimg.com/564x/20/4e/90/204e905bfc7f55c45f3a0eeddc2431c9.jpg",
    createdAt: "2022-01-22T09:44:45.646Z",
    updatedAt: "2022-01-23T09:44:45.646Z",
  },
  {
    id: "4d8ec94c-0a82-44dc-b2cf-2f4259f9664d",
    name: "Devices",
    nameAr: null,
    image: null,
    createdAt: "2022-01-23T12:39:17.173Z",
    updatedAt: "2022-01-24T12:39:17.176Z",
  },
  {
    id: "bd0ef941-2680-4c39-a36d-e37b3e54ab3c",
    name: "Fashion",
    nameAr: null,
    image: null,
    createdAt: "2022-01-24T12:39:17.787Z",
    updatedAt: "2022-01-25T12:39:17.787Z",
  },
];

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState({});

  const [modal, setModal] = useState(false);
  const [modalValue, setModalValue] = useState("");

  const [deleteModal, setDeleteModal] = useState(false);

  const API_URL = "http://45.77.29.107:4200/api/admin";

  useEffect(() => {
    const fetchData = async () => {
      //   const results = await CategoryService.getCategoryList();
      //   console.log(`results`, results);
      //   const categoriesData = results?.rows;
      //   setCategories(categoriesData);

      //   setCategories(rows);

      const token = {
        token:
          "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IjExNDA1ODY4NzkiLCJwYXNzd29yZCI6IjEyMzQ1NiIsInRpbWUiOiIyMDIyLTAyLTI0VDE0OjI2OjMxKzAyOjAwIiwiaWF0IjoxNjQ1NzA1NTkxfQ.Q-knS04FHm6ZMLMtSdBBXYlvYeZ1m8HY-x-LDrdBuZq9u6Y0OkPW4p9gN0hH1cplVA-UeW9MJhyt6f9xzIqthD8_BS7W_TbUK51UrI3zOzVhTSdlm40vR0psg4A3Fjcqd72sQarn9W75qVqxd9bttok9Nc1jgfKEUP13jVU3PTo",
      };
      axios
        .get(`${API_URL}/catigory/list`, { token })
        .then((response) => console.log(`ress`, response));
    };
    fetchData();
  }, []);

  const columns = [
    {
      name: "Image",
      cell: (row) => (
        <>
          {!row.image ? (
            <div className="avatar-xs">
              <span className="avatar-title rounded-circle">
                {row.name.charAt(0)}
              </span>
            </div>
          ) : (
            <div>
              {row.image !== null ? (
                <img
                  src={row.image}
                  alt=""
                  className="rounded-circle avatar-xs"
                />
              ) : (
                ``
              )}
            </div>
          )}
        </>
      ),
    },
    {
      name: "Name",
      selector: (row) => <h5 className="font-size-12 text-dark">{row.name}</h5>,
      sortable: true,
    },
    {
      name: "Name Arabic",
      selector: (row) => (
        <h5 className="font-size-12 text-dark">{row.nameAr}</h5>
      ),
      sortable: true,
    },
    {
      name: "Created At",
      cell: (row) => (
        <h5 className="font-size-12 text-dark">
          {handleValidDate(row.createdAt)}
        </h5>
      ),
    },
    {
      name: "Updated At",
      cell: (row) => (
        <h5 className="font-size-12 text-dark">
          {handleValidDate(row.updatedAt)}
        </h5>
      ),
    },
    {
      name: "Delete",
      cell: (row) => (
        <Link className="text-danger" to="#">
          <i
            className="mdi mdi-delete font-size-18"
            id="deletetooltip"
            onClick={() => onClickCategoryDelete(row)}
          ></i>
        </Link>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    {
      name: "edit",
      cell: (row) => (
        <Link className="text-success" to="#">
          <i
            className="mdi mdi-pencil font-size-18"
            id="edittooltip"
            onClick={() => handleEditCategory(row)}
          ></i>
        </Link>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const handleValidDate = (date) => {
    const date1 = moment(new Date(date)).format("DD MMM Y");
    return date1;
  };

  const addNew = () => {
    setModal(true);
    setModalValue("new");
  };

  const handleEditCategory = (item) => {
    setModal(true);
    setModalValue("edit");
    setCategory(item);
  };

  const onClickCategoryDelete = (item) => {
    setDeleteModal(true);
  };

  const handleDeleteUser = () => {
    setDeleteModal(false);
  };

  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteUser}
        onCloseClick={() => setDeleteModal(false)}
      />

      <NewAndEditModal
        show={modal}
        setShowModal={setModal}
        modalValue={modalValue}
        onCloseClick={() => setModal(false)}
        category={modalValue === "new" ? {} : category}
      />

      <div className="page-content">
        <MetaTags>
          <title>Categories | Eshailx</title>
        </MetaTags>

        <Container fluid>
          <Breadcrumbs
            // title={props.t("Categories")}
            // breadcrumbItem={props.t("Categories")}
            title="Categories"
            breadcrumbItem="Categories"
          />

          <Col>
            <div className="text-sm-end mb-2">
              <Button
                color="primary"
                className="font-16 btn-block btn btn-primary"
                onClick={addNew}
              >
                <i className="mdi mdi-plus-circle-outline me-1" />
                Create New Category
              </Button>
            </div>
          </Col>
          {/* 
          {categories.length !== 0 ? (
            <CategoriesGrid
              categories={categories}
              columns={columns}
              addNew={addNew}
            />
          ) : (
            ``
          )} */}
        </Container>
      </div>
    </React.Fragment>
  );
};
Categories.propTypes = {
  t: PropTypes.any,
};

export default withTranslation()(Categories);
