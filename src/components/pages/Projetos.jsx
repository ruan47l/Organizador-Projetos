import Message from "../layout/Message"
import Container from "../layout/Container"
import LinkButton from "../layout/LinkButton"
import Loading from "../layout/Loading"
import ProjectCard from "../project/ProjectCard"
import ProjectForm from "../project/ProjectForm"

import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react"

import styles from "./Projetos.module.css"


function Projetos(){

    const [projects, setProjects] = useState([])
    const [removeLoading, removeSetLoading] = useState(false)

    const location = useLocation()
    let message = ''
    if(location.state){
        message = location.state.message
    }

    useEffect(() =>{
        fetch('http://localhost:5000/projects',{
            method:'GET',
            headers:{
                'Content-Type': 'application/json',
            },
        }).then(resp => resp.json())
        .then(data => {
            console.log(data)
            setProjects(data)
            removeSetLoading(true)
        })
        .catch((err) => console.log(err))
    },[])

    function removeProject(id){
        fetch(`http://localhost:5000/projects/${id}`,{
            method:'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then((resp) => resp.json())
        .then((data) =>{
            setProjects(projects.filter((project) => project.id !== id))
        })
        .catch((err) => console.log(err))
    }

    return(
       <div className={styles.project_container}>
        <div className={styles.title_container}>
            <h1>Meus projetos</h1>
            <LinkButton to="/novoprojeto" text={'Criar Projeto'}/>
        </div>
            {message && <Message type='success' msg={message}/>}
            <Container customClass="start">
                {projects.length > 0 && 
                projects.map((project) => (
                 <ProjectCard
                    name={project.name}
                    id={project.id}
                    budget={project.budget}
                    category={project.category.name}
                    key={project.id}
                    handleRemove={removeProject}
                 />
                ))}
                {!removeLoading && <Loading/>}
            </Container>
       </div>
    )
}

export default Projetos