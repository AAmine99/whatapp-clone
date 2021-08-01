import styles from "./message.module.css"
const message_in = ({content,timestamp}) => {
    return (
        <div 
        style={{alignSelf:"flex-end"}}
        className={styles.message_holder}>

            <span className={styles.message_out}>
            {content}
            </span>
            <div className={styles.timeCode_out}>
                <div>{timestamp}</div>
                </div>
            <span className={styles.triangle} data-testid="tail-out" data-icon="tail-out">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 13" width="8" height="13">
                    <path opacity=".13" d="M5.188 1H0v11.193l6.467-8.625C7.526 2.156 6.958 1 5.188 1z"></path>
                    <path fill="#056162" d="M5.188 0H0v11.193l6.467-8.625C7.526 1.156 6.958 0 5.188 0z"></path>
                    </svg>
            </span>
        </div>
    )
}

export default message_in
