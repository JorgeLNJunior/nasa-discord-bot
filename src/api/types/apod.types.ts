export interface ApodApiResponse {
  copyright: string;
  date: string;
  explanation: string;
  media_type: 'image' | 'video';
  service_version: string;
  title: string;
  url: string;
}
