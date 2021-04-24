
import {useContext} from 'react'
import styles from '../styles/components/Profile.module.css'
import {ChallengesContext} from '../context/ChallengesContext'


export default function Profile() {

    const {level} = useContext(ChallengesContext)

    return (
        <div className={styles.profileContainer}>
            <img src="https://github.com/pablolucio97.png" alt="Pablo Silva" />
            <div>
                <strong>Pablo Lúcio</strong>
                <p>
                    <img src="icons/level.svg" alt="level"/>
                     {level}
               </p>
            </div>
        </div>
    )
}
