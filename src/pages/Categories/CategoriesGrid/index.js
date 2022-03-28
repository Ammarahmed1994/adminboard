import PropTypes from "prop-types";
import React from "react";

import { Card, CardBody, Col, Row, Button } from "reactstrap";
import DataTable from "react-data-table-component";

const CategoriesGrid = ({ categories, columns, addNew }) => {
  const customStyles = {
    headCells: {
      style: {},
    },
    table: {
      style: {},
    },
  };

  const keyField = "id";
  return (
    <Row>
      <Col lg="12">
        <Card>
          <CardBody>
            <DataTable
              columns={columns}
              data={categories}
              className="-mt-10"
              customStyles={customStyles}
              pagination
            />
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

CategoriesGrid.propTypes = {
  categories: PropTypes.any,
  columns: PropTypes.any,
  addNew: PropTypes.func,
};

export default CategoriesGrid;
