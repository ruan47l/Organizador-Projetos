import { parse, v4 as uuidv4 } from 'uuid'

import styles from "./Projeto.module.css"

import { useParams } from "react-router-dom"

import { useState, useEffect } from "react"

import Loading from '../layout/Loading'
import Container from '../layout/Container'
import Message from '../layout/Message'
import ServiceForm from "../service/serviceForm"
import ServiceCard from '../service/ServiceCard'
import ProjectForm from "../project/ProjectForm"

function Projeto(){

    const {id} = useParams()

    const [project, setProjets] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)
    const [services, setServices] = useState([])
    const [message, setMessage] = useState()
    const [typeMessage, setTypeMessage] = useState()


    useEffect(() =>{
        setTimeout(() =>{
            fetch(`http://localhost:5000/projects/${id}`,{
                method: 'GET',
                headers:{
                    'Content-Type': 'application/json',
                }
            })
                .then((resp) => resp.json())
                .then((data) =>{
                    setProjets(data)
                    setServices(data.services)
                })
                .catch((err) => console.log)
        })
    }, [id])

    function editPost(project){
        setMessage('')

        if(project.budget < project.cost){
            setMessage('o Orçamento não pode ser menor que o valor do projeto')
            setTypeMessage('error')
            return(false)
        }

        fetch(`http://localhost:5000/projects/${project.id}`,{
            method: 'PATCH',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        })
        .then((resp) => resp.json())
        .then((data) =>{
            setProjets(data)
            setShowProjectForm(false)
            setMessage('Projeto atualizado !!!')
            setTypeMessage('success')
        })
        .catch((err) => console.log(err))
    }

    function createService(project) {
        const lastService = project.services[project.services.length - 1]
    
        lastService.id = uuidv4()
    
        const lastServiceCost = lastService.cost
    
        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)
    
        if (newCost > parseFloat(project.budget)) {
          setMessage('Orçamento ultrapassado, verifique o valor do serviço!')
          setTypeMessage('error')
          project.services.pop()
          return false
        }
    
        project.cost = newCost
    
        fetch(`http://localhost:5000/projects/${project.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(project),
        })
          .then((resp) => resp.json())
          .then((data) => {
            setServices(data.services)
            setShowServiceForm(!showServiceForm)
            setMessage('Serviço adicionado!')
            setTypeMessage('success')
          })
    }

    function removeService(id, cost) {
        const servicesUpdated = project.services.filter(
          (service) => service.id !== id,
        )
    
        const projectUpdated = project
    
        projectUpdated.services = servicesUpdated
        projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost)
    
        fetch(`http://localhost:5000/projects/${projectUpdated.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(projectUpdated),
        })
          .then((resp) => resp.json())
          .then((data) => {
            setProjets(projectUpdated)
            setServices(servicesUpdated)
            setMessage('Serviço removido com sucesso!')
          })
    }

    function toogleProjectForm(){
        setShowProjectForm(!showProjectForm)
    }

    function toogleServiceForm(){
        setShowServiceForm(!showServiceForm)
    }

    return( <>{project.name ?
        <div className={styles.project_details}>
            <Container customClass="column">
                {message && <Message type={typeMessage} msg={message} />}
                <div className={styles.details_container}>
                    <h1>Projeto: {project.name}</h1>
                    <button className={styles.btn} onClick={toogleProjectForm}>
                        {!showProjectForm ? 'Editar' : 'Fechar'}
                    </button>
                    {!showProjectForm ? (
                        <div className={styles.project_info}>
                            <p>
                                <span>Categoria:</span> {project.name}
                            </p>
                            <p>
                                <span>Total do orçamento:</span> R${project.budget}
                            </p>
                            <p>
                                <span>Total Utilizado:</span> R${project.cost}
                            </p>
                        </div>
                    )   : (
                        <div className={styles.project_info}>
                            <ProjectForm 
                                handleSubmit={editPost} 
                                btnText="Concluir Edição"
                                projectData={project}
                            />
                        </div>
                    )}
                </div>
                <div className={styles.service_form_container}>
                    <h2>Adicione um serviço: </h2>
                    <button className={styles.btn} onClick={toogleServiceForm}>
                        {!showServiceForm ? 'Adicionar serviço' : 'Fechar'}
                    </button>
                    <div className={styles.project_info}>
                        {showServiceForm && 
                        <ServiceForm
                            handleSubmit={createService}
                            btnText="Adicionar Serviço"
                            projectData={project}
                        />}
                    </div>
                </div>
                <h2>
                    Serviços
                </h2>
                <Container customClass="start">
                    {services.length > 0 &&
                        services.map((service) => (
                            <ServiceCard
                                id={service.id}
                                name={service.name}
                                cost={service.cost}
                                description={service.description}
                                key={service.id}
                                handleRemove={removeService}
                            />
                        ))}
                    {services.length === 0 && <p>Não há serviços cadastrados.</p>}
                </Container>
            </Container>
        </div>
             : <Loading />}</>
    )
}


export default Projeto