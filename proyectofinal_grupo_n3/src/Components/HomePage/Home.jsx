import { Link } from 'react-router-dom';
function Home() {
    return (
        <>
           
            <section className="section1">
                <div id="carouselExample" className="carousel slide img-fluid">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src="Image/HomePage/construccion4.jpg" className="d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="Image/HomePage/construccion1.jpg" className="d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="Image/HomePage/construccion3.jpg" className="d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="Image/HomePage/construccion5.jpg" className="d-block w-100" alt="..." />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </section>
            <section >
                <Link>
                    <nav className="navbar bg-body-tertiary" data-bs-theme="dark">
                        <div className="container-fluid">
                            <span className="navbar-brand mb-0 h1"></span>
                        </div>
                    </nav>
                </Link>
            </section>

            <section className="section2" >
                <div className="grid text-center" data-bs-theme="dark">
                    <div className="row">
                        <div className="col-12 col-md-4">
                            <div className="card" >
                                <img src="Image/HomePage/construccion1.jpg" className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">Inicio</h5>
                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                    <Link to="http://localhost:5173/" className="btn btn-primary">Go somewhere</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-4">
                            <div className="card">
                                <img src="Image/HomePage/capIMC.png" className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">Calculador IMC</h5>
                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                    <Link to="http://localhost:5173/calculadoraIMC" className="btn btn-primary">Go somewhere</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-4">
                            <div className="card" >
                                <img src="Image/HomePage/capGB.png" className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">Gestor de Billeteras</h5>
                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                    <Link to="http://localhost:5173/gestorbilleteras" className="btn btn-primary">Go somewhere</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-4">
                            <div className="card" >
                                <img src="Image/HomePage/capNave.png" className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">Juego Nave</h5>
                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                    <Link to="http://localhost:5173/juegonave" className="btn btn-primary">Go somewhere</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-4">
                            <div className="card" >
                                <img src="Image/HomePage/capDM..png" className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">Desafio Matematico</h5>
                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                    <Link to="http://localhost:5173/desafiomatematico" className="btn btn-primary">Go somewhere</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-4">
                            <div className="card" >
                                <img src="Image/HomePage/capColab.png" className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">Colaboradores</h5>
                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                    <Link to="http://localhost:5173/nosotros" className="btn btn-primary">Go somewhere</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
export default Home;
