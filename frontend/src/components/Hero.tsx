import { Container, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function Hero() {
  const data ={
    "_": "user",
    "pFlags": {
        "self": true,
        "apply_min_photo": true,
        "stories_unavailable": true
    },
    "id": 6739824124,
    "access_hash": "7266825577397805754",
    "first_name": "Rick",
    "phone": "79950103746",
    "photo": {  
        "_": "userProfilePhoto",
        "pFlags": {},
        "photo_id": "5278720673612687482",
        "stripped_thumb": [
            1,
            8,
            8,
            174,
            183,
            8,
            78,
            243,
            184,
            182,
            127,
            189,
            218,
            138,
            40,
            169,
            105,
            48,
            63
        ],
        "dc_id": 2
    },
    "status": {
        "_": "userStatusOffline",
        "was_online": 1730676335,
        "saved": true
    },
    "sortName": "rick"
}
  return (
    <div className="mx-2">
      <Container className="mx-auto mx-2 d-flex flex-column align-items-center justify-content-center py-5 bg-light m-4 border border-secondary rounded">
        <h1 className="text-center mb-4">AAA</h1>
        <p className="text-center mb-4">
          {" "}
            This is a boilerplate project for authentication with the MERN stack.{" "}
        </p>
          <pre>
          {JSON.stringify(data,null,2)}
          </pre>
      </Container>
    </div>
  );
}

export default Hero;
