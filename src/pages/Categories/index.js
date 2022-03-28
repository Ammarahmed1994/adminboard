import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import MetaTags from "react-meta-tags";
import { Container } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { withTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import moment from "moment";
import axios from "axios";

import { CategoryService } from "services/category.service";
import DeleteModal from "../../components/Common/DeleteModal";
import NewAndEditModal from "./NewAndEditModal/index";
import CategoriesGrid from "./CategoriesGrid/index";
import { getProjectDetail, getProjects } from "store/actions";

const rows = [
  {
    id: "c1db007f-1cb1-48a0-853f-6b1d20592ff0",
    name: "laptop",
    nameAr: null,
    image: null,
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
  const [pageCount, setPageCount] = useState(0);

  const [category, setCategory] = useState({});

  const [modal, setModal] = useState(false);
  const [modalValue, setModalValue] = useState("");

  const [deleteModal, setDeleteModal] = useState(false);

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       const results = await CategoryService.getCategoryList();
  //       console.log(`results`, results);
  //       //   const categoriesData = results?.rows;
  //       //   setCategories(categoriesData);

  //       //   const numberOfPages = results?.count;
  //       //   setPageCount(numberOfPages);

  //       //   setCategories(rows);
  //     };
  //     fetchData();
  //   }, []);

  useEffect(() => {
    getProjects();
  }, []);

  async function getProjects() {
    let res = await axios.post(
      "45.77.29.107:4200/api/admin/catigory/list",
      {
        token:
          "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IjExNDA1ODY4NzkiLCJwYXNzd29yZCI6IjEyMzQ1NiIsInRpbWUiOiIyMDIyLTAyLTI0VDE0OjI2OjMxKzAyOjAwIiwiaWF0IjoxNjQ1NzA1NTkxfQ.Q-knS04FHm6ZMLMtSdBBXYlvYeZ1m8HY-x-LDrdBuZq9u6Y0OkPW4p9gN0hH1cplVA-UeW9MJhyt6f9xzIqthD8_BS7W_TbUK51UrI3zOzVhTSdlm40vR0psg4A3Fjcqd72sQarn9W75qVqxd9bttok9Nc1jgfKEUP13jVU3PTo",
      },
      {
        "Content-Type": "application/x-www-form-urlencoded",
        "Access-Control-Allow-Origin": "*",
      }
    );
    console.log(`res`, res);
    setCategories(res);
  }

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
                <img src={row.image} alt="" className="avatar-sm" />
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

  const createNewCateogry = () => {
    //send create new category request
    setModal(false);
  };

  const handleEditCategory = (item) => {
    console.log(item);
    setModal(true);
    setModalValue("edit");
    setCategory(item);
  };

  const updateCateogry = (data) => {
    //send update category request
    setModal(false);
  };

  const onClickCategoryDelete = (item) => {
    console.log(item);
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
      {/* <NewAndEditModal
        show={modal}
        modalValue={modalValue}
        onSubmitClick={
          modalValue === "new" ? createNewCateogry : updateCateogry
        }
        onCloseClick={() => setModal(false)}
        category={modalValue === "new" ? {} : category}
      /> */}
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

          {/* {categories.length !== 0 ? (
            <CategoriesGrid
              categories={categories}
              columns={columns}
              addNew={addNew}
            />
          ) : (
            ``
          )} */}

          {/* <button
            className="btn-primary"
            onClick={() =>
              addNew({ id: "", name: "", nameAr: "", image: null })
            }
          >
            New
          </button>
          <button
            className="btn-primary"
            onClick={() =>
              handleEditCategory({
                id: `1`,
                name: "ahmed",
                nameAr: "arabic",
                image: null,
              })
            }
          >
            Edit
          </button>
          <button
            className="btn-danger"
            onClick={() =>
              onClickCategoryDelete({
                id: `1`,
                name: "ahmed",
                nameAr: "arabic",
                image: null,
              })
            }
          >
            delete
          </button> */}
        </Container>
      </div>
    </React.Fragment>
  );
};
Categories.propTypes = {
  t: PropTypes.any,
};

export default withTranslation()(Categories);
