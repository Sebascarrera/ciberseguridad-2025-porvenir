import './styles.css'

const LiveScreen = () => {
    return (
        <div className="container_live">
            <div className='container_live_frame'>
                <iframe
                    src="https://www.youtube.com/embed/nKY3gd9fnl0?si=Px0bUPXtBiJK8NJ3" 
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