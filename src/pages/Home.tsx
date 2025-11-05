import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


interface Filme {
  title: string;
  description: string;
  director: string;
  producer: string;
  release_date: string;
  rt_score: string;
  image: string;
  id: string;
}

export default function Home() {
  const [filmes, setFilmes] = useState<Filme[]>([]);

  useEffect(() => {
    const url = "https://ghibliapi.vercel.app/films";

    async function fetchFilmes() {
      try{
        const response = await fetch(url);
        const data: Filme[] = await response.json();

        const filmesOrdenados = data
          .sort((a,b) => a.title.localeCompare(b.title))
          .slice(0, 10);

        setFilmes(filmesOrdenados);
      }catch(error) {
        console.error("Erro ao buscar filmes:", error);
      }  
    }

    fetchFilmes();
  }, []);

  return (
    <div className='min-h-screen p-10'>
      <h1 className='text-4xl font-bold text-center mb-10 text-titulo'>
        Filmes Studio Ghibli
      </h1>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10'>
        {filmes.map((f) => (
          <Link
            to={`/films/${f.id}`}
            key={f.id}
            className='card-dark rounded-2xl shadow-md overflow-hidden transform hover:scale-105 hover:shadow-2xl transition-all duration-300'
          >
            <img
              src={f.image}
              alt={f.title}
              className='w-full h-72 object-cover'
            />
            <div className='p-4'>
              <h2 className='text-lg font-semibold'>{f.title}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
