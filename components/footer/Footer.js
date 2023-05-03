import styles from './Footer.module.css';
import Link from 'next/link';

const Footer = () => {

        // begin footer

        const today = new Date();
        const year = today.getFullYear();
      
        // end footer
    return (
        <footer className={styles.footer}>
            <Link 
                href="https://stephendewyerwebwork.vercel.app/" 
                passHref={true} 
                aria-label="link to stephen dewyer web work portfolio website"
            >
                stephen garrett dewyer {year}
            </Link>
        </footer>
    )
}

export default Footer;
