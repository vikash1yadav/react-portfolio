import React from 'react'
import './ExperienceCard.css'

const ExperienceCard = ({ experience }) => {
    let {
        link,
        company,
        title,
        dateFrom,
        dateTo,
        info,
        stack,
        logoLink,
        desc="",
    } = experience
    return (
        <a
            className="experience-link"
            href={link}
            target="_blank"
            rel="noopener noreferrer"
        >
            <div className="experience-card-wrapper">
                <div className="experience-card">
                    <div className="experience-card-top">
                        <div
                            className="experience-bg"
                            style={{ background: experience.colourPrimary }}
                        ></div>
                        <h2>{company}</h2>
                        {logoLink && (
                            <div className="image-wrapper">
                                <div
                                    className="experience-bg logo-bg"
                                    style={{
                                        background: experience.colourSecondary
                                            ? experience.colourSecondary
                                            : experience.colourPrimary,
                                    }}
                                ></div>
                                <img
                                    className="company-logo"
                                    src={logoLink}
                                    alt={`${company}-logo`}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        borderRadius: '100%',
                                    }}
                                />
                            </div>
                        )}
                    </div>
                    <div className="experience-card-bottom">
                        <div>
                            {desc && <p>{desc}</p>}
                            <h3>Role - {title}</h3>
                            <h3>
                                {dateFrom} - {dateTo}
                            </h3>
                            <ul>
                                {info.map((point, idx) => (
                                    <li key={`${company}-point-${idx}`}>
                                        {point}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="experience-card-tech">
                            <ul>
                                {stack.map((tech) => (
                                    <li key={`${company}-${tech}`}>{tech}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </a>
    )
}

export default ExperienceCard
