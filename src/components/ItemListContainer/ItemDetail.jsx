import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import ItemCount from "./ItemCount";

function ItemDetail({ detail }) {
    return (
        <Col className="ColDetail">
            <Card className="CardDetail">
                <div className="imgDetailContainer">
                    <Card.Img className="CardImg" variant="left" src={detail?.image} />
                </div>
                <div className="detailContainer">
                    <Card.Title className="itemCardName">{detail?.name}</Card.Title>
                    <Card.Text className="itemDetailCategory">{detail?.category}</Card.Text>
                    <Card.Text>{detail?.description}</Card.Text>
                    <div className="itemDetailPrice">
                        <p className="itemDetailPriceText">PRECIO</p>
                        <p className="itemDetailPrice">${detail?.price}</p>
                        <p className="itemDetailStockText">Stock disponible: {detail?.stock}</p>
                    </div>
                    <ItemCount producto={detail} />                
                </div>
            </Card>
        </Col>
    );
}

export default ItemDetail;
