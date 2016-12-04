let styleMedia = window.styleMedia || window.media;

class StyleMedia {
  constructor() {
    this.init();
  }

  init() {
    const style = document.createElement('style');
    style.id = 'mql-match';
    document.head.appendChild(style);
    this.style = style;
  }

  matchMedium(media) {
    const decl = `@media ${media} {
      #mql-match { width: 1px; }
    }`;

    this.style.textContent = decl;
    const width = window.getComputedStyle(this.style).width;
    return width === '1px';
  }
}

styleMedia = styleMedia || new StyleMedia();

const matchMedia = window.matchMedia || ((media = 'all') => ({
  media,
  matches: styleMedia.matchMedium(media),
}));

export default matchMedia;
