import { Navbar, Nav, Container } from "react-bootstrap";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout as logoutReducer } from "../slices/authSlice";
import { toast } from "react-toastify";

function Header() {
  const {userInformation} = useSelector((state: any) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout({}).unwrap();
      dispatch(logoutReducer());
      navigate("/");
      toast.success ("Logged out successfully", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      toast.error (error?.data?.message || error?.error, {
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
    <header>
      <Navbar bg="dark" data-bs-theme="dark" expand="sm" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>AAA</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {userInformation ? (
                <>
                  <LinkContainer to="/profile">
                    <Nav.Link>
                      {" "}
                      {userInformation.name}{" "}
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/" onClick={handleLogout}>
                    <Nav.Link>
                      {" "}
                      <FaSignOutAlt /> Logout{" "}
                    </Nav.Link>
                  </LinkContainer>
                </>
              ) : (
                <>
                  <LinkContainer to="/login">
                    <Nav.Link>
                      {" "}
                      <FaSignInAlt /> Sign in{" "}
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/register">
                    <Nav.Link>
                      {" "}
                      <FaSignInAlt /> Sign Up{" "}
                    </Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
