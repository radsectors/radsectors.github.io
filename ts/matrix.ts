import * as $ from 'jquery';
/**
 * MATRIX SCREENSAVER
 *
 */

export class theMatrix {
  private chars = [
    // GREEK
    '&#913;',  '&#914;',  '&#915;',  '&#916;',  '&#917;', // uppercase
    '&#918;',  '&#919;',  '&#920;',  '&#921;',  '&#922;',
    '&#923;',  '&#924;',  '&#925;',  '&#926;',  '&#927;',
    '&#928;',  '&#929;',  '&#931;',  '&#932;',  '&#933;',
    '&#934;',  '&#935;',  '&#936;',  '&#937;',
    '&#945;',  '&#946;',  '&#947;',  '&#948;',  '&#949;', // lowercase
    '&#950;',  '&#951;',  '&#952;',  '&#953;',  '&#954;',
    '&#955;',  '&#956;',  '&#957;',  '&#958;',  '&#959;',
    '&#960;',  '&#961;',  '&#962;',  '&#963;',  '&#964;',
    '&#965;',  '&#966;',  '&#967;',  '&#968;',  '&#969;',
    // KATAKANA
    'ｱ', 'ｲ', 'ｳ', 'ｴ', 'ｵ', // A
    'ｶ', 'ｷ', 'ｸ', 'ｹ', 'ｺ', // K
    'ｻ', 'ｼ', 'ｽ', 'ｾ', 'ｿ', // S
    'ﾀ', 'ﾁ', 'ﾂ', 'ﾃ', 'ﾄ', // T
    'ﾅ', 'ﾆ', 'ﾇ', 'ﾈ', 'ﾉ', // N
    'ﾊ', 'ﾋ', 'ﾌ', 'ﾍ', 'ﾎ', // H
    'ﾏ', 'ﾐ', 'ﾑ', 'ﾒ', 'ﾓ', // M
    'ﾔ',      'ﾕ',      'ﾖ', // Y
    'ﾗ', 'ﾘ', 'ﾙ', 'ﾚ', 'ﾛ', // RL
    'ﾜ', 'ﾝ', 'ﾞ', 'ﾟ',
  ];

  private $thematrix = $('#thematrix');

  private $scr_w = 80;
  private $scr_h = 25;
  private $gridtext = '';
  private x = 0;
  private y = 0;

  public constructor() {
    //$scr_w*$scr_h
    for (let i = 0; i < this.chars.length - 1; i++) {
      this.$gridtext += '<div ' +
        `id="${this.x},${this.y}" ` +
        'class="char" ' +
        'style="' +
        (Math.floor(Math.random() * 1 + 1) ? 'text-gravity:inverse;' : '') +
        (Math.floor(Math.random() * 1 + 1) ? 'text-decoration:reverse;' : '') +
        '"' +
        '>' +
        // this.getGlyphRand() +
        this.getGlyph(i) +
        '</div>';

      this.x += 1;
      if (this.x == this.$scr_w) {
        this.x = 0;
        this.y += 1;
      }
    }

    this.$thematrix.append(this.$gridtext)
  }

  private getGlyph($n) {
    return this.chars[$n];
  }

  private getGlyphRand() {
    return this.chars[Math.floor(Math.random() * (this.chars.length - 1) + 1)];
  }

}
