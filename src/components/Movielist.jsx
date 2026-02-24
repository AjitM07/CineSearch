import { useState, useEffect } from 'react'
import Loader from './Loader';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

function MovieList () {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [modalLoading, setModalLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    setError(null)

    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${page}`
    )
      .then(response => {
        if (!response.ok) {
          throw new Error('API request failed')
        }
        return response.json()
      })
      .then(data => {
        setTimeout(()=>{
        setMovies(data.results)
        setLoading(false)
        }, 1200) 
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [page])

  if (loading) {
    return <Loader />;
  }
  if (error) {
    return <p>Error: {error}</p>
  }

  return (
    <div>

      {modalLoading && <Loader/>}

      {selectedMovie && (
        <div className='modal'>
          <div className='modal-content'>
            <h2 className='movie-title'>{selectedMovie.title}</h2>
            <div className='det-align'>
              <div className='mov-img'>
                <img
                  src={
                    'https://image.tmdb.org/t/p/w500' +
                    selectedMovie.poster_path
                  }
                  alt={selectedMovie.title}
                  width='300'
                />
              </div>

              <div className='mov-details'>
                <p>
                  <b className='overview'>Overview : </b>
                  <br></br>
                  {selectedMovie.overview}
                </p>
                <p>
                  <b className='rel-date'>Release Date : </b>
                  {selectedMovie.release_date}
                </p>
                <p>
                  <b className='lang'>Original Language : </b>
                  {selectedMovie.original_language}
                </p>
                <p>
                  <b className='rating'>Rating : </b>
                  {selectedMovie.vote_average}
                </p>
              </div>
            </div>

            <button onClick={() => setSelectedMovie(null)}>Close</button>
          </div>
        </div>
      )}

      <h2>Find Latest Movies Here</h2>

      <div className='navigation'>
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Previous
        </button>
        <span> Page {page} </span>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>

      <div className='movies-container'>
        {movies.map(movie => (
          <div
            className='movie-card'
            key={movie.id}
            onClick={() => {
              setModalLoading(true);
              setTimeout(() => {
                  setSelectedMovie(movie);
                  setModalLoading(false);
              },1200);
            }}
          >
            <img
              src={'https://image.tmdb.org/t/p/w500' + movie.poster_path}
              alt={movie.title}
              width='150'
            />
            <p>{movie.title}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MovieList
