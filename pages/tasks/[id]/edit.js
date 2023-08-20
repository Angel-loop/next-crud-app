import { useRouter } from "next/router";
import { useState } from "react";
import { Grid, TextArea, Form, Button } from "semantic-ui-react";

export default function New(props) {

    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
    })

    const router = useRouter()

    const [error, setError] = useState({})

    const handleChange = (e) => {
        setNewTask({...newTask, [e.target.name] : e.target.value})
    }

    const validate = () =>{
        const error = {}

        if (!newTask.title) error.title = "Task title is required"
        if (!newTask.description) error.description = "Task description is required"

        return error
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        let validated = validate() 
        
        if(Object.keys(validated).length) 
        return setError(validated)

        await createTask()
    }

    const createTask = async () => {
        try {
            await fetch(`http://localhost:3000/api/tasks/${props.id}`,{

            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newTask)

            }).then( res => res.json()).then( res => {
                
                router.push('/')
                
            })
        } catch (error) {
            console.log("This is displaying the error")
            console.log(error)
        }
    }
    
    return (
    <Grid
    centered
    verticalAlign="middle"
    columns='3'
    style={{height: '80vh'}}
    >
        <Grid.Row>

            <Grid.Column 
            textAlign="center">

                <Form onSubmit={handleSubmit}>
                    <Form.Input 
                    label='Title' 
                    placeholder='Title' 
                    name='title' 
                    onChange={handleChange}
                    error={error.title ? {content: error.title } : null}
                    />

                    <Form.TextArea 
                    label='Description'  
                    placeholder='Description' 
                    name='description' 
                    onChange={handleChange}
                    error={error.description ? {content: error.description } : null}
                    />

                    <Button primary >Update Task</Button>
                </Form>

            </Grid.Column>

        </Grid.Row>
        
    </Grid>
  )
}

export async function getServerSideProps(context){
    const id = context.params.id 

    return {
        props: {id}
    }
}