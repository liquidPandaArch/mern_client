import { Container, Button } from "react-bootstrap";

function Hero() {
  return (
    <div className="mx-2">
      <Container
        className="mx-auto mx-2 d-flex flex-column align-items-center justify-content-center py-5 bg-light m-4 border border-secondary rounded shadow-lg"
      >
        <div className="d-flex align-items-center justify-content-center mb-4">
          <img src="./src/assets/peach.svg" alt="Icon" width="40" height="40" className="mr-2" />
          <h1 className="text-center font-weight-bold">
            projectA
          </h1>
        </div>

        {/* Описание проекта */}
        <p className="text-center mb-2 text-muted">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla auctor
          sit amet eros at auctor. Integer vestibulum dolor at orci euismod, nec
          volutpat tortor tempor. Vivamus in euismod ipsum. Mauris at velit quis
          turpis feugiat pharetra eget sed eros.
        </p>
      </Container>
    </div>
  );
}

export default Hero;
