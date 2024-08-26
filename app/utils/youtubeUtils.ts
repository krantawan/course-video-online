import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
//console.log("API_KEY", API_KEY);

export function extractYouTubeID(url: string): string {
  const regex =
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/.*v=([^&]+)|(?:https?:\/\/)?(?:www\.)?youtu\.be\/([^&]+)/;
  const match = url.match(regex);

  if (match) {
    return match[1] || match[2];
  }

  return url;
}

export async function fetchYouTubeVideoDuration(
  videoId: string
): Promise<string | null> {
  const url = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=contentDetails&key=${API_KEY}`;
  try {
    const response = await axios.get(url);
    //console.log("API Response:", response.data);

    const items = response.data.items;
    if (items.length === 0) {
      console.error("No video found with the provided ID");
      return null;
    }

    const duration = items[0]?.contentDetails?.duration;
    console.log("Fetched duration:", duration);

    if (duration) {
      return convertISO8601ToMinutes(duration);
    } else {
      console.error("No duration found in response");
      return null;
    }
  } catch (error) {
    console.error("Error fetching video duration:", error);
    return null;
  }
}

function convertISO8601ToMinutes(duration: string): string {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  const hours = parseInt(match?.[1] || "0", 10) || 0;
  const minutes = parseInt(match?.[2] || "0", 10) || 0;
  const seconds = parseInt(match?.[3] || "0", 10) || 0;
  const totalMinutes = (hours * 3600 + minutes * 60 + seconds) / 60;
  const formattedNumber = totalMinutes.toFixed(2);
  return formattedNumber;
}
