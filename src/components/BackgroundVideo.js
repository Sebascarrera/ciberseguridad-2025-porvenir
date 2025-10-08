// src/components/BackgroundVideo.jsx
import mp4 from "../assets/img/background-loop.mov";   // o usa /assets/... desde public
import "../BackgroundVideo.css";

export default function BackgroundVideo(){
  return (
    <video
      className="bg-video"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      poster="/assets/img/bg-fallback.jpg"
      aria-hidden="true"
    >
      <source src={mp4} type="video/mp4" />
    </video>
  );
}
