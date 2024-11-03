import { Button } from 'react';
import { Link, Outlet } from 'react-router-dom';

function Layout() {
  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top" data-bs-theme="dark">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              <img src="Image/HomePage/KillGame.png" alt="Bootstrap" width="30" height="24" />
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/">Inicio</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/calculadoraIMC">Calculador IMC</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/gestorbilleteras">Gestor de Billeteras</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link " to="/juegonave">Juego Nave</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link " to="/desafiomatematico">Desafio Matematico</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link " to="/nosotros" >Colaboradores</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <main className='main-content'>
        <div className="container-fluid">
          <Outlet></Outlet>
        </div>
      </main>
      <footer>
        <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-bottom ">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
            <img src="Image/HomePage/KillGame.png" alt="Bootstrap" width="30" height="24" />
              FUNDAMENTOS DE PROGRAMACION WEB - 2024
            </Link>
          </div>
        </nav>
      </footer>
    </>
  );
}
export default Layout;