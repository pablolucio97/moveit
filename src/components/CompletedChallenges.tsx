import styles from '../styles/components/CompletedChallenges.module.css'

import { ChallengesContext} from '../context/ChallengesContext'
import { useContext } from 'react'

export default function CompletedChallenges() {

    const {completedChallenges } = useContext(ChallengesContext)

    return (
        <div className={styles.completedChallengeContainer}>
            <span>Desafios completos</span>
            <span>{completedChallenges}</span>
        </div>
    )
}
