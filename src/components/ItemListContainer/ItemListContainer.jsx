import Row from "react-bootstrap/Row"
import Container from "react-bootstrap/Container"
import ItemList from "./ItemList.jsx"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"


function ItemListContainer (){

const [items, setItems] = useState([])
const { categoriaId } = useParams()


useEffect(() => {
    fetch('https://66e7a03cb17821a9d9d970ed.mockapi.io/api/tienda/products')
        .then(res => res.json())
        .then(res => {
            if (!categoriaId) {
                setItems(res)
        } else {
            const productosPorCategoria = res.filter(item => item.category === categoriaId)
            setItems(productosPorCategoria)            
        }
        })
}, [categoriaId])

return (
    <Container>
        <Row xs={1} md={2} lg={4} className="g-4">
            <ItemList items={items} />
        </Row>
    </Container>
)
}

export default ItemListContainer