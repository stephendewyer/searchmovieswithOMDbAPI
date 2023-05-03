import { Fragment, useState, useMemo, useEffect, useRef} from 'react';
import SortButton from '../buttons/SortButton.js';
import MovieCard from '../movieCard/MovieCard.js';
import Pagination from '../pagination/Pagination.js';
import MissingMoviePoster from '../../public/images/movie_poster_missing.jpg';
import styles from './Search.module.css';
import Image from 'next/image';

const Search = () => {

  const searchInputRef = useRef();

  const [data, setData] = useState([]);

  const [fullMovieData, setFullMovieData] = useState([]);
  const [defaultFullMovieData, setDefaultFullMovieData] = useState([]);

  const [sortByYear, setSortByYear] = useState(false);
  const [sortByRating, setSortByRating] = useState(false);
  const [sortByLength, setSortByLength] = useState(false);

  const [sortDataByYear, setSortDataByYear] = useState([]);
  const [sortDataByRating, setSortDataByRating] = useState([]);
  const [sortDataByLength, setSortDataByLength] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  let PageSize = 4;
  
  const [currentPage, setCurrentPage] = useState(1);

  const [searchTerm, setSearchTerm] = useState("great");

  const [activeMovieCardID, setActiveMovieCardID] = useState("");

  // begin function to get full movie results for movies by imdbIDs

  const getFullMovieData = (imdbIDs) => {
    const fullMovies = imdbIDs.map(async (imdbID) => {
      const movieURL = `https://www.omdbapi.com/?i=${imdbID}&apikey=${process.env.NEXT_PUBLIC_OMDB_API_KEY}&`;
      const res = await fetch(movieURL);
      return res.json();
    })
    return fullMovies;
  }

  // end function to get full movie results for movies by imdbIDs

  useEffect(() => {
    const getMovieData = async (searchTerm) => {
      try {
        setIsLoading(true);
        const searchURL = `https://www.omdbapi.com/?s=${searchTerm}&apikey=${process.env.NEXT_PUBLIC_OMDB_API_KEY}&`;
        const searchResponse = await fetch(searchURL);
        const movieData =  await searchResponse.json();
        setData(movieData.Search);
        setCurrentPage(1);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
		getMovieData(searchTerm);
	}, [searchTerm]);

  useEffect(() => {

    // if too many results, don't load data
    if (!data) {
      return;
    }

    // create an array of the imdbIds
    const imdbIDs = data.map(getimdbIDs);
    function getimdbIDs(item) {
      return item.imdbID;
    }

    // use promises to return all the data at once in the response since the map will request iterables
    const promises = getFullMovieData(imdbIDs);
    Promise.all(promises).then(values => {
      setFullMovieData(values);
      setDefaultFullMovieData(...[values]);
    })

  }, [data]);

  const searchHandler = (event) => {
    const currentSearchInputVal = searchInputRef.current.value;
    setSearchTerm(currentSearchInputVal);
    setActiveMovieCardID("");
    setSortByYear(false);
    setSortByRating(false);
    setSortByLength(false);
    if (searchInputRef.current.value === "") {
      setSearchTerm("great");
    }
  }

  const searchSubmitHandler = (event) => {
    event.preventDefault();
  }
  
  const movieCardClickHandler = (movie) => {
    if (activeMovieCardID === movie.imdbID) {
      setActiveMovieCardID("");
    } else {
      setActiveMovieCardID(movie.imdbID);
    }
  }
  
  const closeClickHandler = () => {
    setActiveMovieCardID("");
  }

  // begin sort buttons

  const  sortYearClickHandler = () => {
    setSortByYear(!sortByYear);
    setActiveMovieCardID("");
    setSortByRating(false);
    setSortByLength(false);
  }

  const sortRatingClickHandler = () => {
    setSortByRating(!sortByRating);
    setActiveMovieCardID("");
    setSortByLength(false);
    setSortByYear(false);
  }

  const sortLengthClickHandler = () => {
    setSortByLength(!sortByLength);
    setActiveMovieCardID("");
    setSortByYear(false);
    setSortByRating(false);
  }

  console.log(`sort by year ${sortByYear}`);
  console.log(`sort by length ${sortByLength}`);
  console.log(`sort by rating ${sortByRating}`);

  // begin sort buttons 

  useEffect(() => {
    if (sortByYear) {
      // IMPORTANT!  React will think javaScipt data object is the same without using the spread operator to create a new array. Use the spread operator to create a new array.
      setSortDataByYear([...defaultFullMovieData].sort((a, b) => Number(b.Year) - Number(a.Year)));
      setFullMovieData([...defaultFullMovieData].sort((a, b) => Number(b.Year) - Number(a.Year)));
    } else if (sortByRating) {
      // console.log(`sort by rating ${sortByRating}`)
      setSortDataByRating([...defaultFullMovieData].sort((a, b) => parseFloat(b.imdbRating) - parseFloat(a.imdbRating)));
      setFullMovieData([...defaultFullMovieData].sort((a, b) => parseFloat(b.imdbRating) - parseFloat(a.imdbRating)));
    } else if (sortByLength) {
      // console.log(`sort by length ${sortByLength}`)
      setSortDataByLength([...defaultFullMovieData].sort((a, b) => Number(b.Runtime.substring(0, b.Runtime.length -4)) - Number(a.Runtime.substring(0, a.Runtime.length -4))));
      setFullMovieData([...defaultFullMovieData].sort((a, b) => Number(b.Runtime.substring(0, b.Runtime.length -4)) - Number(a.Runtime.substring(0, a.Runtime.length -4))));
    } else {
      setFullMovieData([...defaultFullMovieData]);
    }
  }, [sortByYear, sortByRating, sortByLength, defaultFullMovieData]);

  // end sort buttons

  // begin setting the pagination pages with the movie data

  const moviesData = useMemo(() => {
    console.log(fullMovieData)
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return fullMovieData.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, fullMovieData, defaultFullMovieData, PageSize]);

  // end setting the pagination pages with the movie data

  return (
      <Fragment>
        <div className={styles.search_nav_bar}>
          <form 
            className={styles.search_bar_form}
            noValidate 
            autoComplete="off"
            onSubmit={searchSubmitHandler}
          >
            <label htmlFor="movie_search">
              <h1>
                search movies
              </h1>
            </label>
            <input 
              id="movie_search"
              type="search" 
              name="movie_search" 
              className={styles.search_bar_input}
              placeholder="movie title"
              ref={searchInputRef}
              onChange={searchHandler}
            />
          </form>
          <div className={styles.sort_nav_bar}>
            <p className={styles.sort_by_heading}>sort by:</p>
            <SortButton 
              sortButtonClicked={sortYearClickHandler}
              sortButtonActive={sortByYear}
            >
              year
            </SortButton>
            <SortButton 
              sortButtonClicked={sortRatingClickHandler}
              sortButtonActive={sortByRating}
            >
              rating
            </SortButton>
            <SortButton 
              sortButtonClicked={sortLengthClickHandler}
              sortButtonActive={sortByLength}
            >
              length
            </SortButton>
          </div>
        </div>
        <section 
          className={styles.moviesAndMovieDetailsContainer} 
        >
          <div className={(activeMovieCardID) ? styles.results_container_closed : styles.results_container_open}>
            <div className={(activeMovieCardID) ? styles.results_closed : styles.results_open}>
              {isLoading && 
                <div className={styles.loading}>Loading movies...</div>
              }
              {!isLoading && 
                <div className={styles.moviesListContainer}>
                  <div className={styles.moviesContainer}>
                    {moviesData.map((movie, i) => (
                        <MovieCard 
                          movieData={movie}
                          keyItem={i}
                          key={i}
                          activeCard={activeMovieCardID}
                          click={() => movieCardClickHandler(movie, i)}
                        />
                    ))}
                  </div>
                  <div className={styles.pagination_bar}>
                    <Pagination 
                      currentPage={currentPage}
                      totalCount={fullMovieData.length}
                      pageSize={PageSize}
                      onPageChange={(page) => setCurrentPage(page)}
                    />
                  </div>
                </div>
              }
            </div>
          </div>
          {(!isLoading) &&
              <div className={(activeMovieCardID) ? styles.moviesDetailsContainer_open : styles.moviesDetailsContainer_closed }>
              {moviesData.map((movie, i) => {
                if (movie.imdbID === activeMovieCardID) {
                  return (
                    <aside 
                      key={i}
                      className={styles.movieDetails_open} 
                    >
                      <a className={styles.close} onClick={() => closeClickHandler(movie, i)} aria-label="close movie detail"/>
                      <dl 
                        key={i}
                        className={styles.movieDetailsList}
                      >
                        <dd className={styles.moviePosterContainer}>
                          {(movie.Poster && (movie.Poster !== "N/A")) ? 
                            <img src={movie.Poster} alt="movie poster" className={styles.moviePoster}/> 
                            :
                            <Image src={MissingMoviePoster} alt="missing movie poster" priority/>
                          }
                          
                        </dd>
                        <dt>
                          <h3>plot</h3>
                        </dt>
                        <dd className={styles.movieDetail}>
                          {movie.Plot}
                        </dd>
                        <dt>
                          <h3>actors</h3>
                        </dt>
                        <dd className={styles.movieDetail}>
                          {movie.Actors}
                        </dd>
                        <dt>
                          <h3>awards</h3>
                        </dt>
                        <dd className={styles.movieDetail}>
                          {movie.Awards}
                        </dd>
                      </dl>
                    </aside>
                  )
                } else {
                  <aside className={styles.movieDetails_closed} />
                }
              })}    
              
            </div>
          }   
        </section>
    </Fragment>
  )
}

export default Search;