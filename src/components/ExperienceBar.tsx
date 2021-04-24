import styles from '../styles/components/ExperienceBar.module.css'

import {ChallengesContext} from '../context/ChallengesContext'
import { useContext } from 'react'

export default function ExperienceBar() {

    const { currentExperience, experienceToNextLevel } = useContext(ChallengesContext)

    const percentToNextLevel = Math.round(currentExperience * 100) / experienceToNextLevel

    return (
        <header className={styles.experienceBar}>
            <span>{currentExperience} xp</span>
            <div>
                <div style={{ width: `${percentToNextLevel}%` }} />
                <span className={styles.currentExperience} style={{ left: '50%' }}>300 xp</span>
            </div>
            <span>{experienceToNextLevel} xp</span>
        </header>
    )
}
