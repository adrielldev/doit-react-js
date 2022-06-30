import {Container} from './styles'
import {FiClipboard,FiCalendar} from 'react-icons/fi'
import Button from '../Button'
function Card({title,date,onClick}){

    console.log(title,date)
    return (
        <Container>
            <span>
            <FiClipboard/> {title}
            </span>
            <hr/>
            <time>
                <FiCalendar/> {date}
            </time>
            <Button onClick={onClick}>Concluir</Button>
        </Container>
    )
}
export default Card