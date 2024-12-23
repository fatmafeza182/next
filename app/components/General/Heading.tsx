import React from 'react'

interface HeadingProps {
    center?: boolean
    text: string
}
const Heading: React.FC<HeadingProps> = ({ center, text }) => {
    return <div className={`text-slate-500 px-3 sm:px-10 md:my-10 md-text-xl ${center ? "text-center" : "text-start"}`}>{text}</div>
}



export default Heading