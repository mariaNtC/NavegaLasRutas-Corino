function Loader ({loading}) {    
    if (loading) {  
        return (
        <div id="spinner" className="spinner">
            <img className="spinnerImg" src="https://i.ibb.co/ScRq1ZX/spinner.gif" alt="Cargando..."></img>
            <p className="spinnerText">CARGANDO</p>
            <p className="spinnerText"> .      .       .</p>
        </div>
        )
    }
    return null;
}

export default Loader