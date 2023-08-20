import { useRouter } from "next/router"
import { useState } from "react"
import { Button, Card, Confirm, Grid } from "semantic-ui-react"




export default function Task({task}) {

  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const [deleting, setDeleting] = useState(false)

  const open = () =>{ setIsOpen(true); console.log("opened window") } 
  const close = () => { setIsOpen(false); console.log("closed window") } 


  const  deleteTask  = async (id) => {

    try {
      await fetch(`http://localhost:3000/api/tasks/${id}`,{

            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
            }
            }).then( res => res.json()).then( res => {
              
              console.log("succesfully deleted")

          })
    } catch (error) {
      console.log(error)
    }
}

  const handleDelete = () =>{
    setDeleting(true)
    deleteTask(task._id)
    setIsOpen(false)
    router.push('/')
  }
  return (
    <>
      <Grid
        centered
        verticalAlign="middle"
        columns='3'
        style={{height: '80vh'}}>

          <Grid.Row>
            <Grid.Column textAlign="center">
              <Card>
                  <Card.Header style={{padding: "5px 5px 5px 15px"}}><h2>{task.title}</h2></Card.Header>
                  
                  <Card.Content>
                    <div>{task.description}</div>
                  </Card.Content>
                    
                  <Card.Content extra>
                    <div> Created {task.createdAt} </div>
                    <div>Last update {task.updatedAt}</div>
                  </Card.Content>  

                  <Card.Content extra>

                    <Button color="red" onClick={open} loading={deleting}>Delete</Button>

                    <Confirm open={isOpen} onConfirm={handleDelete}  onCancel={close}></Confirm>

                  </Card.Content>
              </Card>
            </Grid.Column>
          </Grid.Row>
      </Grid>


    </>
  )
}

export async function getServerSideProps(context){

    const id = context.params.id
    const req = await fetch(`http://localhost:3000/api/tasks/${id}`)
    const task = await req.json()

    return{
        props: {
          task
        }
    }
}