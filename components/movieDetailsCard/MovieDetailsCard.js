import styles from './MovieDetailsCard.module.css';
import Image from 'next/image';
import MissingMoviePoster from '../../public/images/movie_poster_missing.jpg';

const MovieDetailsCard = (props) => {

    return (
        <div className={(props.activeMovieCardID) ? styles.moviesDetailsContainer_open : styles.moviesDetailsContainer_closed }>
            {props.moviesData.map((movie, i) => {
            if (movie.imdbID === props.activeMovieCardID) {
                return (
                <aside 
                    key={i}
                    className={styles.movieDetails_open} 
                >
                    <a className={styles.close} onClick={props.closeDetailClicked} aria-label="close movie detail"/>
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
                    <dt className={styles.movieDetailHeading}>
                        <h3>plot</h3>
                    </dt>
                    <dd className={styles.movieDetail}>
                        {movie.Plot}
                    </dd>
                    <dt className={styles.movieDetailHeading}>
                        <h3>actors</h3>
                    </dt>
                    <dd className={styles.movieDetail}>
                        {movie.Actors}
                    </dd>
                    <dt className={styles.movieDetailHeading}>
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
    )
}

export default MovieDetailsCard;