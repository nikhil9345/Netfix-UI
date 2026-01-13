import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Films.css';

const Films = ({ searchQuery }) => {
    const [moviesByLanguage, setMoviesByLanguage] = useState({});
    const [error, setError] = useState(null);
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        // Fetch movie data
        axios.get(`${import.meta.env.VITE_API_URL}/movies`) // Ensure your API supports this
            .then(res => {
                console.log(res.data); // Check the response data

                setMovies(res.data.slice(0, 10)); // Set data with the response
                
                // Grouping logic
                const groupedMovies = res.data.reduce((acc, movie) => {
                    if (!acc[movie.language]) {
                        acc[movie.language] = []; // Create an array for a new language
                    }
                    acc[movie.language].push(movie); // Add the movie to the corresponding language
                    return acc;
                }, {});

                setMoviesByLanguage(groupedMovies); // Set grouped movies in state
            })
            .catch(error => {
                console.error("Error in getting data:", error);
                setError("Failed to load movies."); // Set error message
            });
    }, []); // Empty dependency array ensures this runs only once after initial render

    // Handle error display if there's an error
    if (error) {
        return <div>Error: {error}</div>; // Show an error message if there's an error
    }

    // Calculate filtered movies based on the search query
    const filteredMovies = movies.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className='fullpa'>
            <h1>Top Movies</h1>
            <div className='moc'>
                {filteredMovies.map((item) => (
                    <div key={item.id} className='moid'>
                        <h1>{item.id}</h1> {/* Display id for each movie */}
                        <img src={item.imgVertical} alt={item.title} />
                    </div>
                ))}
            </div>

            <h1 className='tit'>Movies by Language</h1>
            {Object.keys(moviesByLanguage).map(language => (
                <div key={language} className='language-section'>
                    <h2>{language}</h2> {/* Display the language */}
                    <div className='ml'>
                        {moviesByLanguage[language].map((item) => (
                            <div key={item.id} className='mli'>
                                <img src={item.imgHorizontal} alt={item.title} />
                                <p>{item.title}</p> {/* Display title if needed */}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Films;


