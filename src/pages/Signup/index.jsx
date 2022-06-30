import { AnimationContainer, Background } from './styles'
import { Container } from './styles'
import { Content } from './styles'
import Button from '../../components/Button'
import { Link, useNavigate } from 'react-router-dom';
import  Input  from '../../components/Input'
import {FiUser,FiMail,FiLock} from 'react-icons/fi/'
import {useForm} from 'react-hook-form'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import Api from '../../services/api';
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';




function Signup({auth}){

    const schema =yup.object().shape({

        name:yup.string().required('campo obrigatório'), 
        email:yup.string().email('email inválido').required('campo obrigatório'),
        password:yup.string().min(8,'Minimo 8 digitos').required('campo obrigatório'),
        passwordConfirm:yup.string().oneOf([yup.ref('password'),'Senhas diferentes']).required('campo obrigatório')

    })



    

    const {
        register,
        handleSubmit,
        formState:{errors},
} = useForm({
    resolver:yupResolver(schema)
});

    const onSubmitFunction = ({name,email,password}) => {
        const user = {name,email,password}
        Api.post('/user/register',user)
        .then(response=>{
            
            toast.success('Sucesso ao criar a conta')

            return navigate('/login')

        })
        .catch(_=>toast.error('Erro ao criar a conta, tente outro email'))

    }

    const navigate = useNavigate()

    if(auth){
        return navigate('/dashboard')
    }


    return (
        <Container>
            <Background/>
            <Content>
                <AnimationContainer>
                    <form onSubmit={handleSubmit(onSubmitFunction)}>
                    <h1>Cadastro</h1>
                    <Input icon={FiUser}label='Nome' placeholder='Nome' register={register} name='name' error={errors.name?.message}> </Input>
                    <Input icon ={FiMail} label='Email' placeholder='Seu melhor email' register={register} name='email' error={errors.email?.message}> </Input>
                    <Input label='Senha' icon={FiLock} placeholder='Uma senha bem segura' register={register} type='password' name='password' error={errors.password?.message}> </Input>
                    <Input label='Senha' icon={FiLock} placeholder='Confirmação da senha' register={register} type='password' name='passwordConfirm' error={errors.passwordConfirm?.message}> </Input>

                    <Button type='submit'>Enviar</Button>
                    <p>Já tem uma conta? faça seu <Link to='../login'>Login</Link></p>
                        
                    </form>
                    
                </AnimationContainer>
                
            </Content>


        </Container>
    )
}

export default Signup