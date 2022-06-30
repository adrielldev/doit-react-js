import Button from '../../components/Button'
import { Container, Content } from './styles'
import {useNavigate, Navigate} from 'react-router-dom'

function Home({auth}){

    const navigate = useNavigate()
    
    if(auth){
        return <Navigate to ='/dashboard'/>
    }

    const HandleNavigation = (path) =>{
        return navigate(path) 

    }
    return (
        <Container> 
            <Content>
                <h1>do<span>.</span>it</h1>
                <span>Organize-se de forma fácil e efetiva</span>
            
            <div>
                
               <Button onClick={()=>HandleNavigation('/signup')} whiteSchema>Cadastre-se</Button>
               <Button onClick={()=>HandleNavigation('/login')}>Login</Button>
            </div>

            </Content>

        </Container>
    )
}

export default Home 