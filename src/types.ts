export interface Landmark {
  id: string;
  title: string;
  category: string;
  description: string;
  location: string;
  yearEstablished: string;
  highlight: string;
  imageUrl: string;
}

export interface Barangay {
  name: string;
  heritage: string;
  desc: string;
  tip: string;
  category: string;
}

export interface LocalStatusResponse {
  time: string;
  timezone: string;
  weather: {
    temperature: number;
    humidity: number;
    condition: string;
    description: string;
    windSpeed: string;
  };
  alerts: Array<{
    id: number;
    type: string;
    text: string;
  }>;
}
