import { useContext } from 'react'
import { ChallengesContext } from '../context/ChallengesContext'
import {CountdownContext} from '../context/CountdownContext'
import styles from '../styles/components/ChallengeBox.module.css'

export default function ChallengeBox() {


    const { activeChallenge, resetChallenge, completesChallenge } = useContext(ChallengesContext)
    const {resetCountDown} = useContext(CountdownContext)

    function handleChallengeSucceded(){
        resetCountDown();
        completesChallenge();
    }

    function handleChallengeFailed(){
        resetChallenge();
        resetCountDown();
    }

    return (
        <div className={styles.challengeBoxContainer}>
            {activeChallenge ? (
                <div className={styles.challengeActive}>
                    <header>Ganhe {activeChallenge.amountXp} xp</header>
                    <main>
                        <img src={`icons/${activeChallenge.type}.svg`} alt="Body" />
                        <strong>Novo desafio</strong>
                        <p>{activeChallenge.description}</p>
                    </main>
                    <footer>
                        <button
                            type='button'
                            className={styles.failedButton}
                            onClick={handleChallengeFailed}
                        >Falhei
                        </button>
                        <button
                            type='button'
                            className={styles.successedButton}
                            onClick={handleChallengeSucceded}
                        >Completei
                        </button>
                    </footer>
                </div>
            ) : (
                    <div className={styles.challengeNotActive}>
                        <strong>Finalize um ciclo para receber um desafio.</strong>
                        <p><img src="icons/level-up.svg" alt="Level up" />Avance de level completando desafios.</p>
                    </div>
                )}
        </div>
    )
}
