import styles from "./ProjectForm.module.css"
import Input from "../form/input"
import Select from "../form/Select"
import SubmitButton from "../form/SubmitButton"

import { useEffect, useState } from "react"

function ProjectForm({ handleSubmit,btnText, projectData }){
    const [categories,SetCategories] = useState([])
    const [project, SetProject] = useState(projectData || {})

   useEffect(() =>{
    fetch('http://localhost:5000/categorias',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((resp) => resp.json())
        .then((data) =>{
            SetCategories(data)
        })
        .catch((err) => console.log(err))
   }, [])

   const submit = (e) =>{
    e.preventDefault()
    handleSubmit(project)
   }

   function handleChange(e){
    SetProject({ ...project, [e.target.name]: e.target.value })
   }

   function handleCategory(e){
    SetProject({
        ...project,
        category:{
            id : e.target.value,
            name: e.target.options[e.target.selectedIndex].text
        }
    })
   }

    return(
        <form onSubmit={submit} className={styles.form} >
            <Input
                type="text"
                text="nome do projeto"
                name="name"
                placeholder="insira o nome do projeto"
                handleOnChange={handleChange}
                value={project.name ? project.name : ''}
            />
            <Input
                type="number"
                text="orçamento do projeto"
                name="budget"
                placeholder="insira o valor total"
                handleOnChange={handleChange}
                value={project.budget ? project.budget : ''}
            />
            <Select 
                name="category_id" 
                text="Selecione uma categoria" 
                options={categories}
                handleOnChange={handleCategory}
                value={project.category ? project.category.id : ''}
            />
            <SubmitButton text={btnText}/>
        </form>
    )
}

export default ProjectForm