import { useRouter } from 'next/router'
import { Button, Card, CardContent, Container, Grid } from 'semantic-ui-react'

export default function Home({tasks}) {
  
  const router = useRouter()

  if(tasks.length === 0)
  return (
    
    <Grid
    centered 
    verticalAlign='middle' 
    columns="1" 
    style={{height: "80vh"}}
    >
        <Grid.Row >
          <Grid.Column textAlign='center'>
            <h1>
              No tasks were found
            </h1>
            <img src='https://static.thenounproject.com/png/1496955-200.png' alt='empty folder'></img>
            <div>
              <Button primary onClick={() => router.push('/tasks/new')}>Create a new Task</Button>
            </div>
          </Grid.Column>
        </Grid.Row>
    </Grid>
  

  ) 

  return (
    <Container>
      <Card.Group itemsPerRow={3}>
        {
          tasks.map((task) => (
            <Card key={task._id} >
              <Card.Header style={{padding:"5px 5px 5px 15px"}}>
                <h2>{task.title}</h2>
              </Card.Header>

              <CardContent>
                <p>{task.description}</p>
              </CardContent>
              <Card.Content extra>
                <Button primary onClick={()=> router.push(`/tasks/${task._id}`)}>View</Button>
                <Button secondary onClick={() => router.push(`tasks/${task._id}/edit`)}>Update</Button>
              </Card.Content>

            </Card>
          ) )
        }
      </Card.Group>
    </Container>
  )
}

export async function getServerSideProps(params){

  const req = await fetch('http://localhost:3000/api/tasks')
  const tasks = await req.json()

  
  return {props:{
    tasks 
  }}
}