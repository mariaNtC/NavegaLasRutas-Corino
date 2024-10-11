import Card from "react-bootstrap/Card"
import Col from "react-bootstrap/Col"
import { Link } from 'react-router-dom'

function Item ({ item }) {
    return (
        
        <Col className="RowCard" >
            <Card className="Card">
                <Card.Img className="CardImg" variant="top" src={item.image} />
                <Card.Body className="CardBody">
                    <Card.Title>{item.name}</Card.Title>                  
                </Card.Body>
                <Card.Text className="CardPrice">
                        ${item.price}
                </Card.Text>
                <Link className="linkButtonMasInfo"  to={`/producto/${item.id}`}> <button className="ButtonMasInfo" >  Más información</button></Link>

            </Card>
        
        </Col>
    )
}

export default Item