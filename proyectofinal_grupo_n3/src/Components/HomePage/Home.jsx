import { Link } from 'react-router-dom';
import { Fade } from "react-awesome-reveal";
function Home() {
    return (
        <>
       < Fade> 
            <section className="section1">
                <div id="carouselExample" className="carousel slide img-fluid">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src="Image/HomePage/construccion3.1.png" className="d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item">
                            <Link to="/nosotros">
                                <img src="Image/HomePage/construccion1.2.png" className="d-block w-100" alt="..." />
                            </Link>
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

            <section className="section2">
                <div className="grid text-center" data-bs-theme="dark">
                    <div className="row">
                        <div className="col-12 col-md-6 mb-4">
                            <div className="card">
                                <img src="Image/HomePage/capIMC.png" className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">Calculador IMC</h5>
                                    <p className="card-text">Descubre tu IMC con esta herramienta interactiva. Ingresa tu nombre, apellido, peso y altura para obtener tu Índice de Masa Corporal al instante. Ideal para quienes desean monitorear su salud de manera rápida y fácil.</p>
                                    <Link to="http://localhost:5173/calculadoraIMC" className="btn btn-primary">Ir a pagina</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 mb-4">
                            <div className="card">
                                <img src="Image/HomePage/billetera.png" className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">Gestor de Billeteras</h5>
                                    <p className="card-text">Administra las cuentas y transacciones en billeteras virtuales de manera eficiente. Visualiza un listado completo de usuarios, con el nombre, la billetera asociada y el número de transacciones realizadas. Además, descubre la billetera más activa y su usuario.</p>
                                    <Link to="http://localhost:5173/gestorbilleteras" className="btn btn-primary">Ir a pagina</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 mb-4">
                            <div className="card">
                                <img src="Image/HomePage/capNave.png" className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">Juego Nave</h5>
                                    <p className="card-text">Pon a prueba tus reflejos con este emocionante juego en Phaser. Controla una nave espacial y esquiva los meteoros que caen sin cesar desde el cielo. ¿Cuánto tiempo puedes sobrevivir en esta lluvia de meteoros?</p>
                                    <Link to="http://localhost:5173/juegonave" className="btn btn-primary">Ir a pagina</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 mb-4">
                            <div className="card">
                                <img src="Image/HomePage/desafioMat.png" className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">Desafio Matematico</h5>
                                    <p className="card-text">Un divertido juego educativo de Matemáticas. Resuelve diferentes operaciones mientras te diviertes, ¡ideal para aprender matemáticas de manera entretenida!</p>
                                    <Link to="http://localhost:5173/desafiomatematico" className="btn btn-primary">Ir a pagina</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            </Fade>
        </>
    );
}

export default Home;
