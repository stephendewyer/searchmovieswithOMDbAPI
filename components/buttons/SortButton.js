import styles from './SortButton.module.css';

const SortButton = (props) => {
    return (
        <button 
            onClick={props.sortButtonClicked}
            className={(props.sortButtonActive) ? styles.sort_button_active : styles.sort_button}
        >
            {props.children}
        </button>
    );
};

export default SortButton;