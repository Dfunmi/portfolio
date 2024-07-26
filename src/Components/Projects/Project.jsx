import styles from './ProjectStyles.module.css'
import logo from '../../assets/logo - Copy.png'
import portfolio from '../../assets/portfolio.png'
import ProjectCard from '../Common/ProjectCard'

function Project() {
  return (
    <section id='projects' className={styles.container}>
      <h1 className='sectionTitle'>Projects</h1>
         <div className={styles.projectsContainer}>
      <ProjectCard src={logo} link="https://github.com/Dfunmi/job-listings-react" h3='Job Listings Site'/>
       <ProjectCard src={portfolio} link="https://github.com/Dfunmi/job-listings-react" h3='Portfolio Project'/>
      {/* <ProjectCard src={logo} link="https://github.com/Dfunmi/job-listings-react" h3='Placeholder' p='Placeholder Project2'/>
      <ProjectCard src={logo} link="https://github.com/Dfunmi/job-listings-react" h3='Placeholder' p='placeholder Project3'/>  */}
      </div>
    </section>
  )
}

export default Project
