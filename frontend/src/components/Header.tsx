import { Navbar, Nav, Container } from "react-bootstrap";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout as logoutReducer } from "../slices/authSlice";
import { toast } from "react-toastify";
import ConfirmationModal from "./ConfirmModal";
import { useState } from "react";

function Header() {
  const { userInformation } = useSelector((state: any) => state.auth);
  const [Modal, setUpModal] = useState<{ show: boolean, message: string, action?: () => void }>({ show: false, message: "", action: () => { } });

  const handleOpenModal = (message: string, action: any) => {
    setUpModal({
      show: true,
      message,
      action
    })
  };

  const handleCloseModal = () => {
    setUpModal({ show: false, message: "", action: () => { } })
  };

  const handleConfirmAction = (action: any) => {
    handleCloseModal();
    action()
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout({}).unwrap();
      dispatch(logoutReducer());
      navigate("/");
      toast.success("Logged out successfully", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error: any) {
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
    <header>
      <ConfirmationModal
        show={Modal.show} // передаем значение типа boolean
        message={Modal.message}
        onConfirm={() => handleConfirmAction(Modal.action)}
        onCancel={handleCloseModal}
      />
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
                  <LinkContainer to="/leadlist">
                    <Nav.Link>
                      {" "}
                      Список лидов
                      {" "}
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/profile">
                    <Nav.Link>
                      {" "}
                      {userInformation.name}{" "}
                    </Nav.Link>
                  </LinkContainer>
                  <Nav.Link onClick={() => handleOpenModal("Вы уверены что хотите выйти?", handleLogout)}>
                    {" "}
                    <FaSignOutAlt /> Logout{" "}
                  </Nav.Link>
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
