import { createContext, useState, ReactNode, useEffect } from 'react'

import challengesList from '../repositories/challenges.json'

import Cookies from 'js-cookie'
import LevelUpModal from '../components/LevelUpModal';

export const ChallengesContext = createContext({} as IChallengesContextData)

interface IChallengeProps {
    children: ReactNode;
    level: number;
    currentExperience: number;
    completedChallenges: number;
}

interface IChallenged {
    type: 'body' | 'eye';
    amountXp: number;
    description: string;
}

interface IChallengesContextData {
    level: number;
    currentExperience: number;
    completedChallenges: number;
    activeChallenge: IChallenged;
    experienceToNextLevel: number;
    levelUp: () => void;
    startNewChallenge: () => void;
    resetChallenge: () => void;
    completesChallenge: () => void;
    closeLevelUpModal: () => void;
}


export function ChallengesProvider({
    children,
    ...rest
}: IChallengeProps) {
    const [level, setLevel] = useState(rest.level ?? 1);
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0 )
    const [completedChallenges, setCompletedChallenges] = useState(rest.completedChallenges ?? 0)
    const [activeChallenge, setActiveChallenge] = useState(null)
    const [isLevelUpModalOpen, setIsLevelModalOpen] = useState(false)

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

    useEffect(() => {
        Notification.requestPermission();
    }, [])

    useEffect(() => {
        Cookies.set('level', String(level));
        Cookies.set('currentExperience', String(currentExperience));
        Cookies.set('completedChallenges', String(completedChallenges));
    }, [level, currentExperience, completedChallenges])

    function levelUp() {
        setLevel(level + 1);
        setIsLevelModalOpen(true)
    }

    function closeLevelUpModal(){
        setIsLevelModalOpen(false)
    }

    function startNewChallenge() {
        const newRandomChallenge = Math.floor(Math.random() * challengesList.length);
        const challenge = challengesList[newRandomChallenge];

        setActiveChallenge(challenge);

        new Audio('/notification.mp3').play()

        if (Notification.permission === 'granted') {
            new Notification('Novo desafio 🎉', {
                body: `Valendo ${challenge.amountXp}`
            })
        }

    }

    function resetChallenge() {
        setActiveChallenge(null);
    }

    function completesChallenge() {
        if (!activeChallenge) {
            return;
        }

        const { amountXp } = activeChallenge;

        let finalExperience = currentExperience + amountXp;

        if (finalExperience >= experienceToNextLevel) {
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        }

        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setCompletedChallenges(completedChallenges + 1)
    }

    return (
        <ChallengesContext.Provider value={{
            level,
            levelUp,
            currentExperience,
            completedChallenges,
            activeChallenge,
            experienceToNextLevel,
            startNewChallenge,
            resetChallenge,
            completesChallenge,
            closeLevelUpModal
        }}>
            {children}
            {isLevelUpModalOpen && <LevelUpModal/>}
        </ChallengesContext.Provider>
    )

}