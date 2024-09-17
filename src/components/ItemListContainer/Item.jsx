import Card from "react-bootstrap/Card"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import { Link } from 'react-router-dom'

function Item ({ item }) {
    return (
        
        <Col className="RowCard" >
            <Card className="Card">
                <Card.Img className="CardImg" variant="top" src={item.avatar} />
                <Card.Body className="CardBody">
                    <Card.Title>{item.name}</Card.Title>
                    {/* <Card.Text>
                        {item.category}
                    </Card.Text> */}
                    <Card.Text>
                        ${item.price}
                    </Card.Text>
                </Card.Body>
                <Button className="ButtonMasInfo" as={Link} to={`/producto/${item.id}`}>Más información</Button>

            </Card>
        
        </Col>
    )
}

export default Item