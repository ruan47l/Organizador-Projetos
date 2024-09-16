import { Link } from "react-router-dom"

import Container from "./Container"

import styles from "./NavBar.module.css"

import logo from "../../../img/moeda.avif"

function NavBar(){
    return(
      <nav className={styles.navbar}>
        <Container>
          <Link to="/">
            <img src={logo} alt="moeda" className={styles.imgMoeda} />
          </Link>

          <ul className={styles.list}>
            <li className={styles.item}>
              <Link to="/">Home</Link>
            </li>
            <li className={styles.item}>
              <Link to="/projetos">Projetos</Link>
            </li>
          </ul>
        </Container>
      </nav>
    )
}

export default NavBar