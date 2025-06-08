export const countryNameMap: Record<string, string> = {
  // Japonés
  '日本': 'Japan',
  '日本国': 'Japan',

  // Chino Simplificado / Tradicional
  '中国': 'China',
  '中华人民共和国': 'China',
  '台湾': 'Taiwan',
  '香港': 'Hong Kong',

  // Coreano
  '대한민국': 'South Korea',
  '조선민주주의인민공화국': 'North Korea',

  // Árabe (países árabes comunes)
  'مصر': 'Egypt',
  'السعودية': 'Saudi Arabia',
  'الإمارات العربية المتحدة': 'United Arab Emirates',
  'العراق': 'Iraq',
  'سوريا': 'Syria',
  'لبنان': 'Lebanon',
  'الأردن': 'Jordan',
  'الكويت': 'Kuwait',
  'قطر': 'Qatar',
  'البحرين': 'Bahrain',
  'عمان': 'Oman',
  'اليمن': 'Yemen',
  'المغرب': 'Morocco',
  'تونس': 'Tunisia',
  'ليبيا': 'Libya',
  'الجزائر': 'Algeria',
  'السودان': 'Sudan',
  'فلسطين': 'Palestine',
  'سلطنة عمان': 'Oman', 
  'دولة فلسطين': 'Palestine',
  'جمهورية تونس': 'Tunisia',
  'جمهورية الجزائر الديمقراطية الشعبية': 'Algeria',

  // Francés/otros alias árabes (muy comunes en países norteafricanos)
  'Maroc': 'Morocco', 
  'Tunisie': 'Tunisia',
  'Algerie': 'Algeria',

  // Ruso / Cirílico (países con idioma cirílico)
  'Россия': 'Russia',
  'Беларусь': 'Belarus',
  'Україна': 'Ukraine',
  'Казахстан': 'Kazakhstan',
  'Кыргызстан': 'Kyrgyzstan',
  'Монголия': 'Mongolia',
  'Србија': 'Serbia',
  'България': 'Bulgaria',
  'Македонија': 'North Macedonia',
  'Черногория': 'Montenegro',
  'Азербайджан': 'Azerbaijan',
  'Армения': 'Armenia',
  'Грузия': 'Georgia',
  'Молдова': 'Moldova',
  'Узбекистан': 'Uzbekistan',
  'Таджикистан': 'Tajikistan',
  'Туркменистан': 'Turkmenistan',

  // Hebreo
  'ישראל': 'Israel',

  // Hindi / Devanagari
  'भारत': 'India',

  // Griego
  'Ελλάδα': 'Greece',

  // Tailandés
  'ประเทศไทย': 'Thailand',

  // Otros con alfabetos no latinos menos comunes o variantes
  'Հայաստան': 'Armenia',
  'საქართველო': 'Georgia'
};

export const placeTranslations: Record<string, string> = {

  // Países
  '日本': 'Japan',
  'ประเทศไทย': 'Thailand',
  '中国': 'China',
  '中华人民共和国': 'China',
  '台湾': 'Taiwan',
  '香港': 'Hong Kong',
  'Россия': 'Russia',
  'Україна': 'Ukraine',
  'Беларусь': 'Belarus',
  '대한민국': 'South Korea',
  '조선민주주의인민공화국': 'North Korea',
  'المغرب': 'Morocco',
  'ישראל': 'Israel',
  'مصر': 'Egypt',
  'السعودية': 'Saudi Arabia',
  'الإمارات العربية المتحدة': 'United Arab Emirates',
  'العراق': 'Iraq',
  'سوريا': 'Syria',
  'لبنان': 'Lebanon',
  'الأردن': 'Jordan',
  'الكويت': 'Kuwait',
  'قطر': 'Qatar',
  'البحرين': 'Bahrain',
  'عمان': 'Oman',
  'اليمن': 'Yemen',
  'भारत': 'India',
  'Ελλάδα': 'Greece',
  'Հայաստան': 'Armenia',
  'საქართველო': 'Georgia',

  // Ciudades
  '京都市': 'Kyoto',
  'กรุงเทพมหานคร': 'Bangkok',
  '北京': 'Beijing',
  '上海': 'Shanghai',
  '广州': 'Guangzhou',
  '深圳': 'Shenzhen',
  '天津': 'Tianjin',
  '重庆': 'Chongqing',
  '杭州': 'Hangzhou',
  '南京': 'Nanjing',
  '西安': 'Xi\'an',
  '武汉': 'Wuhan',
  '郑州': 'Zhengzhou',
  '长沙': 'Changsha',
  '沈阳': 'Shenyang',
  '青岛': 'Qingdao',
  '苏州': 'Suzhou',
  '大连': 'Dalian',
  '哈尔滨': 'Harbin',
  '서울': 'Seoul',
  '부산': 'Busan',
  '인천': 'Incheon',
  '대구': 'Daegu',
  '광주': 'Gwangju',
  'مراكش': 'Marrakech',
  'الدار البيضاء': 'Casablanca',
  'طنجة': 'Tangier',
  'تل أبيب': 'Tel Aviv',
  'القاهرة': 'Cairo',
  'الإسكندرية': 'Alexandria',
  'Москва': 'Moscow',
  'Санкт-Петербург': 'Saint Petersburg',
  'Новосибирск': 'Novosibirsk',
  'Екатеринбург': 'Yekaterinburg',
  '東京': 'Tokyo',
  '大阪市': 'Osaka',
  '横浜市': 'Yokohama',
  '札幌市': 'Sapporo',
  '名古屋市': 'Nagoya',
  '福岡市': 'Fukuoka',
  '神戸市': 'Kobe',
  '京都': 'Kyoto'

};

/**
 * Traduce un nombre local a su versión en inglés.
 * Si no hay traducción, devuelve el texto original.
 */
export function translatePlaceName(localName: string): string {
  return placeTranslations[localName] || localName;
}
