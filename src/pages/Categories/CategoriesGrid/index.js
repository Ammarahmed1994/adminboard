import PropTypes from "prop-types";
import React from "react";

import { Card, CardBody, Col, Row, Button } from "reactstrap";
import paginationFactory, {
  PaginationListStandalone,
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";

const CategoriesGrid = ({ categories, columns, addNew }) => {
  const { SearchBar } = Search;

  const pageOptions = {
    sizePerPage: 10,
    totalSize: categories.length, // replace later with size(users),
    custom: true,
  };

  const keyField = "id";

  return (
    <Row>
      <Col lg="12">
        <Card>
          <CardBody>
            <PaginationProvider
              pagination={paginationFactory(pageOptions)}
              keyField={keyField}
              columns={columns}
              data={categories}
            >
              {({ paginationProps, paginationTableProps }) => {
                return (
                  <ToolkitProvider
                    keyField={keyField}
                    data={categories}
                    columns={columns}
                    bootstrap4
                    search
                  >
                    {(toolkitProps) => (
                      <React.Fragment>
                        <Row className="mb-2">
                          <Col sm="4">
                            <div className="search-box ms-2 mb-2 d-inline-block">
                              <div className="position-relative">
                                <SearchBar {...toolkitProps.searchProps} />
                                <i className="bx bx-search-alt search-icon" />
                              </div>
                            </div>
                          </Col>
                          <Col sm="8">
                            <div className="text-sm-end">
                              <Button
                                color="primary"
                                className="font-16 btn-block btn btn-primary"
                                onClick={addNew}
                              >
                                <i className="mdi mdi-plus-circle-outline me-1" />
                                Create New User
                              </Button>
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col xl="12">
                            <div className="table-responsive">
                              <BootstrapTable
                                keyField={keyField}
                                {...toolkitProps.baseProps}
                                {...paginationTableProps}
                                // selectRow={selectRow}
                                // defaultSorted={defaultSorted}
                                classes={
                                  "table align-middle table-nowrap table-hover"
                                }
                                bordered={false}
                                striped={false}
                                responsive
                                // ref={node}
                              />
                            </div>
                          </Col>
                        </Row>
                        <Row className="align-items-md-center mt-30">
                          <Col className="pagination pagination-rounded justify-content-end mb-2">
                            <PaginationListStandalone {...paginationProps} />
                          </Col>
                        </Row>
                      </React.Fragment>
                    )}
                  </ToolkitProvider>
                );
              }}
            </PaginationProvider>
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
