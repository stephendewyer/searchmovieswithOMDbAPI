import Image from 'next/image';
import Star from '../../public/images/star.png';
import styles from './MovieCard.module.css';
import { useState } from 'react';
import classnames from 'classnames';

const MovieCard = (props) => {

    const [isHovering, setIsHovered] = useState(false);
    const onMouseEnterHandler = () => setIsHovered(true);
    const onMouseLeaveHandler = () => setIsHovered(false);
    
    return (
        <div 
            className={classnames(
                styles.movieCardContainer,
                {[styles.cardSelected]: (props.activeCard === props.movieData.imdbID)},
                {[styles.movieCardContainerHovered]: isHovering}
            )}
            key={props.keyItem}
            onMouseEnter={onMouseEnterHandler} 
            onMouseLeave={onMouseLeaveHandler}
            onBlur={onMouseLeaveHandler}
            onClick={props.click}
        >
            <ul className={styles.movieData}>
                <li>
                    <h2>
                        {props.movieData.Title}
                    </h2>
                </li>
                <li>
                    {props.movieData.Year}
                </li>
                <li>
                    {props.movieData.Runtime}
                </li>
                <li className={styles.IMDb_rating}>
                    IMDb rating: {props.movieData.imdbRating}
                    <div className={styles.star}>
                        <Image src={Star} alt="star" />
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default MovieCard;