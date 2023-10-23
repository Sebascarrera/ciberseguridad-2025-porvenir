import './styles.css'

const LiveScreen = () => {
    return (
        <div className="container_live">
            <div className='container_live_frame'>
                <iframe
                    src="https://www.youtube.com/embed/xOICFcHRvZU?si=4zHXro64EvUNQWnc" 
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowFullScreen>
                </iframe>
            </div>                    
        </div>
    )
}


export default LiveScreen