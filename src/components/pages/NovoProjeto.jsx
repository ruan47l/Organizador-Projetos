import styles from "./NovoProjeto.module.css"
import ProjectForm from "../project/ProjectForm"
import { useNavigate } from "react-router-dom"

function NovoProjeto(){

        const navigate = useNavigate()

        function createPost(project){
            project.cost = 0
            project.services = []

            fetch('http://localhost:5000/projects',{
                method : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(project), 
            })
                .then((resp) => resp.json())
                .then((data) =>{
                    console.log(data)

                    const state = { message: "Projeto criado com sucesso!" };
                    navigate("/projetos", {state});                    
                })
                .catch((err) => console.log(err))
        }

    return(
        <div className={styles.novoprojeto_container}>
            <h1>Criar Projeto</h1>
            <p>crie seu projeto para depois adicionar os serviços</p>
            <ProjectForm handleSubmit={createPost} btnText="Criar projeto"/>
        </div>
    )
}

export default NovoProjeto