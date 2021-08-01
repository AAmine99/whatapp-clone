import styles from "./message.module.css"
const message_in = ({content,timestamp}) => {
    return (
        <div className={styles.message_holder}>
            <span data-testid="tail-in" data-icon="tail-in"
                className={styles.triangle}><svg xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 8 13" width="8" height="13">
                    <path opacity=".13"
                        fill="#0000000" d="M1.533 3.568L8 12.193V1H2.812C1.042 1 .474 2.156 1.533 3.568z"></path>
                    <path fill="#262d31" d="M1.533 2.568L8 11.193V0H2.812C1.042 0 .474 1.156 1.533 2.568z"></path></svg>
            </span>
            <span className={styles.message_in}>
            {content}
            </span>
            <div className={styles.timeCode_in}>
                <div>{timestamp}</div>
                </div>
        </div>
    )
}

export default message_in
