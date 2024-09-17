import Item from "./Item.jsx"

function ItemList ({ items }) {
    return (
        <>
            {items.map(item => <Item key={item.id} item ={item} />)}
        </>
    )
}

export default ItemList