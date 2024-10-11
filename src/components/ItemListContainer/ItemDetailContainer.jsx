import { useParams } from "react-router-dom"
import { useState, useEffect } from 'react'
import { getProducto } from '../../firebase/db'
import ItemDetail from "./ItemDetail"
import Loader from "../Loader"

function ItemDetailContainer () {
    const [detail, setDetail] = useState(null)
    const [loading, setLoading] = useState(true)
    const { id } = useParams()

    useEffect(() => {  
        const fetchDetail = async () => {
            try {
                await getProducto(id, setDetail)
            } catch (error) {
                console.error("Error al obtener el producto:", error)
            } finally {
                setLoading(false) 
            }
        }

        fetchDetail()
    }, [id])

    return ( 
        <div>
            {loading ? (<Loader loading={loading} />) : (<ItemDetail detail={detail} /> )} 
        </div>
    )
}

export default ItemDetailContainer