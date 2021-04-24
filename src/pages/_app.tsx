
import '../styles/global.css'

import { ChallengesProvider } from '../context/ChallengesContext'
import { CountdownProvider } from '../context/CountdownContext'

function MyApp({ Component, pageProps }) {
  return (
   
      <CountdownProvider>
        <Component {...pageProps}/>
      </CountdownProvider>
  

  )
}

export default MyApp
