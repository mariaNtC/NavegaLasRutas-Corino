import Row from "react-bootstrap/Row"
import Container from "react-bootstrap/Container"
import ItemList from "./ItemList.jsx"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { getProductos, getProductoPorCategoria } from '../../firebase/db'
import { useCartContext } from "../../context/cartContext.js" 
import Loader from "../Loader.jsx"

function ItemListContainer () {
    const [items, setItems] = useState([])
    const { categoriaId } = useParams()
    const { cart } = useCartContext()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        
        const fetchData = async () => {
            try {
                let productos;
                if (categoriaId) {
                    productos = await getProductoPorCategoria(categoriaId)
                } else {
                    productos = await getProductos()
                }
                setItems(productos)
            } catch (error) {
                console.error("Error al obtener los productos:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()

    }, [categoriaId])
 

    return (
        
        <Container className="containerItemList">              
              {loading ? (<Loader loading={loading} />) : (
            <Row xs={1} md={2} lg={4} className="g-4">
                <ItemList items={items} />
            </Row>
              )}
        </Container>
        
    )
}

export default ItemListContainer