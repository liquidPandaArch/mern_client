import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";

function Profile() {
  const { userInformation } = useSelector((state) => state.auth);

  useEffect(() => {

  }, []);



  return (
    <div className="mx-2">
      <Container className="mx-auto d-flex flex-column align-items-center justify-content-center py-5 bg-light m-4 border border-secondary rounded shadow-sm">
        <h1 className="text-center mb-4">PROFILE</h1>
        <p>
          <pre>
            {JSON.stringify(userInformation, null, 2)}
          </pre>
        </p>
      </Container>
    </div>
  );
}

export default Profile;
