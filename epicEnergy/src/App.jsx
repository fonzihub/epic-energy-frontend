import "./App.css";
import { Button, Modal } from "react-bootstrap";
import { useState } from "react";
import Form from "react-bootstrap/Form";

const Bottone = ({ prop, onClick }) => {
  return (
    <Button variant="primary" onClick={onClick}>
      {prop}
    </Button>
  );
};

function App() {
  const [showRegistrati, setShowRegistrati] = useState(false);
  const [showLogIn, setShowLogIn] = useState(false);

  const handleShowRegistrati = () => setShowRegistrati(true);
  const handleCloseRegistrati = () => setShowRegistrati(false);

  const handleShowLogin = () => setShowLogIn(true);
  const handleCloseLogin = () => setShowLogIn(false);

  // campi form registrazione

  const [username, setUsername] = useState("");
  const [nome, setNome] = useState("");
  const [cognome, setCognome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // login

  const [emailLogin, setEmailLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");

  // fetch registrazione ---------------------------------------------

  const payload = {
    username: username,
    email: email,
    password: password,
    name: nome,
    surname: cognome,
  };

  const registrati = () => {
    // e.preventDefault();

    fetch("http://localhost:3001/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        email: email,
        name: nome,
        surname: cognome,
        password: password,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("errore nel recupero dati");
        }
      })
      .then((data) => {
        alert("Registrazione completata!");
        console.log("Utente registrato:", data);
        // handleCloseRegistrati();
      })
      .catch((error) => {
        console.log("Errore:", error);
      });
  };
  // --------------------------------LOG IN ---------------------------

  const login = () => {
    fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: emailLogin,

        password: passwordLogin,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("errore nel recupero dati");
        }
      })
      .then((data) => {
        alert("Login completata!");
        console.log("questo è il tuo token:", data);
        // handleCloseRegistrati();
      })
      .catch((error) => {
        console.log("Errore:", error);
      });
  };

  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center vh-100">
        <h2 className="justify-content-center d-flex">
          BENVENUTO IN EPIC ENERGY
        </h2>
        <div className="d-flex justify-content-center mt-5 gap-5">
          <Bottone prop="Registrati" onClick={handleShowRegistrati} />

          <Bottone prop="Log In" onClick={handleShowLogin} />
        </div>

        <Modal show={showRegistrati} onHide={handleCloseRegistrati} centered>
          <Modal.Header closeButton>
            <Modal.Title>Registrazione</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Benvenuto! Completa la tua registrazione.</p>
            <Form
              onSubmit={(e) => {
                e.preventDefault;
                registrati();
                console.log(payload);
              }}
            >
              <Form.Group className="mb-3" controlId="username">
                <Form.Label>username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Inserisci username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <Form.Text className="text-muted"></Form.Text>
              </Form.Group>
              <Form.Group className="mb-3" controlId="nome">
                <Form.Label>nome</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Inserisci nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
                <Form.Text className="text-muted"></Form.Text>
              </Form.Group>
              <Form.Group className="mb-3" controlId="cognome">
                <Form.Label>cognome</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Inserisci cognome"
                  value={cognome}
                  onChange={(e) => setCognome(e.target.value)}
                />
                <Form.Text className="text-muted"></Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Inserisci email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <Form.Text className="text-muted"></Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Inserisci password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Modal.Body>
        </Modal>

        <Modal show={showLogIn} onHide={handleCloseLogin} centered>
          <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Inserisci le tue credenziali per accedere.</p>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                login();
              }}
            >
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={emailLogin}
                  onChange={(e) => {
                    setEmailLogin(e.target.value);
                  }}
                />
                <Form.Text className="text-muted"></Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={passwordLogin}
                  onChange={(e) => {
                    setPasswordLogin(e.target.value);
                  }}
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}

export default App;
