import {Container, InputContainer} from './styles'


function Input({label, icon:Icon,register,name,error, ...rest }){

    


    
    return (
       <Container> 
           <div>{label} {!!error && <span> - {error}</span>}</div>

        
            <InputContainer isErrored={error}>
                {Icon && <Icon size={20}/>}
                <input {...register(name)}placeholder={rest.placeholder} type={rest.type}/>
            
            
            </InputContainer>

           
       </Container>
    )
}

export default Input