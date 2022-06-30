import { Container } from "./styles"
const Button = ({children,whiteSchema,...rest}) => {

    return (
    
     <Container whiteSchema={whiteSchema} type='button' {...rest}>
        {children}
    </Container> 
   
    )
    
}

export default Button
