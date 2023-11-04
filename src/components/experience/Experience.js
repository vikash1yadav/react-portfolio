import React from 'react'
import './Experience.css'
import { Fade } from 'react-reveal'
import Section from '../section/Section'
import ExperienceCard from '../experienceCard/ExperienceCard'
import experienceData from '../../data/experience.json'
import constant from '../../data/constant'

const Experience = () => {
    const featuredProject = `{
        "id": -2,
        "link": "https://www.raysteedsinfotech.com/",
        "company": "Raysteeds Infotech Pvt Ltd",
        "title": "Software Engineer | MERN Stack Developer",
        "logoLink": "https://www.raysteedsinfotech.com/static/media/RaysteedsInfo.f78480ec.webp",
        "dateFrom": "10 / 2021",
        "dateTo": "current",
        "info": [
            "Work as a Mern Stack developer on more than 10 live projects."
        ],
        "stack": ["ReactJs", "NextJs", "Node.js", "Express.js", "PostgreSQL", "MySql", "MongoDb", "MSSQL", "ORACLE", "NodeMailer", "PostMan", "Firebase", "AWS", "Tailwind Css", "Chakra-ui" ],
        "logowidth": 80,
        "colourPrimary": "linear-gradient(to bottom, #465a90, #1e3470)",
        "colourSecondary": "linear-gradient(to bottom, #465a90, #1e3470)",
        "desc": ""
    }`;
    const exp1 = JSON.parse(featuredProject)
    console.log(exp1, "exp");
    return (<>
        <Section title="Experience">
            <div className="projects-content">
                <ul className="projects-list">
                   
                        <Fade
                            bottom duration={1000} distance="20px">
                            <ExperienceCard experience={exp1} />
                        </Fade>
                </ul>
            </div>
            
        </Section>
        <Section title="Live Project Experience">
            <div className="experience-content">
                <ul className="experience-list">
                    {experienceData.experience.reverse().map((exp) => (
                        <li key={`experience-${exp.company}`}>
                            <Fade bottom duration={1000} distance="20px">
                                <ExperienceCard experience={exp} />
                            </Fade>
                        </li>
                    ))}
                </ul>
                <Fade bottom duration={1200} distance="20px">
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <p style={{ textAlign: 'center' }}>
                            Further in-depth experience pre 2020 can be found on
                            my{' '}
                            <a
                                href={constant.LINKED_IN_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    textDecoration: 'none',
                                    color: '#0be779',
                                    cursor: 'pointer',
                                }}
                            >
                                LinkedIn
                            </a>
                            .
                        </p>
                    </div>
                </Fade>
            </div>
        </Section>
    </>
    )
}

export default Experience
