import React from "react";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";

function HomePage() {
  return (
    <Container maxWidth="sm">
      <h1>Welcome to Boreds</h1>
      <p>Boreds is a project management app like Trello.</p>
      <Button
        style={{ marginRight: "10px" }}
        variant="contained"
        size="large"
        color="primary"
      >
        <a style={{ textDecoration: "none", color: "white" }} href="/login">
          Login
        </a>
      </Button>
      <Button variant="contained" size="large" color="secondary">
        <a style={{ textDecoration: "none", color: "white" }} href="/signup">
          Sign Up
        </a>
      </Button>
    </Container>
  );
}

export { HomePage };
