import Button from 'react-bootstrap/Button'; 
import { Fade } from "react-awesome-reveal";
function AboutUs({ lista }) {  
  const colaboradores = lista.map((colaborador) => (  
    <div className="card text-bg-dark border-light mb-3" key={colaborador.id}>  
      <div className="row g-0">  
        <div className="col-md-4">  
          <img src={colaborador.image} className="img-fluid rounded-start" />  
        </div>  
        <div className="col-md-8">  
          <div className="card-body">  
            <h5 className="card-title">{colaborador.name}</h5>  
            <p className="card-text text-start">{colaborador.descripcion}</p>  
            <Button   
              variant="dark"   
              onClick={() => window.location.href = colaborador.url}  
            >  
              Perfil GitHub  
            </Button>  
          </div>  
        </div>  
      </div>  
    </div>  
  ));  

  return (  
    <Fade cascade>  
      <section className="section1">  
        <nav className="navbar bg-body-tertiary">  
          <div className="container-fluid">  
            <span className="navbar-brand mb-0 h1">Equipo de desarrollo del Grupo 3</span>  
          </div>  
        </nav>  
      </section>  
      <section id="section2" className="section2 container-fluid">  
        <div>  
          {colaboradores}  
        </div>  
      </section>  
    </Fade> 
  );  
}  
export default AboutUs;