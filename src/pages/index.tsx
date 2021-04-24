
import {GetServerSideProps} from 'next'

import CompletedChallenges from '../components/CompletedChallenges'
import ExperienceBar from '../components/ExperienceBar'
import Profile from '../components/Profile'
import Countdown from '../components/Countdown'

import {CountdownProvider} from '../context/CountdownContext'
import { ChallengesProvider } from '../context/ChallengesContext'

import Head from 'next/head'

import styles from '../pages/Home.module.css'
import ChallengeBox from '../components/ChallengeBox'

interface IChallengePropsContext{
  level: number;
  currentExperience: number;
  completedChallenges: number;
}

export default function Home(props : IChallengePropsContext) {

  return (
    <ChallengesProvider 
    level={props.level}
    currentExperience={props.currentExperience}
    completedChallenges={props.completedChallenges}
     >
    <div className={styles.container}>
      <Head>
        <title>Início | move.it</title>
      </Head>
          <ExperienceBar />
          <CountdownProvider>
          <section>
            <div>
              <Profile/>
              <CompletedChallenges/>
              <Countdown/>
            </div>
            <div>
              <ChallengeBox/>
            </div>
          </section>
          </CountdownProvider>
    </div>
    </ChallengesProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async  (ctx) => {

  const {level, currentExperience, completedChallenges} = ctx.req.cookies;

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      completedChallenges: Number(completedChallenges)
    }
  }
}
