"use client";

import { useMemo } from "react";
import { Plyr } from "plyr-react";
import "plyr-react/plyr.css";

interface PlayerProps {
  videoUrl: string;
}

function getYouTubeVideoId(url: string): string | null {
  try {
    const parsed = new URL(url);

    if (parsed.hostname === "youtu.be") {
      return parsed.pathname.slice(1).split("/")[0] || null;
    }

    if (
      parsed.hostname === "youtube.com" ||
      parsed.hostname === "www.youtube.com" ||
      parsed.hostname === "m.youtube.com"
    ) {
      const v = parsed.searchParams.get("v");

      if (v) return v;

      const embed = parsed.pathname.match(/^\/embed\/([^/]+)/);
      if (embed) return embed[1];

      const shorts = parsed.pathname.match(/^\/shorts\/([^/]+)/);
      if (shorts) return shorts[1];

      const live = parsed.pathname.match(/^\/live\/([^/]+)/);
      if (live) return live[1];
    }

    return null;
  } catch {
    return null;
  }
}

export default function MyPlayer({ videoUrl }: PlayerProps) {
  const videoId = useMemo(
    () => getYouTubeVideoId(videoUrl),
    [videoUrl]
  );

  if (!videoId) {
    return (
      <div className="rounded-lg border p-4 text-sm text-red-500">
        Invalid YouTube URL
      </div>
    );
  }

  const plyrProps = {
    source: {
      type: "video" as const,
      sources: [
        {
          src: videoId,
          provider: "youtube" as const,
        },
      ],
    },

    options: {
      seekTime: 10,

      youtube: {
        noCookie: true,
        rel: 0,
        modestbranding: 1,
      },

      controls: [
        "play-large",
        "rewind",
        "play",
        "fast-forward",
        "progress",
        "current-time",
        "duration",
        "mute",
        "volume",
        "settings",
        "fullscreen",
      ],
    },
  };

  return <Plyr {...plyrProps} />;
}