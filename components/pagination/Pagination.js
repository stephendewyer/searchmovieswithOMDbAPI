import Image from 'next/image';
import classnames from 'classnames';
import { usePagination, DOTS } from './usePagination.js';
import styles from './Pagination.module.css';
import React from 'react';
import ArrowLeft from '../../public/images/icons/arrow_left.svg';
import ArrowRight from '../../public/images/icons/arrow_right.svg';

const Pagination = (props) => {
    const {
        onPageChange,
        totalCount,
        siblingCount = 1,
        currentPage,
        pageSize
    } = props;

    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize
    });

    // if there are less than 2 items in pagination range, the component will not render

    if (currentPage === 0 || paginationRange.length < 2) {
        return null;
    }

    const onNext = () => {
        onPageChange(currentPage + 1);
    };

    const onPrevious = () => {
        onPageChange(currentPage - 1);
    };

    let lastPage = paginationRange[paginationRange.length - 1];

    return (
        <ul
            className={styles.pagination_container}
        >
            {/* Left navigation arrow */}
            <li
                className={classnames(
                    styles.pagination_item, {
                        [styles.disabled]: currentPage === 1
                    }
                )}
                onClick={onPrevious}
            >
                <div className={styles.arrow}>
                    <Image src={ArrowLeft} alt="left arrow"/>
                </div>
            </li>
            {paginationRange.map((pageNumber, i) => {
               // if the pageItem is a DOT, render the DOTS unicode character
                if (pageNumber === DOTS) {
                    return (
                        <li 
                            key={i}
                            className={styles.pagination_item}
                        >
                            &#8230;
                        </li>
                    )
                }

               // render the page buttons
                return (
                    <li
                        key={i}
                        className={classnames(
                            styles.pagination_item, {
                                [styles.selected]: pageNumber === currentPage
                            }
                        )}
                        onClick={() => onPageChange(pageNumber)}
                    >
                        {pageNumber}
                    </li>
                );
            })}
            <li
                className={classnames(
                    styles.pagination_item, {
                        [styles.disabled]: currentPage === lastPage
                    }
                )}
                onClick={onNext}
            >
                <div className={styles.arrow}>
                    <Image src={ArrowRight} alt="left arrow"/>
                </div>
            </li>
        </ul>
    );
};

export default Pagination;