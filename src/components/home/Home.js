import React, { useState } from 'react'
import './Home.css'
import Fade from 'react-reveal/Fade'
import { Bounce } from 'react-reveal'
import { Link } from 'react-scroll'
import Typewriter from 'typewriter-effect'
import ArrowDropDownCircleIcon from '@material-ui/icons/ArrowDropDownCircle'
import Navbar from '../navbar/Navbar'
import profile from '../../images/vikas.webp'
import linkedin from '../../images/social/linkedin.png'
import ParticlesLoader from '../ParticlesLoader'
import Const from '../../data/constant';

const Home = () => {
    const [imageLoaded, setImageLoaded] = useState(false)
    return (
        <div className="home-wrapper">
            <div className="home">
                {/* <ParticlesLoader className="particles" /> */}
                <div className={`greeting${!imageLoaded ? ' hide' : ''}`}>
                    <Fade bottom distance="40px">
                        <img
                            className="profile"
                            alt="m.jigalin profile"
                            src={profile}
                            onLoad={() => setImageLoaded(true)}
                        />
                        <h1 className="greeting-text">
                            Hi, I'm <span className="name">Vikas Kumar</span>
                            .{' '}
                            <span
                                className="wave-emoji"
                                role="img"
                                aria-label="waving hand"
                            >
                                👋
                            </span>
                        </h1>
                        <h1 className="greeting-text">
                            <Typewriter
                                options={{
                                    strings: [
                                        'I am a Full Stack Developer',
                                        'Having hands on MERN stack.',
                                        'I love learning new tech.',
                                        'I create unique digital experiences.',
                                    ],
                                    autoStart: true,
                                    loop: true,
                                    deleteSpeed: 10,
                                    cursor: '<',
                                    delay: 100,
                                }}
                            />
                        </h1>
                        <Bounce cascade>
                            <div className="links">
                                <a
                                    href={Const.LINKED_IN_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <img
                                        src={linkedin}
                                        alt="Linkedin Logo"
                                        width="50px"
                                    />
                                </a>
                            </div>
                        </Bounce>
                        <div className="scroll-down">
                            <Link
                                activeClass="active"
                                to="about"
                                spy={true}
                                smooth={true}
                                offset={-63}
                                duration={500}
                            >
                                <ArrowDropDownCircleIcon
                                    fontSize="large"
                                    style={{
                                        pointerEvents: 'fill',
                                        cursor: 'pointer',
                                    }}
                                />
                            </Link>
                        </div>
                    </Fade>
                </div>
                <Navbar />
            </div>
        </div>
    )
}

export default Home
