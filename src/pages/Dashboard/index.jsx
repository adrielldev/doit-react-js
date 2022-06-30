import {useNavigate,Navigate} from 'react-router-dom'
import Input from '../../components/Input'
import Button from '../../components/Button'
import { InputContainer, TasksContainer } from './styles'
import {useForm} from 'react-hook-form';
import { useEffect, useState } from 'react';
import {FiEdit2} from 'react-icons/fi';
import Card from '../../components/Card';
import * as yup from 'yup'
import Api from '../../services/api'
import { ToastContainer, toast } from 'react-toastify';

import {Container} from './styles'

function Dashboard({auth}){

    const [tasks,setTasks] = useState([]);
    const navigate = useNavigate();
    const [token]= useState(localStorage.getItem('@Doit:token')|| '');
    const {register,handleSubmit} = useForm();

   
    function loadTasks(){
        Api.get('/task',{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        .then((response)=>{
            const apiTasks = response.data.data.map((task)=>({
                ...task,
                createdAt: new Date(task.createdAt).toLocaleDateString('pt-BR',{
                    day:'2-digit',
                    month:'long',
                    year:'numeric'
                }),
            }));
            setTasks(apiTasks)
    })
    .catch(err=>console.log(err))
}

    useEffect(()=>{

        loadTasks();
    },[])



    const onSubmit = ({task}) => {
        if(!task){
            return toast.error('Complete o campo para enviar uma tarefa')
        }

        Api.post('/task',{
            description:task,

        },{
            headers:{
                Authorization:`Bearer ${token}`,

            }


        }).then(response=>loadTasks())

    }

    if(!auth){
        return <Navigate to='/login'/>
    }


    function handleCompleted(id){

        const newTasks = tasks.filter(task=>task._id!==id)
        Api.put(`/task/${id}`,{completed:true},{
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then(response=>setTasks(newTasks))
    }
    
   


    return (
        <Container>
        <InputContainer onSubmit={handleSubmit(onSubmit)}>
        <time>13 de junho de 2022</time>
        <section>
            <Input icon={FiEdit2} placeholder='Nova tarefa' register={register} name='task'/>
            <Button type='submit'>Adicionar</Button>
        </section>
      
        </InputContainer>
        <TasksContainer>
            {tasks.map(task=><Card key = {task._id} title={task.description} date={task.createdAt} onClick={()=>{handleCompleted(task._id)}}/>)}

        </TasksContainer>
        <ToastContainer/>
        </Container>
        


    )
}

export default Dashboard;