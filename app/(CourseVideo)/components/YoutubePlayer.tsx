import React, { useEffect, useRef } from "react";

interface YoutubePlayerProps {
  videoId: string;
}

const YoutubePlayer: React.FC<YoutubePlayerProps> = ({ videoId }) => {
  const playerRef = useRef<YT.Player | null>(null);

  useEffect(() => {
    const loadYoutubeAPI = () => {
      return new Promise<void>((resolve) => {
        if (window.YT && window.YT.Player) {
          resolve();
          return;
        }

        const scriptTag = document.createElement("script");
        scriptTag.src = "https://www.youtube.com/iframe_api";
        scriptTag.onload = () => resolve();
        document.head.appendChild(scriptTag);
      });
    };

    const onYouTubeIframeAPIReady = () => {
      console.log("YouTube IFrame API is ready");
      playerRef.current = new window.YT.Player("youtube-player", {
        height: "315",
        width: "560",
        videoId: videoId,
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange,
        },
        playerVars: {
          rel: 0,
          playsinline: 0,
        },
      });
    };

    loadYoutubeAPI().then(() => {
      if (window.YT && window.YT.Player) {
        onYouTubeIframeAPIReady();
      } else {
        (window as any).onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
      }
    });

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [videoId]);

  const onPlayerReady = (event: YT.PlayerEvent) => {
    event.target.playVideo();
  };

  const onPlayerStateChange = (event: YT.OnStateChangeEvent) => {
    // Handle state changes (e.g., play, pause)
  };

  return <div id="youtube-player" className="w-full h-full"></div>;
};

export default YoutubePlayer;
