import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa"

import style from "./Footer.module.css"

function Footer(){
    return(
        <footer className={style.footer}>
            <ul className={style.social_list}>
                <li>
                    <FaInstagram/>
                </li>
                <li>
                    <FaFacebook/>
                    </li>
                <li>
                    <FaLinkedin/>
                </li>
            </ul>
            <p className={style.copy_right}>
                <span>Costs</span> &copy;2024
            </p>
        </footer>
    )
}

export default Footer