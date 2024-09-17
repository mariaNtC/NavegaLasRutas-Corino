import { useParams } from "react-router-dom"
import {useState, useEffect} from 'react'
import Card from "react-bootstrap/Card"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"

function ItemDetailContainer () {
    const [detalle, setDetalle] = useState()
    const { id } = useParams()

    useEffect(() => {
    
        fetch(`https://66e7a03cb17821a9d9d970ed.mockapi.io/api/tienda/products/${id}`)
        .then(res => res.json())
        .then(res => setDetalle(res))
    }, [id])

    return (

        <Col className="ColDetail">
            <Card className="CardDetail">
                <div className = "imgDetailContainer">
                    <Card.Img className="CardImg" variant="left" src={detalle?.avatar} />
                </div>
                <div className = "deailContainer">
                    <Card.Title>{detalle?.name}</Card.Title>
                    <Card.Text className="itemDetailCategory">{detalle?.category}</Card.Text>
                    <Card.Text>{detalle?.description}</Card.Text>
                    <Card.Text className="itemDetailPrice">${detalle?.price}</Card.Text>
                    <Button className="ButtonMasInfo" >Agregar al carrito</Button>
                </div>
                
            </Card>
        </Col>
    )
    
}

export default ItemDetailContainer