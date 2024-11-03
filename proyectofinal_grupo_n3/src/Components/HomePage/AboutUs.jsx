function AboutUs({ lista }) {
    const colaboradores = lista.map((colaborador) => (
    <div className="col" key={colaborador.id}>
        <div className="card w-50 mb-3 d-inline-flex p-2">
            <img src={colaborador.image} className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{colaborador.name}</h5>
                <p className="card-text">{colaborador.descripcion}</p> </div>
        </div> 
        </div>));
    return (
        <> <section className="section1">
           
            <nav className="navbar bg-body-tertiary">
                <div className="container-fluid">
                    <span className="navbar-brand mb-0 h1">Equipo de desarrollo del Grupo 3</span>

                </div>
            </nav>
        </section>
            <section id="section2" className="section2 container-fluid">
                <div className="row row-cols-1 row-cols-md-2 mx-auto p-2">
                    {colaboradores}
                </div>
            </section>
        </>


    );
}
export default AboutUs;