import React from 'react';

const About: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">Sobre Nosotros</h1>
      <div className="max-w-3xl mx-auto">
        <p className="mb-4 text-base md:text-lg">
          En GaelDeco, nos apasiona ayudarte a crear espacios hermosos y acogedores que reflejen tu estilo personal. 
          Fundada en 2010, nuestra tienda se ha convertido en un referente en decoración del hogar, ofreciendo una 
          cuidadosa selección de productos de alta calidad y diseño innovador.
        </p>
        <p className="mb-4 text-base md:text-lg">
          Nuestro equipo está formado por expertos en diseño de interiores y amantes de la decoración, siempre 
          dispuestos a asesorarte y ayudarte a encontrar las piezas perfectas para tu hogar. Creemos que cada espacio 
          tiene el potencial de ser extraordinario, y estamos aquí para ayudarte a descubrir ese potencial.
        </p>
        <p className="text-base md:text-lg">
          En GaelDeco, no solo vendemos productos, sino que inspiramos estilos de vida. Te invitamos a explorar 
          nuestra colección y a descubrir cómo podemos transformar tu hogar juntos.
        </p>
      </div>
    </div>
  );
};

export default About;