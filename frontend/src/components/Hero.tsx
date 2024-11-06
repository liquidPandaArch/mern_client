import { Container } from "react-bootstrap";

function Hero() {
  return (
    <div className="mx-2">
      <Container className="mx-auto mx-2 d-flex flex-column align-items-center justify-content-center py-5 bg-light m-4 border border-secondary rounded">
        <h1 className="text-center mb-4">projectA</h1>
        <p className="text-center mb-4">
          {" "}
          projectA
        </p>
      </Container>
    </div>
  );
}

export default Hero;
