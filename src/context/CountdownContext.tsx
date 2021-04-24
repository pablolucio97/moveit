import {createContext, ReactNode, useContext, useEffect, useState} from 'react'
import {ChallengesContext} from '../context/ChallengesContext'

interface ICountdownContextData{
    minutes: number;
    seconds: number;
    isActive: boolean;
    hasFinished: boolean;
    startCoundown: () => void;
    resetCountDown: () => void;
}

interface ICountdownProviderProps{
    children: ReactNode
}

const CountdownContext = createContext({} as ICountdownContextData)

function CountdownProvider({children} : ICountdownProviderProps){

    const {startNewChallenge} = useContext(ChallengesContext)
    
    const [time, setTime] = useState(.1 * 60)
    const [isActive, setIsActive] = useState(false)
    const [hasFinished, setHasFinished] = useState(false)
    
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    let countdownTimeout : NodeJS.Timeout;


    useEffect(() => {
        if (isActive && time > 0) {
            const countdownTimout = setTimeout(() => {
                setTime(time - 1);
            }, 1000)
        } else if (time === 0 && isActive) {
            setIsActive(false);
            setHasFinished(true);
            startNewChallenge()
        }
    }, [isActive, time])

    const startCoundown = () => {
        setIsActive(true);
    }

    const resetCountDown = () => {
        clearTimeout(countdownTimeout)
        setIsActive(false);
        setHasFinished(false);
        setTime(.1 * 60);
    }

    return(
        <CountdownContext.Provider value={{
            minutes,
            seconds,
            isActive,
            hasFinished,
            startCoundown,
            resetCountDown
        }}>
            {children}
        </CountdownContext.Provider>
    )
}

export {CountdownProvider, CountdownContext}