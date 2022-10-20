import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
// import example from "../assets/images/example.png";
// import view from "../assets/icon/View.png";
// import edit from "../assets/icon/Edit.png";
// import delet from "../assets/icon/Delete.png";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useQuery } from "react-query";
import { useMutation } from "react-query";
import { API } from "../config/api";
import Delete from "../components/modal/Delete";

function DataBarang() {
  document.title = `My Stock`;
  const state = useContext(UserContext);
  // const [userLinks, setUserLinks] = useState([]);

  const [dataFilter, setDataFilter] = useState([]);

  const [idDelete, setIdDelete] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  console.log("state", state);

  let { data: barangs, refetch } = useQuery("barangCache", async () => {
    const response = await API.get("/barangs");
    console.log("ini response", response);
    return response.data.data;
  });
  console.log("ini", barangs);
  // let count = state.length;

  function handleChangeBarang(e) {
    if (!e.target.value) {
      setDataFilter(barangs);
      return;
    }
    const filter = barangs?.filter((item) => {
      return item.title.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setDataFilter(filter);
  }

  console.log("filter", dataFilter);

  useEffect(() => {
    if (barangs) setDataFilter(barangs);
  }, [barangs]);

  const handleDelete = (id) => {
    setIdDelete(id);
    handleShow();
  };

  const deleteById = async (id) => {
    try {
      await API.delete(`/barang/${id}`);
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (confirmDelete) {
      // Close modal confirm delete data
      handleClose();
      // execute delete data by id function
      deleteById(idDelete);
      setConfirmDelete(null);
    }
  }, [confirmDelete]);

  let user = useQuery("usersCache", async () => {
    const response = await API.get("/check-auth");
    console.log("ini response user", response);
    return response.data.data;
  });
  //   let count = dataFilter.length - 7;

  return (
    <>
      <Row>
        <Col>
          <h3 className="w-100 px-5 py-4">My Link</h3>
          <Row
            style={{ backgroundColor: "#ECECEC", height: "100vh" }}
            className="pt-5"
          >
            <Container className="w-100 px-5 py-3">
              <Row xs="auto">
                <Col>
                  <h4>All Link</h4>
                </Col>
                <Col>
                  {/* <h6
                    style={{
                      color: "white",
                      backgroundColor: "#FF9F00",
                      width: "25px",
                      borderRadius: "10px",
                      textAlign: "center",
                      marginTop: "6px",
                    }}
                  >
                    {count}
                  </h6> */}
                </Col>
                <Col sm={9}>
                  <Form.Group className=" mb-5 border-bottom border-secondary">
                    <Form.Control
                      placeholder="Find your link"
                      type="text"
                      name="email"
                      onChange={handleChangeBarang}
                      style={{
                        border: "0px ",
                        backgroundColor: "#ECECEC",
                      }}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Button
                    as={Link}
                    to="/datalink"
                    type="submit"
                    style={{
                      color: "white",
                      backgroundColor: "#FF9F00",
                      border: "none",
                    }}
                  >
                    Search
                  </Button>
                </Col>
              </Row>
              <div
                style={{
                  borderRadius: "10px",
                  overflow: "hidden",
                  overflowY: "scroll",
                  height: "500px",
                }}
              >
                {dataFilter
                  ?.filter((item) => item.user_id === user.data.id)
                  .map((item, id) => {
                    return (
                      <Row className="mt-5 w-100 d-flex">
                        <Col sm={1}>
                          <img
                            src={item?.image}
                            alt=""
                            className="w-100 mt-2"
                          />
                        </Col>
                        <Col sm={4}>
                          <Row>
                            <Col>
                              <h3>{item?.title}</h3>
                              <a
                                href={item?.linkWeb}
                                style={{
                                  color: "black",
                                  textDecoration: "none",
                                }}
                              >
                                <p>{item?.linkWeb}</p>
                              </a>
                            </Col>
                          </Row>
                        </Col>

                        <Col sm={2} className="mx-5">
                          {/* <h3>10</h3>

                          <p>Visit</p> */}
                        </Col>

                        {/* <Col sm={1}>
                          <Link
                            to={`/template/${item.id}`}
                            // {`/result/${item.id}`}
                          >
                            <img src={view} alt="" />
                          </Link>
                        </Col>
                        <Col sm={1}>
                          <Link to={`/Update_link/${item.id}`}>
                            <img src={edit} alt="" />
                          </Link>
                        </Col>
                        <Col sm={1}>
                          <Button
                            onClick={
                              () => handleDelete(item?.id)
                              // setShow(true)
                            }
                            style={{
                              backgroundColor: "#ECECEC",
                              border: "none",
                              padding: "0px",
                            }}
                          >
                            <img src={delet} alt="" />
                          </Button>
                        </Col> */}
                      </Row>
                    );
                  })}
              </div>
              <Delete
                setConfirmDelete={setConfirmDelete}
                show={show}
                setShow={setShow}
                handleClose={handleClose}
                handleDelete={handleDelete}
              />
            </Container>
          </Row>
        </Col>
      </Row>
    </>
  );
}

export default DataBarang;
