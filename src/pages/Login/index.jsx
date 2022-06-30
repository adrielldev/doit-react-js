import { AnimationContainer, Background } from './styles'
import { Container } from './styles'
import { Content } from './styles'
import Button from '../../components/Button'
import { Link, useNavigate,Navigate } from 'react-router-dom';
import  Input  from '../../components/Input'
import {FiUser,FiMail,FiLock} from 'react-icons/fi/'
import {set, useForm} from 'react-hook-form'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import Api from '../../services/api';
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';




function Login({auth,setAuth}){

    const schema =yup.object().shape({
        email:yup.string().email('email inválido').required('campo obrigatório'),
        password:yup.string().min(8,'Minimo 8 digitos').required('campo obrigatório'),
    })



    

    const {
        register,
        handleSubmit,
        formState:{errors},
} = useForm({
    resolver:yupResolver(schema)
});

    const onSubmitFunction = (data) => {
        
        Api.post('/user/login',data)
        .then(response=>{
            const { token,user } = response.data;
            console.log(response.data)
            localStorage.setItem('@Doit:token',token);
            localStorage.setItem('@Doit:user',JSON.stringify(user));

            setAuth(true)
            toast.success('logado com sucesso')
            return navigate('/dashboard')
        })
        .catch(err=>{
            console.log(err)
            toast.error('Erro!')
        })
    }

    const navigate = useNavigate()

    if(auth){
        return <Navigate to='/dashboard'/>
    }


    return (
        <Container>
            
            <Content>
                <AnimationContainer>
                    <form onSubmit={handleSubmit(onSubmitFunction)}>
                    <h1>Cadastro</h1>
                    <Input icon ={FiMail} label='Email' placeholder='Seu melhor email' register={register} name='email' error={errors.email?.message}> </Input>
                    <Input label='Senha' icon={FiLock} placeholder='Uma senha bem segura' register={register} type='password' name='password' error={errors.password?.message}> </Input>
                    

                    <Button type='submit'>Enviar</Button>
                    <p>Não tem uma conta? faça seu <Link to='../signup'>Cadastro</Link></p>
                        
                    </form>
                    
                </AnimationContainer>
                
            </Content>
            <Background/>

        </Container>
    )
}

export default Login