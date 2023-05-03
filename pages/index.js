import { Fragment, useState, useEffect, useRef, useCallback, useLayoutEffect} from 'react';
import styles from '../styles/Index.module.css';
import Head from 'next/head';
import Search from '../components/search/Search.js';
import Footer from '../components/footer/Footer.js';

export default function Index() { 

  const [footerHeight, setFooterHeight] = useState(0); 

  const footerContainer = useRef(null);

    useEffect(() => {
        if (footerContainer.current !== null) {
            setFooterHeight(footerContainer.current.scrollHeight);
        }
    }, []);

    const [node, setNode] = useState(null);

    const measuredRef = useCallback(node => {
        if (node !== null) {
            setNode(node);
        }
    }, []);

    useLayoutEffect(() => {
        if (node) {
            const measure = () => {
                setFooterHeight(node.getBoundingClientRect().height);
            }
            window.addEventListener("resize", measure );
            return () => {
                window.removeEventListener("resize", measure );
            };
       }
    }, [node]);
    
  return (
    <Fragment>
      <Head>
        <title>movie search</title>
        <meta name="description" content="search movies from the Open Movie Database" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:image" content="/images/movie_search_cover_image.png" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.page_container}>
        <main 
          style={{ 'paddingBottom': `${footerHeight}px` }}
        >
          <Search/>
        </main>
        <div
          role="contentinfo"
          ref={footerContainer} 
          className={styles.footer_container}
        >
          <div ref={measuredRef}>
            <Footer />
          </div>
        </div>
      </div>      
    </Fragment>
  )
}
