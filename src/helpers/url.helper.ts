export class UrlHelper {
  static parseVideoUrl(url: string) {
    if (UrlHelper.isVimeoUrl(url)) {
      const id = UrlHelper.extractVimeoVideoId(url);
      return `https://vimeo.com/${id}`;
    }
    if (UrlHelper.isYoutubeUrl(url)) {
      const id = UrlHelper.extractYoutubeVideoId(url);
      return `https://youtube.com/watch?v=${id}`;
    }
    throw new Error(`${url} is an invalid video url`);
  }

  static isYoutubeUrl(url: string) {
    if (url.includes('youtube.com')) return true;
    return false;
  }

  static isVimeoUrl(url: string) {
    if (url.includes('vimeo.com')) return true;
    return false;
  }

  static extractYoutubeVideoId(url: string) {
    const regex = RegExp(/\w+.$/);
    const list = url.match(regex);

    if (!list) throw new Error('Error when extract a youtube video id');

    return list[0];
  }

  static extractVimeoVideoId(url: string) {
    const regex = RegExp(/(\d+)/);
    const list = url.match(regex);

    if (!list) throw new Error('Error when extract a vimeo video id');

    return list[0];
  }
}
