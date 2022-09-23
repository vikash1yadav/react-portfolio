import React from 'react'
import './Contact.css'
import Section from '../section/Section'
import { Bounce } from 'react-reveal'
import ContactForm from '../contactForm/ContactForm'
import linkedin from '../../images/social/linkedin.png'
import github from '../../images/social/github.png'
import mailIcon from '../../images/social/mail.png'
import Const from '../../data/constant'

const Contact = () => {
    return (
        <Section title="Contact">
            <ContactForm />
            <Bounce cascade>
                <div className="links">
                    <a
                        href={Const.GITHUB_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img src={github} alt="Github Logo" width="40px" />
                    </a>
                    <a
                        href={"mailto:"+Const.EMAIL_ADDRESS}
                        target="_blank"
                        rel="noopener noreferrer"
                        // style={{backgroundColor:"white"}}
                    >
                        <img src={mailIcon} color="white" alt="Linkedin Logo" width="40px" />
                    </a>
                    <a
                        href={Const.LINKED_IN_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img src={linkedin} alt="Linkedin Logo" width="40px" />
                    </a>
                </div>
            </Bounce>
        </Section>
    )
}

export default Contact
