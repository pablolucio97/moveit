import { useState, useEffect, useContext } from 'react'

import styles from '../styles/components/Countdown.module.css'

import { CountdownContext } from '../context/CountdownContext'

let countdownTimout: NodeJS.Timeout;


export default function Countdown() {

    const {
        startCoundown,
        resetCountDown,
        minutes,
        seconds,
        hasFinished,
        isActive
    } = useContext(CountdownContext)

    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('')
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('')


    return (
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>

            {hasFinished ? (
                <button
                    disabled
                    className={`${styles.countdownButton} ${styles.countdownButtonStop}`}
                    onClick={resetCountDown}
                >
                    Abandonar ciclo
                </button>
            ) :
                (
                    <>
                        {isActive ? (
                            <button
                                className={`${styles.countdownButton} ${styles.countdownButtonStop}`}
                                onClick={resetCountDown}
                            >
                                Abandonar ciclo
                            </button>
                        ) : (
                                <button
                                    className={styles.countdownButton}
                                    onClick={startCoundown}
                                >
                                    Iniciar um ciclo
                                </button>
                            )}
                    </>
                )
            }



        </div>
    )
}
