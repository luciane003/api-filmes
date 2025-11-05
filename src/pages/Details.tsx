import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

interface Filme {
    title: string,
    description: string,
    director: string,
    producer: string,
    release_date: string,
    rt_score: string,
    image: string,
    id: string
}

export default function Details() {
    const { id } = useParams<{ id: string }>();
    const [filme, setFilme] = useState<Filme | null>(null);

    useEffect(() => {
        const url = `https://ghibliapi.vercel.app/films/${id}`

        async function fetchFilme() {
            const response = await fetch(url);
            const data = await response.json();
            setFilme(data);
        }

        fetchFilme();

        //ele roda de novo se o id mudar.
    }, [id]);

    if (!filme) {
        return (
            <div className="body flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-[var(--color-carregando)] border-solid"></div>
            </div>
        );
    }

    return (
        <div className="body min-h-screen flex flex-col items-center py-10 px-5">
            <div className="card-dark max-w-3xl shadow-lg rounded-2xl p-8">
                <img
                    src={filme.image}
                    alt={filme.title}
                    className="w-full max-w-3xl mx-auto rounded-2xl shadow-lg mb-6 object-cover object-[50%_20%] h-[500px]" />

                <h1 className="text-3xl font-bold mb-4">{filme.title}</h1>
                <p className="text-[var(--color-descricao)] mb-6 leading-relaxed">{filme.description}</p>

                <div className="grid grid-cols-2 gap-2 text-[var(--color-texto)] mb-8">
                    <p><strong className='text-[var(--color-outras-informacoes)]'>Diretor:</strong> {filme.director}</p>
                    <p><strong className='text-[var(--color-outras-informacoes)]'>Produtor:</strong> {filme.producer}</p>
                    <p><strong className='text-[var(--color-outras-informacoes)]'>Lançamento:</strong> {filme.release_date}</p>
                    <p><strong className='text-[var(--color-outras-informacoes)]'>Avaliação:</strong> {filme.rt_score}</p>
                </div>

                <Link
                    to="/"
                    className="button-accent inline-block px-6 py-2 rounded-lg transition-all">
                    Voltar
                </Link>
            </div>
        </div>
    )
}