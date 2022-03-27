import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import MetaTags from "react-meta-tags";
import { Container } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { withTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import moment from "moment";

import { CategoryService } from "services/category.service";
import DeleteModal from "../../components/Common/DeleteModal";
import NewAndEditModal from "./NewAndEditModal/index";
import CategoriesGrid from "./CategoriesGrid/index";

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

const Categories = (props) => {
  const [categories, setCategories] = useState([]);
  const [pageCount, setPageCount] = useState(0);

  const [category, setCategory] = useState({});

  const [modal, setModal] = useState(false);
  const [modalValue, setModalValue] = useState("");

  const [deleteModal, setDeleteModal] = useState(false);

  const categoryListColumns = [
    {
      text: "id",
      dataField: "id",
      sort: true,
      hidden: true,
      // eslint-disable-next-line react/display-name
      formatter: (category) => <>{category.id}</>,
    },
    // {
    //   dataField: "image",
    //   text: "#",
    //   // eslint-disable-next-line react/display-name
    //   formatter: (category) => (
    //     <>
    //       {!category.image ? (
    //         <div className="avatar-xs">
    //           <span className="avatar-title rounded-circle">
    //             {category.name.charAt(0)}
    //           </span>
    //         </div>
    //       ) : (
    //         <div>
    //           {category.image !== null ? (
    //             <img src={category.image} alt="" className="avatar-sm" />
    //           ) : (
    //             ``
    //           )}
    //         </div>
    //       )}
    //     </>
    //   ),
    // },
    {
      text: "Name",
      dataField: "name",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (name) => (
        <>
          <h5 className="font-size-14 mb-1 text-dark">{name}</h5>
        </>
      ),
    },
    {
      text: "Arabic Name",
      dataField: "nameAr",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (nameAr) => (
        <>
          <h5 className="font-size-14 mb-1 text-dark">{nameAr}</h5>
        </>
      ),
    },
    {
      text: "Created At",
      dataField: "createdAt",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (createdAt) => (
        <>
          <h5 className="font-size-12 text-dark">
            {handleValidDate(createdAt)}
          </h5>
        </>
      ),
    },
    {
      text: "Updated At",
      dataField: "updatedAt",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (updatedAt) => (
        <>
          <h5 className="font-size-12 text-dark">
            {handleValidDate(updatedAt)}
          </h5>
        </>
      ),
    },
    {
      dataField: "menu",
      isDummyField: true,
      editable: false,
      text: "Action",
      // eslint-disable-next-line react/display-name
      formatter: (item) => (
        <div className="d-flex gap-3">
          <Link className="text-success" to="#">
            <i
              className="mdi mdi-pencil font-size-18"
              id="edittooltip"
              onClick={() => handleEditCategory(item)}
            ></i>
          </Link>
          <Link className="text-danger" to="#">
            <i
              className="mdi mdi-delete font-size-18"
              id="deletetooltip"
              onClick={() => onClickCategoryDelete(item)}
            ></i>
          </Link>
        </div>
      ),
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      //   const results = await CategoryService.getCategoryList();
      //   const categoriesData = results?.rows;
      //   setCategories(categoriesData);

      //   const numberOfPages = results?.count;
      //   setPageCount(numberOfPages);
      setCategories(rows);
    };

    fetchData();
  }, []);

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
    setModal(true);
    setModalValue("edit");
    setCategory(item);
  };

  const updateCateogry = (data) => {
    //send update category request
    setModal(false);
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
            title={props.t("Categories")}
            breadcrumbItem={props.t("Categories")}
          />

          <CategoriesGrid
            categories={categories}
            columns={categoryListColumns}
            addNew={addNew}
          />

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
