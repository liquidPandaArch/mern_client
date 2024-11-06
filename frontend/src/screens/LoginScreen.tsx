import { useEffect, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import FormContainer from "../components/FormContainer";
import { toast } from "react-toastify";

import CustomSpinner from "../components/CustomSpinner";

function LoginScreen() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  console.log(`searchParams from login`, searchParams.get("return_to"));
  const [login, { isLoading }, result] = useLoginMutation();

  console.log(`result`, result);

  const { userInformation } = useSelector((state: any) => state.auth);


  useEffect(() => {
    if (userInformation) {
      navigate("/leadlist");
      toast.warn("You are already logged in", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }, []);

  const submitHandler = async (e: any) => {
    e.preventDefault();
    try {
      const result = await login({ name, password }).unwrap();
      dispatch(setCredentials(result));
      const return_to = searchParams.get("return_to");
      if (return_to) {
        console.log(`return_to`, return_to);
        navigate(return_to);
      } else {
        navigate("/leadlist");
      }
    } catch (error) {
      toast.error(error?.data?.message || error?.error, {
        position: "bottom-center",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <div className="my-5">
      <FormContainer>
        <h1>Sign In</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className="my-2" controlId="name">
            <Form.Label>Name Address</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="my-2" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button
            type="submit"
            variant="primary"
            className="mt-3"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
            }}
            disabled={isLoading}
          >
            {isLoading && <CustomSpinner />} Sign In
          </Button>
        </Form>

        <Row className="py-3">
          <Col>
            Don't have an account?{" "}
            <Link
              to={`/register${searchParams.get("return_to")
                ? `?return_to=${searchParams.get("return_to")}`
                : ""
                }`}
            >
              Create an account
            </Link>
          </Col>
        </Row>
      </FormContainer>
    </div>
  );
}

export default LoginScreen;
