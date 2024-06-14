import styles from './SkillsStyles.module.css'
import checkMarkLight from '../../assets/checkmark-light.svg'
import checkMarkDark from '../../assets/checkmark-dark.svg'
import { useTheme } from '../Common/ThemeContext'
import SkillList from '../Common/SkillList'

function Skills() {
  const { theme} = useTheme()
  const checkMarkIcon = theme === 'light' ? checkMarkLight : checkMarkDark
  
  return (
    <section id="skills" className={styles.container}>
      <h1 className='sectionTitle'>Skills</h1>
      <div className={styles.skillsList}>
        <SkillList src={checkMarkIcon} skill={'HTML'} />
        <SkillList src={checkMarkIcon} skill={'CSS'} />
        <SkillList src={checkMarkIcon} skill={'JavaScript'} />
        <SkillList src={checkMarkIcon} skill={'React'} />
      </div>
      <hr />
      <div className={styles.skillsList}>
        <SkillList src={checkMarkIcon} skill={'Tailwind CSS'} />
        <SkillList src={checkMarkIcon} skill={'Git'} />
        <SkillList src={checkMarkIcon} skill={'Node.js'} />
        <SkillList src={checkMarkIcon} skill={'Next.js'} />
      </div>
    </section>
  )
}

export default Skills
