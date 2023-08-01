import { Container, Navbar } from "react-bootstrap";
import style from "./Header.module.css";

const Header = () => {
  return (
    <header className={style.header}>
      {" "}
      <Navbar variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Todo List</Navbar.Brand>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
