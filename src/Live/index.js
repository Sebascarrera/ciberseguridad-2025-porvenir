import './styles.css'

const LiveScreen = () => {
    return (
        <div className="container_live">
            <div className='container_live_frame'>
                <iframe 
                    src="https://www.youtube.com/embed/g7Kx0AKmfTg?si=lc-YQew0Wu7RfbjQ" 
                    title="YouTube video player" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowfullscreen>
                </iframe>
            </div>                    
        </div>
    )
}


export default LiveScreen