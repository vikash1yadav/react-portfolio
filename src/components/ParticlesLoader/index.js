import React from 'react'
import Particles from 'react-tsparticles'
import { loadFull } from 'tsparticles'
import config from '../../config'
import './Home.css'

const particlesInit = async (main) => {
    await loadFull(main)
}

const ParticlesLoader = (container) => {
    return (
        <Particles
            className="particles"
            id="tsparticles"
            init={particlesInit}
            loaded={ParticlesLoader}
            options={config.particles}
        />
    )
}

export default ParticlesLoader
