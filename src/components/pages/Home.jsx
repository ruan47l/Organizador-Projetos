import styles from "./home.module.css"

import porco from "./../../../img/porco.jpg"

import LinkButton from "../layout/LinkButton"


function Home(){
    return(
        <section className={styles.home_container}>
            <h1>Bem-Vindo <span>costs</span></h1>
            <p>Comece a gerenciar seus projetos agora mesmo!</p>
            <LinkButton to="/novoprojeto" text={'Criar Projeto'}/>
            <img src={porco}  className={styles.ImgPorco}/>
        </section>
    )
}

export default Home