import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MoviesList = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get(
                    'https://api.themoviedb.org/3/movie/popular',
                    {
                        params: {
                            api_key: '91df506cd7b6d15b42327b4ab8112795', // replace with your API key
                            language: 'en-US',
                            page: 1,
                        },
                    }
                );
                setMovies(response.data.results);
            } catch (error) {
                console.error("Error fetching movies: ", error);
            }
        };

        fetchMovies();
    }, []);

    const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';

    // Filter movies based on search term
    const filteredMovies = movies.filter((movie) =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className=" container  mx-auto p-4">
            {/* Header with Search Input */}
            <header className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold">Popular Movies</h1>
                <input
                    type="text"
                    placeholder="Search movies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-2 w-64 focus:outline-none focus:border-blue-500"
                />
            </header>

            {/* Movie Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredMovies.map((movie) => (
                    <div key={movie.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                        <img
                            src={`${imageBaseUrl}${movie.poster_path}`}
                            alt={movie.title}
                            className="w-full h-64 object-cover"
                        />
                        <div className="p-4">
                            <h2 className="text-lg font-semibold mb-2">{movie.title}</h2>
                            <p className="text-gray-600 text-sm">{movie.release_date}</p>
                            <p className="mt-2 text-gray-700 text-sm">
                                {movie.overview.substring(0, 100)}...
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MoviesList;
