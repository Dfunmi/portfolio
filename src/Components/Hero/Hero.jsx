import styles from './HeroStyles.module.css'
import heroImg from '../../assets/profile.jpg'
import sun from '../../assets/sun.svg'
import moon from '../../assets/moon.svg'
import twitterLight from '../../assets/twitter-light.svg'
import twitterDark from '../../assets/twitter-dark.svg'
import linkedInLight from '../../assets/linkedin-light.svg'
import linkedInDark from '../../assets/linkedin-dark.svg'
import githubLight from  '../../assets/github-light.svg'
import githubDark from  '../../assets/github-dark.svg'
import CV from '../../assets/CV.pdf'
import { useTheme } from '../Common/ThemeContext'

function Hero() {
  const {theme, toggleTheme} = useTheme()

  const themeIcon = theme === 'light' ? sun : moon
  const twitterIcon = theme === 'light' ? twitterLight : twitterDark
  const linkedInIcon = theme === 'light' ? linkedInLight : linkedInDark
  const githubIcon = theme === 'light' ? githubLight : githubDark
  return (
    <section id='hero' className={styles.container}>
      <div className={styles.colorModeContainer}><img className={styles.hero}src={heroImg} alt="profile picture of Oluwafunmilayo Owolabi" />
      
      <img className={styles.colorMode} src={themeIcon} alt="color mode icon" onClick={toggleTheme}/>
      </div>
      <div className={styles.info}>
        <h1>Oluwafunmilayo <br /> Owolabi</h1>
        <h2>FullStack Developer</h2>
        <span>
          <a href="https://x.com/funmiowolabi2"target='_blank'><img src={twitterIcon} alt="Twitter Icon" /></a>
          <a href="https://linkedin.com/"target='_blank'><img src={linkedInIcon} alt="LinkedIn Icon" /></a>
          <a href="https://github.com/Dfunmi"target='_blank'><img src={githubIcon} alt="Github Icon" /></a>
        </span>
        <p className={styles.description}>Motivated Full Stack Developer focusing on MERN stack (MongoDB, Express, React, Node.js). </p>
        <a href={CV} download> <button className='hover'>Resume</button></a>
      </div>
    </section>
  )
}

export default Hero
