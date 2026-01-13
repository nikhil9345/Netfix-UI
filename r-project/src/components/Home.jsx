import React, { useState, useEffect } from 'react';
import './Home.css';
import { FaPlay } from "react-icons/fa";
import axios from 'axios'; // Import axios
import ReactPlayer from 'react-player';

// Home component
const Home = ({ searchQuery,addToMyList }) => {
    const [data, setData] = useState([]);
    const [seriesData, setSeriesData] = useState([]);
    const [playingVideo, setPlayingVideo] = useState(null); // State to manage video playback

    // Fetch data when component mounts
    useEffect(() => {
        // Fetch movies
        axios.get(`${import.meta.env.VITE_API_URL}/movies`)
            .then(res => {
                console.log(res.data);
                setData(res.data);
            })
            .catch(() => {
                console.log("Error in getting data");
            });

        // Fetch web series
        axios.get(`${import.meta.env.VITE_API_URL}/webseries`)
            .then(res => {
                console.log(res.data);
                setSeriesData(res.data);
            })
            .catch(() => {
                console.log("Error in getting series data");
            });
    }, []);

    const playVideo = (videoSrc) => {
        setPlayingVideo(videoSrc); // Set the video to play
    };

    const closeVideo = () => {
        setPlayingVideo(null); // Close the video
    };

    // Filter movies and series based on the search query
    const filteredMovies = data.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredSeries = seriesData.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className='homeimg'>
            <div className='imgtitle'>
                <h1>STRANGER THINGS</h1>
                <h6>IMDB 8.7 <div>U/A Rated</div></h6>
                <div className='discription'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto repellendus illum dolore inventore ipsum.
                </div>
                <button className='playbtn'><span><FaPlay /> Play</span></button>
            </div>

            <div className='mainc'>
                <h4>Movies</h4>
                <div className="mo">
                    {filteredMovies.map((item, index) => (
                        <div key={index} className="image-container">
                            <img src={item.imgHorizontal} height="130px" width="220px" alt={item.title} />
                            <div className="card" style={{ width: '20rem', color: 'black' }}>
                                <img src={item.imgHorizontal} className="card-img-top" alt={item.title} />
                                <div className="card-body">
                                    <h5 className="card-title">{item.title}</h5>
                                    <span className="card-text">{item.description}</span>
                                    <div className='card-gl'>
                                        <span>Language: {item.language}</span>
                                        <span>Genre: {item.genre}</span>
                                    </div>
                                </div>
                                <button onClick={() => playVideo(item.video)}>Play</button>
                                <button onClick={() => addToMyList(item)}>Add to Watchlist</button>
                            </div>
                        </div>
                    ))}
                </div>

                <h4 className='na-s'>Series</h4>
                <div className="web-container">
                    {filteredSeries.map((item, index) => (
                        <div key={index} className="image-container">
                            <img src={item.imgHorizontal} height="130px" width="220px" alt={item.title} />
                            <div className="card" style={{ width: '20rem', color: 'black' }}>
                                <img src={item.imgHorizontal} className="card-img-top" alt={item.title} />
                                <div className="card-body">
                                    <h5 className="card-title">{item.title}</h5>
                                    <span className="card-text">{item.description}</span>
                                    <div className='card-gl'>
                                        <span>Language: {item.language}</span>
                                        <span>Genre: {item.genre}</span>
                                    </div>
                                </div>
                                <button onClick={() => playVideo(item.video)}>Play</button>
                                <button onClick={() => addToMyList(item)}>Add to Watchlist</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {playingVideo && (
                <div className="video-modal">
                    <div className="video-overlay">
                        <ReactPlayer
                            url={playingVideo}
                            className='react-player'
                            playing
                            controls
                            width='100%'
                            height='100%'
                        />
                        <button onClick={closeVideo} className="close-button">Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;


