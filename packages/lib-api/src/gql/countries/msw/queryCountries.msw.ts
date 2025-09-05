import { GetCountriesQuery } from '@/generated'
import { mockGetCountriesQueryCountryService } from '@/generated/countries/countries-client.mws'
import { HttpResponse } from 'msw'

export const getGetCountriesResponseMock = (): GetCountriesQuery => ({
  countries: [
    {
      code: 'AD',
      native: 'Andorra',
      emoji: '🇦🇩',
      languages: [
        {
          code: 'ca',
          name: 'Catalan',
          native: 'Català',
          rtl: false,
        },
      ],
      name: 'Andorra',
    },
    {
      code: 'AE',
      native: 'دولة الإمارات العربية المتحدة',
      emoji: '🇦🇪',
      languages: [
        {
          code: 'ar',
          name: 'Arabic',
          native: 'العربية',
          rtl: true,
        },
      ],
      name: 'United Arab Emirates',
    },
    {
      code: 'AF',
      native: 'افغانستان',
      emoji: '🇦🇫',
      languages: [
        {
          code: 'ps',
          name: 'Pashto',
          native: 'پښتو',
          rtl: true,
        },
        {
          code: 'uz',
          name: 'Uzbek',
          native: 'Ўзбек',
          rtl: false,
        },
        {
          code: 'tk',
          name: 'Turkmen',
          native: 'Туркмен / تركمن',
          rtl: false,
        },
      ],
      name: 'Afghanistan',
    },
    {
      code: 'AG',
      native: 'Antigua and Barbuda',
      emoji: '🇦🇬',
      languages: [
        {
          code: 'en',
          name: 'English',
          native: 'English',
          rtl: false,
        },
      ],
      name: 'Antigua and Barbuda',
    },
    {
      code: 'AI',
      native: 'Anguilla',
      emoji: '🇦🇮',
      languages: [
        {
          code: 'en',
          name: 'English',
          native: 'English',
          rtl: false,
        },
      ],
      name: 'Anguilla',
    },
    {
      code: 'AL',
      native: 'Shqipëria',
      emoji: '🇦🇱',
      languages: [
        {
          code: 'sq',
          name: 'Albanian',
          native: 'Shqip',
          rtl: false,
        },
      ],
      name: 'Albania',
    },
    {
      code: 'AM',
      native: 'Հայաստան',
      emoji: '🇦🇲',
      languages: [
        {
          code: 'hy',
          name: 'Armenian',
          native: 'Հայերեն',
          rtl: false,
        },
        {
          code: 'ru',
          name: 'Russian',
          native: 'Русский',
          rtl: false,
        },
      ],
      name: 'Armenia',
    },
    {
      code: 'AO',
      native: 'Angola',
      emoji: '🇦🇴',
      languages: [
        {
          code: 'pt',
          name: 'Portuguese',
          native: 'Português',
          rtl: false,
        },
      ],
      name: 'Angola',
    },
    {
      code: 'AQ',
      native: 'Antarctica',
      emoji: '🇦🇶',
      languages: [],
      name: 'Antarctica',
    },
    {
      code: 'AR',
      native: 'Argentina',
      emoji: '🇦🇷',
      languages: [
        {
          code: 'es',
          name: 'Spanish',
          native: 'Español',
          rtl: false,
        },
        {
          code: 'gn',
          name: 'Guarani',
          native: "Avañe'ẽ",
          rtl: false,
        },
      ],
      name: 'Argentina',
    },
    {
      code: 'AS',
      native: 'American Samoa',
      emoji: '🇦🇸',
      languages: [
        {
          code: 'en',
          name: 'English',
          native: 'English',
          rtl: false,
        },
        {
          code: 'sm',
          name: 'Samoan',
          native: 'Gagana Samoa',
          rtl: false,
        },
      ],
      name: 'American Samoa',
    },
    {
      code: 'AT',
      native: 'Österreich',
      emoji: '🇦🇹',
      languages: [
        {
          code: 'de',
          name: 'German',
          native: 'Deutsch',
          rtl: false,
        },
      ],
      name: 'Austria',
    },
    {
      code: 'AU',
      native: 'Australia',
      emoji: '🇦🇺',
      languages: [
        {
          code: 'en',
          name: 'English',
          native: 'English',
          rtl: false,
        },
      ],
      name: 'Australia',
    },
    {
      code: 'AW',
      native: 'Aruba',
      emoji: '🇦🇼',
      languages: [
        {
          code: 'nl',
          name: 'Dutch',
          native: 'Nederlands',
          rtl: false,
        },
        {
          code: 'pa',
          name: 'Panjabi / Punjabi',
          native: 'ਪੰਜਾਬੀ / पंजाबी / پنجابي',
          rtl: false,
        },
      ],
      name: 'Aruba',
    },
    {
      code: 'AX',
      native: 'Åland',
      emoji: '🇦🇽',
      languages: [
        {
          code: 'sv',
          name: 'Swedish',
          native: 'Svenska',
          rtl: false,
        },
      ],
      name: 'Åland',
    },
    {
      code: 'AZ',
      native: 'Azərbaycan',
      emoji: '🇦🇿',
      languages: [
        {
          code: 'az',
          name: 'Azerbaijani',
          native: 'Azərbaycanca / آذربايجان',
          rtl: false,
        },
      ],
      name: 'Azerbaijan',
    },
    {
      code: 'BA',
      native: 'Bosna i Hercegovina',
      emoji: '🇧🇦',
      languages: [
        {
          code: 'bs',
          name: 'Bosnian',
          native: 'Bosanski',
          rtl: false,
        },
        {
          code: 'hr',
          name: 'Croatian',
          native: 'Hrvatski',
          rtl: false,
        },
        {
          code: 'sr',
          name: 'Serbian',
          native: 'Српски',
          rtl: false,
        },
      ],
      name: 'Bosnia and Herzegovina',
    },
    {
      code: 'BB',
      native: 'Barbados',
      emoji: '🇧🇧',
      languages: [
        {
          code: 'en',
          name: 'English',
          native: 'English',
          rtl: false,
        },
      ],
      name: 'Barbados',
    },
    {
      code: 'BD',
      native: 'Bangladesh',
      emoji: '🇧🇩',
      languages: [
        {
          code: 'bn',
          name: 'Bengali',
          native: 'বাংলা',
          rtl: false,
        },
      ],
      name: 'Bangladesh',
    },
    {
      code: 'BE',
      native: 'België',
      emoji: '🇧🇪',
      languages: [
        {
          code: 'nl',
          name: 'Dutch',
          native: 'Nederlands',
          rtl: false,
        },
        {
          code: 'fr',
          name: 'French',
          native: 'Français',
          rtl: false,
        },
        {
          code: 'de',
          name: 'German',
          native: 'Deutsch',
          rtl: false,
        },
      ],
      name: 'Belgium',
    },
    {
      code: 'BF',
      native: 'Burkina Faso',
      emoji: '🇧🇫',
      languages: [
        {
          code: 'fr',
          name: 'French',
          native: 'Français',
          rtl: false,
        },
        {
          code: 'ff',
          name: 'Peul',
          native: 'Fulfulde',
          rtl: false,
        },
      ],
      name: 'Burkina Faso',
    },
    {
      code: 'BG',
      native: 'България',
      emoji: '🇧🇬',
      languages: [
        {
          code: 'bg',
          name: 'Bulgarian',
          native: 'Български',
          rtl: false,
        },
      ],
      name: 'Bulgaria',
    },
    {
      code: 'BH',
      native: '‏البحرين',
      emoji: '🇧🇭',
      languages: [
        {
          code: 'ar',
          name: 'Arabic',
          native: 'العربية',
          rtl: true,
        },
      ],
      name: 'Bahrain',
    },
    {
      code: 'BI',
      native: 'Burundi',
      emoji: '🇧🇮',
      languages: [
        {
          code: 'fr',
          name: 'French',
          native: 'Français',
          rtl: false,
        },
        {
          code: 'rn',
          name: 'Kirundi',
          native: 'Kirundi',
          rtl: false,
        },
      ],
      name: 'Burundi',
    },
    {
      code: 'BJ',
      native: 'Bénin',
      emoji: '🇧🇯',
      languages: [
        {
          code: 'fr',
          name: 'French',
          native: 'Français',
          rtl: false,
        },
      ],
      name: 'Benin',
    },
    {
      code: 'BL',
      native: 'Saint-Barthélemy',
      emoji: '🇧🇱',
      languages: [
        {
          code: 'fr',
          name: 'French',
          native: 'Français',
          rtl: false,
        },
      ],
      name: 'Saint Barthélemy',
    },
    {
      code: 'BM',
      native: 'Bermuda',
      emoji: '🇧🇲',
      languages: [
        {
          code: 'en',
          name: 'English',
          native: 'English',
          rtl: false,
        },
      ],
      name: 'Bermuda',
    },
    {
      code: 'BN',
      native: 'Negara Brunei Darussalam',
      emoji: '🇧🇳',
      languages: [
        {
          code: 'ms',
          name: 'Malay',
          native: 'Bahasa Melayu',
          rtl: false,
        },
      ],
      name: 'Brunei',
    },
    {
      code: 'BO',
      native: 'Bolivia',
      emoji: '🇧🇴',
      languages: [
        {
          code: 'es',
          name: 'Spanish',
          native: 'Español',
          rtl: false,
        },
        {
          code: 'ay',
          name: 'Aymara',
          native: 'Aymar',
          rtl: false,
        },
        {
          code: 'qu',
          name: 'Quechua',
          native: 'Runa Simi',
          rtl: false,
        },
      ],
      name: 'Bolivia',
    },
    {
      code: 'BQ',
      native: 'Bonaire',
      emoji: '🇧🇶',
      languages: [
        {
          code: 'nl',
          name: 'Dutch',
          native: 'Nederlands',
          rtl: false,
        },
      ],
      name: 'Bonaire',
    },
    {
      code: 'BR',
      native: 'Brasil',
      emoji: '🇧🇷',
      languages: [
        {
          code: 'pt',
          name: 'Portuguese',
          native: 'Português',
          rtl: false,
        },
      ],
      name: 'Brazil',
    },
    {
      code: 'BS',
      native: 'Bahamas',
      emoji: '🇧🇸',
      languages: [
        {
          code: 'en',
          name: 'English',
          native: 'English',
          rtl: false,
        },
      ],
      name: 'Bahamas',
    },
    {
      code: 'BT',
      native: 'ʼbrug-yul',
      emoji: '🇧🇹',
      languages: [
        {
          code: 'dz',
          name: 'Dzongkha',
          native: 'ཇོང་ཁ',
          rtl: false,
        },
      ],
      name: 'Bhutan',
    },
    {
      code: 'BV',
      native: 'Bouvetøya',
      emoji: '🇧🇻',
      languages: [
        {
          code: 'no',
          name: 'Norwegian',
          native: 'Norsk',
          rtl: false,
        },
        {
          code: 'nb',
          name: 'Norwegian Bokmål',
          native: 'Norsk bokmål',
          rtl: false,
        },
        {
          code: 'nn',
          name: 'Norwegian Nynorsk',
          native: 'Norsk nynorsk',
          rtl: false,
        },
      ],
      name: 'Bouvet Island',
    },
    {
      code: 'BW',
      native: 'Botswana',
      emoji: '🇧🇼',
      languages: [
        {
          code: 'en',
          name: 'English',
          native: 'English',
          rtl: false,
        },
        {
          code: 'tn',
          name: 'Tswana',
          native: 'Setswana',
          rtl: false,
        },
      ],
      name: 'Botswana',
    },
    {
      code: 'BY',
      native: 'Белару́сь',
      emoji: '🇧🇾',
      languages: [
        {
          code: 'be',
          name: 'Belarusian',
          native: 'Беларуская',
          rtl: false,
        },
        {
          code: 'ru',
          name: 'Russian',
          native: 'Русский',
          rtl: false,
        },
      ],
      name: 'Belarus',
    },
    {
      code: 'BZ',
      native: 'Belize',
      emoji: '🇧🇿',
      languages: [
        {
          code: 'en',
          name: 'English',
          native: 'English',
          rtl: false,
        },
        {
          code: 'es',
          name: 'Spanish',
          native: 'Español',
          rtl: false,
        },
      ],
      name: 'Belize',
    },
    {
      code: 'CA',
      native: 'Canada',
      emoji: '🇨🇦',
      languages: [
        {
          code: 'en',
          name: 'English',
          native: 'English',
          rtl: false,
        },
        {
          code: 'fr',
          name: 'French',
          native: 'Français',
          rtl: false,
        },
      ],
      name: 'Canada',
    },
    {
      code: 'CC',
      native: 'Cocos (Keeling) Islands',
      emoji: '🇨🇨',
      languages: [
        {
          code: 'en',
          name: 'English',
          native: 'English',
          rtl: false,
        },
      ],
      name: 'Cocos [Keeling] Islands',
    },
    {
      code: 'CD',
      native: 'République démocratique du Congo',
      emoji: '🇨🇩',
      languages: [
        {
          code: 'fr',
          name: 'French',
          native: 'Français',
          rtl: false,
        },
        {
          code: 'ln',
          name: 'Lingala',
          native: 'Lingála',
          rtl: false,
        },
        {
          code: 'kg',
          name: 'Kongo',
          native: 'KiKongo',
          rtl: false,
        },
        {
          code: 'sw',
          name: 'Swahili',
          native: 'Kiswahili',
          rtl: false,
        },
        {
          code: 'lu',
          name: 'Luba-Katanga',
          native: 'Tshiluba',
          rtl: false,
        },
      ],
      name: 'Democratic Republic of the Congo',
    },
    {
      code: 'CF',
      native: 'Ködörösêse tî Bêafrîka',
      emoji: '🇨🇫',
      languages: [
        {
          code: 'fr',
          name: 'French',
          native: 'Français',
          rtl: false,
        },
        {
          code: 'sg',
          name: 'Sango',
          native: 'Sängö',
          rtl: false,
        },
      ],
      name: 'Central African Republic',
    },
    {
      code: 'CG',
      native: 'République du Congo',
      emoji: '🇨🇬',
      languages: [
        {
          code: 'fr',
          name: 'French',
          native: 'Français',
          rtl: false,
        },
        {
          code: 'ln',
          name: 'Lingala',
          native: 'Lingála',
          rtl: false,
        },
      ],
      name: 'Republic of the Congo',
    },
    {
      code: 'CH',
      native: 'Schweiz',
      emoji: '🇨🇭',
      languages: [
        {
          code: 'de',
          name: 'German',
          native: 'Deutsch',
          rtl: false,
        },
        {
          code: 'fr',
          name: 'French',
          native: 'Français',
          rtl: false,
        },
        {
          code: 'it',
          name: 'Italian',
          native: 'Italiano',
          rtl: false,
        },
      ],
      name: 'Switzerland',
    },
    {
      code: 'CI',
      native: "Côte d'Ivoire",
      emoji: '🇨🇮',
      languages: [
        {
          code: 'fr',
          name: 'French',
          native: 'Français',
          rtl: false,
        },
      ],
      name: 'Ivory Coast',
    },
    {
      code: 'CK',
      native: 'Cook Islands',
      emoji: '🇨🇰',
      languages: [
        {
          code: 'en',
          name: 'English',
          native: 'English',
          rtl: false,
        },
      ],
      name: 'Cook Islands',
    },
    {
      code: 'CL',
      native: 'Chile',
      emoji: '🇨🇱',
      languages: [
        {
          code: 'es',
          name: 'Spanish',
          native: 'Español',
          rtl: false,
        },
      ],
      name: 'Chile',
    },
    {
      code: 'CM',
      native: 'Cameroon',
      emoji: '🇨🇲',
      languages: [
        {
          code: 'en',
          name: 'English',
          native: 'English',
          rtl: false,
        },
        {
          code: 'fr',
          name: 'French',
          native: 'Français',
          rtl: false,
        },
      ],
      name: 'Cameroon',
    },
    {
      code: 'CN',
      native: '中国',
      emoji: '🇨🇳',
      languages: [
        {
          code: 'zh',
          name: 'Chinese',
          native: '中文',
          rtl: false,
        },
      ],
      name: 'China',
    },
    {
      code: 'CO',
      native: 'Colombia',
      emoji: '🇨🇴',
      languages: [
        {
          code: 'es',
          name: 'Spanish',
          native: 'Español',
          rtl: false,
        },
      ],
      name: 'Colombia',
    },
    {
      code: 'CR',
      native: 'Costa Rica',
      emoji: '🇨🇷',
      languages: [
        {
          code: 'es',
          name: 'Spanish',
          native: 'Español',
          rtl: false,
        },
      ],
      name: 'Costa Rica',
    },
    {
      code: 'CU',
      native: 'Cuba',
      emoji: '🇨🇺',
      languages: [
        {
          code: 'es',
          name: 'Spanish',
          native: 'Español',
          rtl: false,
        },
      ],
      name: 'Cuba',
    },
    {
      code: 'CV',
      native: 'Cabo Verde',
      emoji: '🇨🇻',
      languages: [
        {
          code: 'pt',
          name: 'Portuguese',
          native: 'Português',
          rtl: false,
        },
      ],
      name: 'Cape Verde',
    },
    {
      code: 'CW',
      native: 'Curaçao',
      emoji: '🇨🇼',
      languages: [
        {
          code: 'nl',
          name: 'Dutch',
          native: 'Nederlands',
          rtl: false,
        },
        {
          code: 'pa',
          name: 'Panjabi / Punjabi',
          native: 'ਪੰਜਾਬੀ / पंजाबी / پنجابي',
          rtl: false,
        },
        {
          code: 'en',
          name: 'English',
          native: 'English',
          rtl: false,
        },
      ],
      name: 'Curacao',
    },
    {
      code: 'CX',
      native: 'Christmas Island',
      emoji: '🇨🇽',
      languages: [
        {
          code: 'en',
          name: 'English',
          native: 'English',
          rtl: false,
        },
      ],
      name: 'Christmas Island',
    },
    {
      code: 'CY',
      native: 'Κύπρος',
      emoji: '🇨🇾',
      languages: [
        {
          code: 'el',
          name: 'Greek',
          native: 'Ελληνικά',
          rtl: false,
        },
        {
          code: 'tr',
          name: 'Turkish',
          native: 'Türkçe',
          rtl: false,
        },
        {
          code: 'hy',
          name: 'Armenian',
          native: 'Հայերեն',
          rtl: false,
        },
      ],
      name: 'Cyprus',
    },
    {
      code: 'CZ',
      native: 'Česká republika',
      emoji: '🇨🇿',
      languages: [
        {
          code: 'cs',
          name: 'Czech',
          native: 'Čeština',
          rtl: false,
        },
        {
          code: 'sk',
          name: 'Slovak',
          native: 'Slovenčina',
          rtl: false,
        },
      ],
      name: 'Czech Republic',
    },
    {
      code: 'DE',
      native: 'Deutschland',
      emoji: '🇩🇪',
      languages: [
        {
          code: 'de',
          name: 'German',
          native: 'Deutsch',
          rtl: false,
        },
      ],
      name: 'Germany',
    },
    {
      code: 'DJ',
      native: 'Djibouti',
      emoji: '🇩🇯',
      languages: [
        {
          code: 'fr',
          name: 'French',
          native: 'Français',
          rtl: false,
        },
        {
          code: 'ar',
          name: 'Arabic',
          native: 'العربية',
          rtl: true,
        },
      ],
      name: 'Djibouti',
    },
    {
      code: 'DK',
      native: 'Danmark',
      emoji: '🇩🇰',
      languages: [
        {
          code: 'da',
          name: 'Danish',
          native: 'Dansk',
          rtl: false,
        },
      ],
      name: 'Denmark',
    },
    {
      code: 'DM',
      native: 'Dominica',
      emoji: '🇩🇲',
      languages: [
        {
          code: 'en',
          name: 'English',
          native: 'English',
          rtl: false,
        },
      ],
      name: 'Dominica',
    },
    {
      code: 'DO',
      native: 'República Dominicana',
      emoji: '🇩🇴',
      languages: [
        {
          code: 'es',
          name: 'Spanish',
          native: 'Español',
          rtl: false,
        },
      ],
      name: 'Dominican Republic',
    },
    {
      code: 'DZ',
      native: 'الجزائر',
      emoji: '🇩🇿',
      languages: [
        {
          code: 'ar',
          name: 'Arabic',
          native: 'العربية',
          rtl: true,
        },
      ],
      name: 'Algeria',
    },
    {
      code: 'EC',
      native: 'Ecuador',
      emoji: '🇪🇨',
      languages: [
        {
          code: 'es',
          name: 'Spanish',
          native: 'Español',
          rtl: false,
        },
      ],
      name: 'Ecuador',
    },
    {
      code: 'EE',
      native: 'Eesti',
      emoji: '🇪🇪',
      languages: [
        {
          code: 'et',
          name: 'Estonian',
          native: 'Eesti',
          rtl: false,
        },
      ],
      name: 'Estonia',
    },
    {
      code: 'EG',
      native: 'مصر‎',
      emoji: '🇪🇬',
      languages: [
        {
          code: 'ar',
          name: 'Arabic',
          native: 'العربية',
          rtl: true,
        },
      ],
      name: 'Egypt',
    },
    {
      code: 'EH',
      native: 'الصحراء الغربية',
      emoji: '🇪🇭',
      languages: [
        {
          code: 'es',
          name: 'Spanish',
          native: 'Español',
          rtl: false,
        },
      ],
      name: 'Western Sahara',
    },
    {
      code: 'ER',
      native: 'ኤርትራ',
      emoji: '🇪🇷',
      languages: [
        {
          code: 'ti',
          name: 'Tigrinya',
          native: 'ትግርኛ',
          rtl: false,
        },
        {
          code: 'ar',
          name: 'Arabic',
          native: 'العربية',
          rtl: true,
        },
        {
          code: 'en',
          name: 'English',
          native: 'English',
          rtl: false,
        },
      ],
      name: 'Eritrea',
    },
    {
      code: 'ES',
      native: 'España',
      emoji: '🇪🇸',
      languages: [
        {
          code: 'es',
          name: 'Spanish',
          native: 'Español',
          rtl: false,
        },
        {
          code: 'eu',
          name: 'Basque',
          native: 'Euskara',
          rtl: false,
        },
        {
          code: 'ca',
          name: 'Catalan',
          native: 'Català',
          rtl: false,
        },
        {
          code: 'gl',
          name: 'Galician',
          native: 'Galego',
          rtl: false,
        },
        {
          code: 'oc',
          name: 'Occitan',
          native: 'Occitan',
          rtl: false,
        },
      ],
      name: 'Spain',
    },
    {
      code: 'ET',
      native: 'ኢትዮጵያ',
      emoji: '🇪🇹',
      languages: [
        {
          code: 'am',
          name: 'Amharic',
          native: 'አማርኛ',
          rtl: false,
        },
      ],
      name: 'Ethiopia',
    },
    {
      code: 'FI',
      native: 'Suomi',
      emoji: '🇫🇮',
      languages: [
        {
          code: 'fi',
          name: 'Finnish',
          native: 'Suomi',
          rtl: false,
        },
        {
          code: 'sv',
          name: 'Swedish',
          native: 'Svenska',
          rtl: false,
        },
      ],
      name: 'Finland',
    },
    {
      code: 'FJ',
      native: 'Fiji',
      emoji: '🇫🇯',
      languages: [
        {
          code: 'en',
          name: 'English',
          native: 'English',
          rtl: false,
        },
        {
          code: 'fj',
          name: 'Fijian',
          native: 'Na Vosa Vakaviti',
          rtl: false,
        },
        {
          code: 'hi',
          name: 'Hindi',
          native: 'हिन्दी',
          rtl: false,
        },
        {
          code: 'ur',
          name: 'Urdu',
          native: 'اردو',
          rtl: true,
        },
      ],
      name: 'Fiji',
    },
    {
      code: 'FK',
      native: 'Falkland Islands',
      emoji: '🇫🇰',
      languages: [
        {
          code: 'en',
          name: 'English',
          native: 'English',
          rtl: false,
        },
      ],
      name: 'Falkland Islands',
    },
    {
      code: 'FM',
      native: 'Micronesia',
      emoji: '🇫🇲',
      languages: [
        {
          code: 'en',
          name: 'English',
          native: 'English',
          rtl: false,
        },
      ],
      name: 'Micronesia',
    },
    {
      code: 'FO',
      native: 'Føroyar',
      emoji: '🇫🇴',
      languages: [
        {
          code: 'fo',
          name: 'Faroese',
          native: 'Føroyskt',
          rtl: false,
        },
      ],
      name: 'Faroe Islands',
    },
    {
      code: 'FR',
      native: 'France',
      emoji: '🇫🇷',
      languages: [
        {
          code: 'fr',
          name: 'French',
          native: 'Français',
          rtl: false,
        },
      ],
      name: 'France',
    },
    {
      code: 'GA',
      native: 'Gabon',
      emoji: '🇬🇦',
      languages: [
        {
          code: 'fr',
          name: 'French',
          native: 'Français',
          rtl: false,
        },
      ],
      name: 'Gabon',
    },
    {
      code: 'GB',
      native: 'United Kingdom',
      emoji: '🇬🇧',
      languages: [
        {
          code: 'en',
          name: 'English',
          native: 'English',
          rtl: false,
        },
      ],
      name: 'United Kingdom',
    },
    {
      code: 'GD',
      native: 'Grenada',
      emoji: '🇬🇩',
      languages: [
        {
          code: 'en',
          name: 'English',
          native: 'English',
          rtl: false,
        },
      ],
      name: 'Grenada',
    },
    {
      code: 'GE',
      native: 'საქართველო',
      emoji: '🇬🇪',
      languages: [
        {
          code: 'ka',
          name: 'Georgian',
          native: 'ქართული',
          rtl: false,
        },
      ],
      name: 'Georgia',
    },
    {
      code: 'GF',
      native: 'Guyane française',
      emoji: '🇬🇫',
      languages: [
        {
          code: 'fr',
          name: 'French',
          native: 'Français',
          rtl: false,
        },
      ],
      name: 'French Guiana',
    },
    {
      code: 'GG',
      native: 'Guernsey',
      emoji: '🇬🇬',
      languages: [
        {
          code: 'en',
          name: 'English',
          native: 'English',
          rtl: false,
        },
        {
          code: 'fr',
          name: 'French',
          native: 'Français',
          rtl: false,
        },
      ],
      name: 'Guernsey',
    },
    {
      code: 'GH',
      native: 'Ghana',
      emoji: '🇬🇭',
      languages: [
        {
          code: 'en',
          name: 'English',
          native: 'English',
          rtl: false,
        },
      ],
      name: 'Ghana',
    },
    {
      code: 'GI',
      native: 'Gibraltar',
      emoji: '🇬🇮',
      languages: [
        {
          code: 'en',
          name: 'English',
          native: 'English',
          rtl: false,
        },
      ],
      name: 'Gibraltar',
    },
    {
      code: 'GL',
      native: 'Kalaallit Nunaat',
      emoji: '🇬🇱',
      languages: [
        {
          code: 'kl',
          name: 'Greenlandic',
          native: 'Kalaallisut',
          rtl: false,
        },
      ],
      name: 'Greenland',
    },
    {
      code: 'GM',
      native: 'Gambia',
      emoji: '🇬🇲',
      languages: [
        {
          code: 'en',
          name: 'English',
          native: 'English',
          rtl: false,
        },
      ],
      name: 'Gambia',
    },
    {
      code: 'GN',
      native: 'Guinée',
      emoji: '🇬🇳',
      languages: [
        {
          code: 'fr',
          name: 'French',
          native: 'Français',
          rtl: false,
        },
        {
          code: 'ff',
          name: 'Peul',
          native: 'Fulfulde',
          rtl: false,
        },
      ],
      name: 'Guinea',
    },
    {
      code: 'GP',
      native: 'Guadeloupe',
      emoji: '🇬🇵',
      languages: [
        {
          code: 'fr',
          name: 'French',
          native: 'Français',
          rtl: false,
        },
      ],
      name: 'Guadeloupe',
    },
    {
      code: 'GQ',
      native: 'Guinea Ecuatorial',
      emoji: '🇬🇶',
      languages: [
        {
          code: 'es',
          name: 'Spanish',
          native: 'Español',
          rtl: false,
        },
        {
          code: 'fr',
          name: 'French',
          native: 'Français',
          rtl: false,
        },
      ],
      name: 'Equatorial Guinea',
    },
    {
      code: 'GR',
      native: 'Ελλάδα',
      emoji: '🇬🇷',
      languages: [
        {
          code: 'el',
          name: 'Greek',
          native: 'Ελληνικά',
          rtl: false,
        },
      ],
      name: 'Greece',
    },
    {
      code: 'GS',
      native: 'South Georgia',
      emoji: '🇬🇸',
      languages: [
        {
          code: 'en',
          name: 'English',
          native: 'English',
          rtl: false,
        },
      ],
      name: 'South Georgia and the South Sandwich Islands',
    },
    {
      code: 'GT',
      native: 'Guatemala',
      emoji: '🇬🇹',
      languages: [
        {
          code: 'es',
          name: 'Spanish',
          native: 'Español',
          rtl: false,
        },
      ],
      name: 'Guatemala',
    },
    {
      code: 'GU',
      native: 'Guam',
      emoji: '🇬🇺',
      languages: [
        {
          code: 'en',
          name: 'English',
          native: 'English',
          rtl: false,
        },
        {
          code: 'ch',
          name: 'Chamorro',
          native: 'Chamoru',
          rtl: false,
        },
        {
          code: 'es',
          name: 'Spanish',
          native: 'Español',
          rtl: false,
        },
      ],
      name: 'Guam',
    },
    {
      code: 'GW',
      native: 'Guiné-Bissau',
      emoji: '🇬🇼',
      languages: [
        {
          code: 'pt',
          name: 'Portuguese',
          native: 'Português',
          rtl: false,
        },
      ],
      name: 'Guinea-Bissau',
    },
    {
      code: 'GY',
      native: 'Guyana',
      emoji: '🇬🇾',
      languages: [
        {
          code: 'en',
          name: 'English',
          native: 'English',
          rtl: false,
        },
      ],
      name: 'Guyana',
    },
    {
      code: 'HK',
      native: '香港',
      emoji: '🇭🇰',
      languages: [
        {
          code: 'zh',
          name: 'Chinese',
          native: '中文',
          rtl: false,
        },
        {
          code: 'en',
          name: 'English',
          native: 'English',
          rtl: false,
        },
      ],
      name: 'Hong Kong',
    },
    {
      code: 'HM',
      native: 'Heard Island and McDonald Islands',
      emoji: '🇭🇲',
      languages: [
        {
          code: 'en',
          name: 'English',
          native: 'English',
          rtl: false,
        },
      ],
      name: 'Heard Island and McDonald Islands',
    },
    {
      code: 'HN',
      native: 'Honduras',
      emoji: '🇭🇳',
      languages: [
        {
          code: 'es',
          name: 'Spanish',
          native: 'Español',
          rtl: false,
        },
      ],
      name: 'Honduras',
    },
    {
      code: 'HR',
      native: 'Hrvatska',
      emoji: '🇭🇷',
      languages: [
        {
          code: 'hr',
          name: 'Croatian',
          native: 'Hrvatski',
          rtl: false,
        },
      ],
      name: 'Croatia',
    },
    {
      code: 'HT',
      native: 'Haïti',
      emoji: '🇭🇹',
      languages: [
        {
          code: 'fr',
          name: 'French',
          native: 'Français',
          rtl: false,
        },
        {
          code: 'ht',
          name: 'Haitian',
          native: 'Krèyol ayisyen',
          rtl: false,
        },
      ],
      name: 'Haiti',
    },
    {
      code: 'HU',
      native: 'Magyarország',
      emoji: '🇭🇺',
      languages: [
        {
          code: 'hu',
          name: 'Hungarian',
          native: 'Magyar',
          rtl: false,
        },
      ],
      name: 'Hungary',
    },
    {
      code: 'ID',
      native: 'Indonesia',
      emoji: '🇮🇩',
      languages: [
        {
          code: 'id',
          name: 'Indonesian',
          native: 'Bahasa Indonesia',
          rtl: false,
        },
      ],
      name: 'Indonesia',
    },
    {
      code: 'IE',
      native: 'Éire',
      emoji: '🇮🇪',
      languages: [
        {
          code: 'ga',
          name: 'Irish',
          native: 'Gaeilge',
          rtl: false,
        },
        {
          code: 'en',
          name: 'English',
          native: 'English',
          rtl: false,
        },
      ],
      name: 'Ireland',
    },
    {
      code: 'IL',
      native: 'יִשְׂרָאֵל',
      emoji: '🇮🇱',
      languages: [
        {
          code: 'he',
          name: 'Hebrew',
          native: 'עברית',
          rtl: true,
        },
        {
          code: 'ar',
          name: 'Arabic',
          native: 'العربية',
          rtl: true,
        },
      ],
      name: 'Israel',
    },
    {
      code: 'IM',
      native: 'Isle of Man',
      emoji: '🇮🇲',
      languages: [
        {
          code: 'en',
          name: 'English',
          native: 'English',
          rtl: false,
        },
        {
          code: 'gv',
          name: 'Manx',
          native: 'Gaelg',
          rtl: false,
        },
      ],
      name: 'Isle of Man',
    },
    {
      code: 'IN',
      native: 'भारत',
      emoji: '🇮🇳',
      languages: [
        {
          code: 'hi',
          name: 'Hindi',
          native: 'हिन्दी',
          rtl: false,
        },
        {
          code: 'en',
          name: 'English',
          native: 'English',
          rtl: false,
        },
      ],
      name: 'India',
    },
    {
      code: 'IO',
      native: 'British Indian Ocean Territory',
      emoji: '🇮🇴',
      languages: [
        {
          code: 'en',
          name: 'English',
          native: 'English',
          rtl: false,
        },
      ],
      name: 'British Indian Ocean Territory',
    },
    {
      code: 'IQ',
      native: 'العراق',
      emoji: '🇮🇶',
      languages: [
        {
          code: 'ar',
          name: 'Arabic',
          native: 'العربية',
          rtl: true,
        },
        {
          code: 'ku',
          name: 'Kurdish',
          native: 'Kurdî / كوردی',
          rtl: true,
        },
      ],
      name: 'Iraq',
    },
    {
      code: 'IR',
      native: 'ایران',
      emoji: '🇮🇷',
      languages: [
        {
          code: 'fa',
          name: 'Persian',
          native: 'فارسی',
          rtl: true,
        },
      ],
      name: 'Iran',
    },
    {
      code: 'IS',
      native: 'Ísland',
      emoji: '🇮🇸',
      languages: [
        {
          code: 'is',
          name: 'Icelandic',
          native: 'Íslenska',
          rtl: false,
        },
      ],
      name: 'Iceland',
    },
    {
      code: 'IT',
      native: 'Italia',
      emoji: '🇮🇹',
      languages: [
        {
          code: 'it',
          name: 'Italian',
          native: 'Italiano',
          rtl: false,
        },
      ],
      name: 'Italy',
    },
    {
      code: 'JE',
      native: 'Jersey',
      emoji: '🇯🇪',
      languages: [
        {
          code: 'en',
          name: 'English',
          native: 'English',
          rtl: false,
        },
        {
          code: 'fr',
          name: 'French',
          native: 'Français',
          rtl: false,
        },
      ],
      name: 'Jersey',
    },
    {
      code: 'JM',
      native: 'Jamaica',
      emoji: '🇯🇲',
      languages: [
        {
          code: 'en',
          name: 'English',
          native: 'English',
          rtl: false,
        },
      ],
      name: 'Jamaica',
    },
    {
      code: 'JO',
      native: 'الأردن',
      emoji: '🇯🇴',
      languages: [
        {
          code: 'ar',
          name: 'Arabic',
          native: 'العربية',
          rtl: true,
        },
      ],
      name: 'Jordan',
    },
    {
      code: 'JP',
      native: '日本',
      emoji: '🇯🇵',
      languages: [
        {
          code: 'ja',
          name: 'Japanese',
          native: '日本語',
          rtl: false,
        },
      ],
      name: 'Japan',
    },
    {
      code: 'KE',
      native: 'Kenya',
      emoji: '🇰🇪',
      languages: [
        {
          code: 'en',
          name: 'English',
          native: 'English',
          rtl: false,
        },
        {
          code: 'sw',
          name: 'Swahili',
          native: 'Kiswahili',
          rtl: false,
        },
      ],
      name: 'Kenya',
    },
    {
      code: 'KG',
      native: 'Кыргызстан',
      emoji: '🇰🇬',
      languages: [
        {
          code: 'ky',
          name: 'Kyrgyz',
          native: 'Кыргызча',
          rtl: false,
        },
        {
          code: 'ru',
          name: 'Russian',
          native: 'Русский',
          rtl: false,
        },
      ],
      name: 'Kyrgyzstan',
    },
    {
      code: 'KH',
      native: 'Kâmpŭchéa',
      emoji: '🇰🇭',
      languages: [
        {
          code: 'km',
          name: 'Cambodian',
          native: 'ភាសាខ្មែរ',
          rtl: false,
        },
      ],
      name: 'Cambodia',
    },
    {
      code: 'KI',
      native: 'Kiribati',
      emoji: '🇰🇮',
      languages: [
        {
          code: 'en',
          name: 'English',
          native: 'English',
          rtl: false,
        },
      ],
      name: 'Kiribati',
    },
    {
      code: 'KM',
      native: 'Komori',
      emoji: '🇰🇲',
      languages: [
        {
          code: 'ar',
          name: 'Arabic',
          native: 'العربية',
          rtl: true,
        },
        {
          code: 'fr',
          name: 'French',
          native: 'Français',
          rtl: false,
        },
      ],
      name: 'Comoros',
    },
    {
      code: 'KN',
      native: 'Saint Kitts and Nevis',
      emoji: '🇰🇳',
      languages: [
        {
          code: 'en',
          name: 'English',
          native: 'English',
          rtl: false,
        },
      ],
      name: 'Saint Kitts and Nevis',
    },
    {
      code: 'KP',
      native: '북한',
      emoji: '🇰🇵',
      languages: [
        {
          code: 'ko',
          name: 'Korean',
          native: '한국어',
          rtl: false,
        },
      ],
      name: 'North Korea',
    },
    {
      code: 'KR',
      native: '대한민국',
      emoji: '🇰🇷',
      languages: [
        {
          code: 'ko',
          name: 'Korean',
          native: '한국어',
          rtl: false,
        },
      ],
      name: 'South Korea',
    },
    {
      code: 'KW',
      native: 'الكويت',
      emoji: '🇰🇼',
      languages: [
        {
          code: 'ar',
          name: 'Arabic',
          native: 'العربية',
          rtl: true,
        },
      ],
      name: 'Kuwait',
    },
    {
      code: 'KY',
      native: 'Cayman Islands',
      emoji: '🇰🇾',
      languages: [
        {
          code: 'en',
          name: 'English',
          native: 'English',
          rtl: false,
        },
      ],
      name: 'Cayman Islands',
    },
    {
      code: 'KZ',
      native: 'Қазақстан',
      emoji: '🇰🇿',
      languages: [
        {
          code: 'kk',
          name: 'Kazakh',
          native: 'Қазақша',
          rtl: false,
        },
        {
          code: 'ru',
          name: 'Russian',
          native: 'Русский',
          rtl: false,
        },
      ],
      name: 'Kazakhstan',
    },
    {
      code: 'LA',
      native: 'ສປປລາວ',
      emoji: '🇱🇦',
      languages: [
        {
          code: 'lo',
          name: 'Laotian',
          native: 'ລາວ / Pha xa lao',
          rtl: false,
        },
      ],
      name: 'Laos',
    },
    {
      code: 'LB',
      native: 'لبنان',
      emoji: '🇱🇧',
      languages: [
        {
          code: 'ar',
          name: 'Arabic',
          native: 'العربية',
          rtl: true,
        },
        {
          code: 'fr',
          name: 'French',
          native: 'Français',
          rtl: false,
        },
      ],
      name: 'Lebanon',
    },
    {
      code: 'LC',
      native: 'Saint Lucia',
      emoji: '🇱🇨',
      languages: [
        {
          code: 'en',
          name: 'English',
          native: 'English',
          rtl: false,
        },
      ],
      name: 'Saint Lucia',
    },
    {
      code: 'LI',
      native: 'Liechtenstein',
      emoji: '🇱🇮',
      languages: [
        {
          code: 'de',
          name: 'German',
          native: 'Deutsch',
          rtl: false,
        },
      ],
      name: 'Liechtenstein',
    },
    {
      code: 'LK',
      native: 'śrī laṃkāva',
      emoji: '🇱🇰',
      languages: [
        {
          code: 'si',
          name: 'Sinhalese',
          native: 'සිංහල',
          rtl: false,
        },
        {
          code: 'ta',
          name: 'Tamil',
          native: 'தமிழ்',
          rtl: false,
        },
      ],
      name: 'Sri Lanka',
    },
    {
      code: 'LR',
      native: 'Liberia',
      emoji: '🇱🇷',
      languages: [
        {
          code: 'en',
          name: 'English',
          native: 'English',
          rtl: false,
        },
      ],
      name: 'Liberia',
    },
    {
      code: 'LS',
      native: 'Lesotho',
      emoji: '🇱🇸',
      languages: [
        {
          code: 'en',
          name: 'English',
          native: 'English',
          rtl: false,
        },
        {
          code: 'st',
          name: 'Southern Sotho',
          native: 'Sesotho',
          rtl: false,
        },
      ],
      name: 'Lesotho',
    },
    {
      code: 'LT',
      native: 'Lietuva',
      emoji: '🇱🇹',
      languages: [
        {
          code: 'lt',
          name: 'Lithuanian',
          native: 'Lietuvių',
          rtl: false,
        },
      ],
      name: 'Lithuania',
    },
    {
      code: 'LU',
      native: 'Luxembourg',
      emoji: '🇱🇺',
      languages: [
        {
          code: 'fr',
          name: 'French',
          native: 'Français',
          rtl: false,
        },
        {
          code: 'de',
          name: 'German',
          native: 'Deutsch',
          rtl: false,
        },
        {
          code: 'lb',
          name: 'Luxembourgish',
          native: 'Lëtzebuergesch',
          rtl: false,
        },
      ],
      name: 'Luxembourg',
    },
    {
      code: 'LV',
      native: 'Latvija',
      emoji: '🇱🇻',
      languages: [
        {
          code: 'lv',
          name: 'Latvian',
          native: 'Latviešu',
          rtl: false,
        },
      ],
      name: 'Latvia',
    },
    {
      code: 'LY',
      native: '‏ليبيا',
      emoji: '🇱🇾',
      languages: [
        {
          code: 'ar',
          name: 'Arabic',
          native: 'العربية',
          rtl: true,
        },
      ],
      name: 'Libya',
    },
    {
      code: 'MA',
      native: 'المغرب',
      emoji: '🇲🇦',
      languages: [
        {
          code: 'ar',
          name: 'Arabic',
          native: 'العربية',
          rtl: true,
        },
      ],
      name: 'Morocco',
    },
    {
      code: 'MC',
      native: 'Monaco',
      emoji: '🇲🇨',
      languages: [
        {
          code: 'fr',
          name: 'French',
          native: 'Français',
          rtl: false,
        },
      ],
      name: 'Monaco',
    },
    {
      code: 'MD',
      native: 'Moldova',
      emoji: '🇲🇩',
      languages: [
        {
          code: 'ro',
          name: 'Romanian',
          native: 'Română',
          rtl: false,
        },
      ],
      name: 'Moldova',
    },
    {
      code: 'ME',
      native: 'Црна Гора',
      emoji: '🇲🇪',
      languages: [
        {
          code: 'sr',
          name: 'Serbian',
          native: 'Српски',
          rtl: false,
        },
        {
          code: 'bs',
          name: 'Bosnian',
          native: 'Bosanski',
          rtl: false,
        },
        {
          code: 'sq',
          name: 'Albanian',
          native: 'Shqip',
          rtl: false,
        },
        {
          code: 'hr',
          name: 'Croatian',
          native: 'Hrvatski',
          rtl: false,
        },
      ],
      name: 'Montenegro',
    },
    {
      code: 'MF',
      native: 'Saint-Martin',
      emoji: '🇲🇫',
      languages: [
        {
          code: 'en',
          name: 'English',
          native: 'English',
          rtl: false,
        },
        {
          code: 'fr',
          name: 'French',
          native: 'Français',
          rtl: false,
        },
        {
          code: 'nl',
          name: 'Dutch',
          native: 'Nederlands',
          rtl: false,
        },
      ],
      name: 'Saint Martin',
    },
    {
      code: 'MG',
      native: 'Madagasikara',
      emoji: '🇲🇬',
      languages: [
        {
          code: 'fr',
          name: 'French',
          native: 'Français',
          rtl: false,
        },
        {
          code: 'mg',
          name: 'Malagasy',
          native: 'Malagasy',
          rtl: false,
        },
      ],
      name: 'Madagascar',
    },
    {
      code: 'MH',
      native: 'M̧ajeļ',
      emoji: '🇲🇭',
      languages: [
        {
          code: 'en',
          name: 'English',
          native: 'English',
          rtl: false,
        },
        {
          code: 'mh',
          name: 'Marshallese',
          native: 'Kajin Majel / Ebon',
          rtl: false,
        },
      ],
      name: 'Marshall Islands',
    },
    {
      code: 'MK',
      native: 'Северна Македонија',
      emoji: '🇲🇰',
      languages: [
        {
          code: 'mk',
          name: 'Macedonian',
          native: 'Македонски',
          rtl: false,
        },
      ],
      name: 'North Macedonia',
    },
    {
      code: 'ML',
      native: 'Mali',
      emoji: '🇲🇱',
      languages: [
        {
          code: 'fr',
          name: 'French',
          native: 'Français',
          rtl: false,
        },
      ],
      name: 'Mali',
    },
    {
      code: 'MM',
      native: 'မြန်မာ',
      emoji: '🇲🇲',
      languages: [
        {
          code: 'my',
          name: 'Burmese',
          native: 'မြန်မာစာ',
          rtl: false,
        },
      ],
      name: 'Myanmar [Burma]',
    },
    {
      code: 'MN',
      native: 'Монгол улс',
      emoji: '🇲🇳',
      languages: [
        {
          code: 'mn',
          name: 'Mongolian',
          native: 'Монгол',
          rtl: false,
        },
      ],
      name: 'Mongolia',
    },
    {
      code: 'MO',
      native: '澳門',
      emoji: '🇲🇴',
      languages: [
        {
          code: 'zh',
          name: 'Chinese',
          native: '中文',
          rtl: false,
        },
        {
          code: 'pt',
          name: 'Portuguese',
          native: 'Português',
          rtl: false,
        },
      ],
      name: 'Macao',
    },
    {
      code: 'MP',
      native: 'Northern Mariana Islands',
      emoji: '🇲🇵',
      languages: [
        {
          code: 'en',
          name: 'English',
          native: 'English',
          rtl: false,
        },
        {
          code: 'ch',
          name: 'Chamorro',
          native: 'Chamoru',
          rtl: false,
        },
      ],
      name: 'Northern Mariana Islands',
    },
    {
      code: 'MQ',
      native: 'Martinique',
      emoji: '🇲🇶',
      languages: [
        {
          code: 'fr',
          name: 'French',
          native: 'Français',
          rtl: false,
        },
      ],
      name: 'Martinique',
    },
    {
      code: 'MR',
      native: 'موريتانيا',
      emoji: '🇲🇷',
      languages: [
        {
          code: 'ar',
          name: 'Arabic',
          native: 'العربية',
          rtl: true,
        },
      ],
      name: 'Mauritania',
    },
    {
      code: 'MS',
      native: 'Montserrat',
      emoji: '🇲🇸',
      languages: [
        {
          code: 'en',
          name: 'English',
          native: 'English',
          rtl: false,
        },
      ],
      name: 'Montserrat',
    },
    {
      code: 'MT',
      native: 'Malta',
      emoji: '🇲🇹',
      languages: [
        {
          code: 'mt',
          name: 'Maltese',
          native: 'bil-Malti',
          rtl: false,
        },
        {
          code: 'en',
          name: 'English',
          native: 'English',
          rtl: false,
        },
      ],
      name: 'Malta',
    },
    {
      code: 'MU',
      native: 'Maurice',
      emoji: '🇲🇺',
      languages: [
        {
          code: 'en',
          name: 'English',
          native: 'English',
          rtl: false,
        },
      ],
      name: 'Mauritius',
    },
    {
      code: 'MV',
      native: 'Maldives',
      emoji: '🇲🇻',
      languages: [
        {
          code: 'dv',
          name: 'Divehi',
          native: 'ދިވެހިބަސް',
          rtl: true,
        },
      ],
      name: 'Maldives',
    },
    {
      code: 'MW',
      native: 'Malawi',
      emoji: '🇲🇼',
      languages: [
        {
          code: 'en',
          name: 'English',
          native: 'English',
          rtl: false,
        },
        {
          code: 'ny',
          name: 'Chichewa',
          native: 'Chi-Chewa',
          rtl: false,
        },
      ],
      name: 'Malawi',
    },
    {
      code: 'MX',
      native: 'México',
      emoji: '🇲🇽',
      languages: [
        {
          code: 'es',
          name: 'Spanish',
          native: 'Español',
          rtl: false,
        },
      ],
      name: 'Mexico',
    },
    {
      code: 'MY',
      native: 'Malaysia',
      emoji: '🇲🇾',
      languages: [
        {
          code: 'ms',
          name: 'Malay',
          native: 'Bahasa Melayu',
          rtl: false,
        },
      ],
      name: 'Malaysia',
    },
    {
      code: 'MZ',
      native: 'Moçambique',
      emoji: '🇲🇿',
      languages: [
        {
          code: 'pt',
          name: 'Portuguese',
          native: 'Português',
          rtl: false,
        },
      ],
      name: 'Mozambique',
    },
    {
      code: 'NA',
      native: 'Namibia',
      emoji: '🇳🇦',
      languages: [
        {
          code: 'en',
          name: 'English',
          native: 'English',
          rtl: false,
        },
        {
          code: 'af',
          name: 'Afrikaans',
          native: 'Afrikaans',
          rtl: false,
        },
      ],
      name: 'Namibia',
    },
    {
      code: 'NC',
      native: 'Nouvelle-Calédonie',
      emoji: '🇳🇨',
      languages: [
        {
          code: 'fr',
          name: 'French',
          native: 'Français',
          rtl: false,
        },
      ],
      name: 'New Caledonia',
    },
    {
      code: 'NE',
      native: 'Niger',
      emoji: '🇳🇪',
      languages: [
        {
          code: 'fr',
          name: 'French',
          native: 'Français',
          rtl: false,
        },
      ],
      name: 'Niger',
    },
    {
      code: 'NF',
      native: 'Norfolk Island',
      emoji: '🇳🇫',
      languages: [
        {
          code: 'en',
          name: 'English',
          native: 'English',
          rtl: false,
        },
      ],
      name: 'Norfolk Island',
    },
    {
      code: 'NG',
      native: 'Nigeria',
      emoji: '🇳🇬',
      languages: [
        {
          code: 'en',
          name: 'English',
          native: 'English',
          rtl: false,
        },
      ],
      name: 'Nigeria',
    },
    {
      code: 'NI',
      native: 'Nicaragua',
      emoji: '🇳🇮',
      languages: [
        {
          code: 'es',
          name: 'Spanish',
          native: 'Español',
          rtl: false,
        },
      ],
      name: 'Nicaragua',
    },
    {
      code: 'NL',
      native: 'Nederland',
      emoji: '🇳🇱',
      languages: [
        {
          code: 'nl',
          name: 'Dutch',
          native: 'Nederlands',
          rtl: false,
        },
      ],
      name: 'Netherlands',
    },
    {
      code: 'NO',
      native: 'Norge',
      emoji: '🇳🇴',
      languages: [
        {
          code: 'no',
          name: 'Norwegian',
          native: 'Norsk',
          rtl: false,
        },
        {
          code: 'nb',
          name: 'Norwegian Bokmål',
          native: 'Norsk bokmål',
          rtl: false,
        },
        {
          code: 'nn',
          name: 'Norwegian Nynorsk',
          native: 'Norsk nynorsk',
          rtl: false,
        },
      ],
      name: 'Norway',
    },
    {
      code: 'NP',
      native: 'नपल',
      emoji: '🇳🇵',
      languages: [
        {
          code: 'ne',
          name: 'Nepali',
          native: 'नेपाली',
          rtl: false,
        },
      ],
      name: 'Nepal',
    },
    {
      code: 'NR',
      native: 'Nauru',
      emoji: '🇳🇷',
      languages: [
        {
          code: 'en',
          name: 'English',
          native: 'English',
          rtl: false,
        },
        {
          code: 'na',
          name: 'Nauruan',
          native: 'Dorerin Naoero',
          rtl: false,
        },
      ],
      name: 'Nauru',
    },
    {
      code: 'NU',
      native: 'Niuē',
      emoji: '🇳🇺',
      languages: [
        {
          code: 'en',
          name: 'English',
          native: 'English',
          rtl: false,
        },
      ],
      name: 'Niue',
    },
    {
      code: 'NZ',
      native: 'New Zealand',
      emoji: '🇳🇿',
      languages: [
        {
          code: 'en',
          name: 'English',
          native: 'English',
          rtl: false,
        },
        {
          code: 'mi',
          name: 'Maori',
          native: 'Māori',
          rtl: false,
        },
      ],
      name: 'New Zealand',
    },
    {
      code: 'OM',
      native: 'عمان',
      emoji: '🇴🇲',
      languages: [
        {
          code: 'ar',
          name: 'Arabic',
          native: 'العربية',
          rtl: true,
        },
      ],
      name: 'Oman',
    },
    {
      code: 'PA',
      native: 'Panamá',
      emoji: '🇵🇦',
      languages: [
        {
          code: 'es',
          name: 'Spanish',
          native: 'Español',
          rtl: false,
        },
      ],
      name: 'Panama',
    },
    {
      code: 'PE',
      native: 'Perú',
      emoji: '🇵🇪',
      languages: [
        {
          code: 'es',
          name: 'Spanish',
          native: 'Español',
          rtl: false,
        },
      ],
      name: 'Peru',
    },
    {
      code: 'PF',
      native: 'Polynésie française',
      emoji: '🇵🇫',
      languages: [
        {
          code: 'fr',
          name: 'French',
          native: 'Français',
          rtl: false,
        },
      ],
      name: 'French Polynesia',
    },
    {
      code: 'PG',
      native: 'Papua Niugini',
      emoji: '🇵🇬',
      languages: [
        {
          code: 'en',
          name: 'English',
          native: 'English',
          rtl: false,
        },
      ],
      name: 'Papua New Guinea',
    },
    {
      code: 'PH',
      native: 'Pilipinas',
      emoji: '🇵🇭',
      languages: [
        {
          code: 'en',
          name: 'English',
          native: 'English',
          rtl: false,
        },
      ],
      name: 'Philippines',
    },
    {
      code: 'PK',
      native: 'Pakistan',
      emoji: '🇵🇰',
      languages: [
        {
          code: 'en',
          name: 'English',
          native: 'English',
          rtl: false,
        },
        {
          code: 'ur',
          name: 'Urdu',
          native: 'اردو',
          rtl: true,
        },
      ],
      name: 'Pakistan',
    },
    {
      code: 'PL',
      native: 'Polska',
      emoji: '🇵🇱',
      languages: [
        {
          code: 'pl',
          name: 'Polish',
          native: 'Polski',
          rtl: false,
        },
      ],
      name: 'Poland',
    },
    {
      code: 'PM',
      native: 'Saint-Pierre-et-Miquelon',
      emoji: '🇵🇲',
      languages: [
        {
          code: 'fr',
          name: 'French',
          native: 'Français',
          rtl: false,
        },
      ],
      name: 'Saint Pierre and Miquelon',
    },
    {
      code: 'PN',
      native: 'Pitcairn Islands',
      emoji: '🇵🇳',
      languages: [
        {
          code: 'en',
          name: 'English',
          native: 'English',
          rtl: false,
        },
      ],
      name: 'Pitcairn Islands',
    },
    {
      code: 'PR',
      native: 'Puerto Rico',
      emoji: '🇵🇷',
      languages: [
        {
          code: 'es',
          name: 'Spanish',
          native: 'Español',
          rtl: false,
        },
        {
          code: 'en',
          name: 'English',
          native: 'English',
          rtl: false,
        },
      ],
      name: 'Puerto Rico',
    },
    {
      code: 'PS',
      native: 'فلسطين',
      emoji: '🇵🇸',
      languages: [
        {
          code: 'ar',
          name: 'Arabic',
          native: 'العربية',
          rtl: true,
        },
      ],
      name: 'Palestine',
    },
    {
      code: 'PT',
      native: 'Portugal',
      emoji: '🇵🇹',
      languages: [
        {
          code: 'pt',
          name: 'Portuguese',
          native: 'Português',
          rtl: false,
        },
      ],
      name: 'Portugal',
    },
    {
      code: 'PW',
      native: 'Palau',
      emoji: '🇵🇼',
      languages: [
        {
          code: 'en',
          name: 'English',
          native: 'English',
          rtl: false,
        },
      ],
      name: 'Palau',
    },
    {
      code: 'PY',
      native: 'Paraguay',
      emoji: '🇵🇾',
      languages: [
        {
          code: 'es',
          name: 'Spanish',
          native: 'Español',
          rtl: false,
        },
        {
          code: 'gn',
          name: 'Guarani',
          native: "Avañe'ẽ",
          rtl: false,
        },
      ],
      name: 'Paraguay',
    },
    {
      code: 'QA',
      native: 'قطر',
      emoji: '🇶🇦',
      languages: [
        {
          code: 'ar',
          name: 'Arabic',
          native: 'العربية',
          rtl: true,
        },
      ],
      name: 'Qatar',
    },
    {
      code: 'RE',
      native: 'La Réunion',
      emoji: '🇷🇪',
      languages: [
        {
          code: 'fr',
          name: 'French',
          native: 'Français',
          rtl: false,
        },
      ],
      name: 'Réunion',
    },
    {
      code: 'RO',
      native: 'România',
      emoji: '🇷🇴',
      languages: [
        {
          code: 'ro',
          name: 'Romanian',
          native: 'Română',
          rtl: false,
        },
      ],
      name: 'Romania',
    },
    {
      code: 'RS',
      native: 'Србија',
      emoji: '🇷🇸',
      languages: [
        {
          code: 'sr',
          name: 'Serbian',
          native: 'Српски',
          rtl: false,
        },
      ],
      name: 'Serbia',
    },
    {
      code: 'RU',
      native: 'Россия',
      emoji: '🇷🇺',
      languages: [
        {
          code: 'ru',
          name: 'Russian',
          native: 'Русский',
          rtl: false,
        },
      ],
      name: 'Russia',
    },
    {
      code: 'RW',
      native: 'Rwanda',
      emoji: '🇷🇼',
      languages: [
        {
          code: 'rw',
          name: 'Rwandi',
          native: 'Kinyarwandi',
          rtl: false,
        },
        {
          code: 'en',
          name: 'English',
          native: 'English',
          rtl: false,
        },
        {
          code: 'fr',
          name: 'French',
          native: 'Français',
          rtl: false,
        },
      ],
      name: 'Rwanda',
    },
    {
      code: 'SA',
      native: 'العربية السعودية',
      emoji: '🇸🇦',
      languages: [
        {
          code: 'ar',
          name: 'Arabic',
          native: 'العربية',
          rtl: true,
        },
      ],
      name: 'Saudi Arabia',
    },
    {
      code: 'SB',
      native: 'Solomon Islands',
      emoji: '🇸🇧',
      languages: [
        {
          code: 'en',
          name: 'English',
          native: 'English',
          rtl: false,
        },
      ],
      name: 'Solomon Islands',
    },
    {
      code: 'SC',
      native: 'Seychelles',
      emoji: '🇸🇨',
      languages: [
        {
          code: 'fr',
          name: 'French',
          native: 'Français',
          rtl: false,
        },
        {
          code: 'en',
          name: 'English',
          native: 'English',
          rtl: false,
        },
      ],
      name: 'Seychelles',
    },
    {
      code: 'SD',
      native: 'السودان',
      emoji: '🇸🇩',
      languages: [
        {
          code: 'ar',
          name: 'Arabic',
          native: 'العربية',
          rtl: true,
        },
        {
          code: 'en',
          name: 'English',
          native: 'English',
          rtl: false,
        },
      ],
      name: 'Sudan',
    },
    {
      code: 'SE',
      native: 'Sverige',
      emoji: '🇸🇪',
      languages: [
        {
          code: 'sv',
          name: 'Swedish',
          native: 'Svenska',
          rtl: false,
        },
      ],
      name: 'Sweden',
    },
    {
      code: 'SG',
      native: 'Singapore',
      emoji: '🇸🇬',
      languages: [
        {
          code: 'en',
          name: 'English',
          native: 'English',
          rtl: false,
        },
        {
          code: 'ms',
          name: 'Malay',
          native: 'Bahasa Melayu',
          rtl: false,
        },
        {
          code: 'ta',
          name: 'Tamil',
          native: 'தமிழ்',
          rtl: false,
        },
        {
          code: 'zh',
          name: 'Chinese',
          native: '中文',
          rtl: false,
        },
      ],
      name: 'Singapore',
    },
    {
      code: 'SH',
      native: 'Saint Helena',
      emoji: '🇸🇭',
      languages: [
        {
          code: 'en',
          name: 'English',
          native: 'English',
          rtl: false,
        },
      ],
      name: 'Saint Helena',
    },
    {
      code: 'SI',
      native: 'Slovenija',
      emoji: '🇸🇮',
      languages: [
        {
          code: 'sl',
          name: 'Slovenian',
          native: 'Slovenščina',
          rtl: false,
        },
      ],
      name: 'Slovenia',
    },
    {
      code: 'SJ',
      native: 'Svalbard og Jan Mayen',
      emoji: '🇸🇯',
      languages: [
        {
          code: 'no',
          name: 'Norwegian',
          native: 'Norsk',
          rtl: false,
        },
      ],
      name: 'Svalbard and Jan Mayen',
    },
    {
      code: 'SK',
      native: 'Slovensko',
      emoji: '🇸🇰',
      languages: [
        {
          code: 'sk',
          name: 'Slovak',
          native: 'Slovenčina',
          rtl: false,
        },
      ],
      name: 'Slovakia',
    },
    {
      code: 'SL',
      native: 'Sierra Leone',
      emoji: '🇸🇱',
      languages: [
        {
          code: 'en',
          name: 'English',
          native: 'English',
          rtl: false,
        },
      ],
      name: 'Sierra Leone',
    },
    {
      code: 'SM',
      native: 'San Marino',
      emoji: '🇸🇲',
      languages: [
        {
          code: 'it',
          name: 'Italian',
          native: 'Italiano',
          rtl: false,
        },
      ],
      name: 'San Marino',
    },
    {
      code: 'SN',
      native: 'Sénégal',
      emoji: '🇸🇳',
      languages: [
        {
          code: 'fr',
          name: 'French',
          native: 'Français',
          rtl: false,
        },
      ],
      name: 'Senegal',
    },
    {
      code: 'SO',
      native: 'Soomaaliya',
      emoji: '🇸🇴',
      languages: [
        {
          code: 'so',
          name: 'Somalia',
          native: 'Soomaaliga',
          rtl: false,
        },
        {
          code: 'ar',
          name: 'Arabic',
          native: 'العربية',
          rtl: true,
        },
      ],
      name: 'Somalia',
    },
    {
      code: 'SR',
      native: 'Suriname',
      emoji: '🇸🇷',
      languages: [
        {
          code: 'nl',
          name: 'Dutch',
          native: 'Nederlands',
          rtl: false,
        },
      ],
      name: 'Suriname',
    },
    {
      code: 'SS',
      native: 'South Sudan',
      emoji: '🇸🇸',
      languages: [
        {
          code: 'en',
          name: 'English',
          native: 'English',
          rtl: false,
        },
      ],
      name: 'South Sudan',
    },
    {
      code: 'ST',
      native: 'São Tomé e Príncipe',
      emoji: '🇸🇹',
      languages: [
        {
          code: 'pt',
          name: 'Portuguese',
          native: 'Português',
          rtl: false,
        },
      ],
      name: 'São Tomé and Príncipe',
    },
    {
      code: 'SV',
      native: 'El Salvador',
      emoji: '🇸🇻',
      languages: [
        {
          code: 'es',
          name: 'Spanish',
          native: 'Español',
          rtl: false,
        },
      ],
      name: 'El Salvador',
    },
    {
      code: 'SX',
      native: 'Sint Maarten',
      emoji: '🇸🇽',
      languages: [
        {
          code: 'nl',
          name: 'Dutch',
          native: 'Nederlands',
          rtl: false,
        },
        {
          code: 'en',
          name: 'English',
          native: 'English',
          rtl: false,
        },
      ],
      name: 'Sint Maarten',
    },
    {
      code: 'SY',
      native: 'سوريا',
      emoji: '🇸🇾',
      languages: [
        {
          code: 'ar',
          name: 'Arabic',
          native: 'العربية',
          rtl: true,
        },
      ],
      name: 'Syria',
    },
    {
      code: 'SZ',
      native: 'Swaziland',
      emoji: '🇸🇿',
      languages: [
        {
          code: 'en',
          name: 'English',
          native: 'English',
          rtl: false,
        },
        {
          code: 'ss',
          name: 'Swati',
          native: 'SiSwati',
          rtl: false,
        },
      ],
      name: 'Swaziland',
    },
    {
      code: 'TC',
      native: 'Turks and Caicos Islands',
      emoji: '🇹🇨',
      languages: [
        {
          code: 'en',
          name: 'English',
          native: 'English',
          rtl: false,
        },
      ],
      name: 'Turks and Caicos Islands',
    },
    {
      code: 'TD',
      native: 'Tchad',
      emoji: '🇹🇩',
      languages: [
        {
          code: 'fr',
          name: 'French',
          native: 'Français',
          rtl: false,
        },
        {
          code: 'ar',
          name: 'Arabic',
          native: 'العربية',
          rtl: true,
        },
      ],
      name: 'Chad',
    },
    {
      code: 'TF',
      native: 'Territoire des Terres australes et antarctiques fr',
      emoji: '🇹🇫',
      languages: [
        {
          code: 'fr',
          name: 'French',
          native: 'Français',
          rtl: false,
        },
      ],
      name: 'French Southern Territories',
    },
    {
      code: 'TG',
      native: 'Togo',
      emoji: '🇹🇬',
      languages: [
        {
          code: 'fr',
          name: 'French',
          native: 'Français',
          rtl: false,
        },
      ],
      name: 'Togo',
    },
    {
      code: 'TH',
      native: 'ประเทศไทย',
      emoji: '🇹🇭',
      languages: [
        {
          code: 'th',
          name: 'Thai',
          native: 'ไทย / Phasa Thai',
          rtl: false,
        },
      ],
      name: 'Thailand',
    },
    {
      code: 'TJ',
      native: 'Тоҷикистон',
      emoji: '🇹🇯',
      languages: [
        {
          code: 'tg',
          name: 'Tajik',
          native: 'Тоҷикӣ',
          rtl: false,
        },
        {
          code: 'ru',
          name: 'Russian',
          native: 'Русский',
          rtl: false,
        },
      ],
      name: 'Tajikistan',
    },
    {
      code: 'TK',
      native: 'Tokelau',
      emoji: '🇹🇰',
      languages: [
        {
          code: 'en',
          name: 'English',
          native: 'English',
          rtl: false,
        },
      ],
      name: 'Tokelau',
    },
    {
      code: 'TL',
      native: 'Timor-Leste',
      emoji: '🇹🇱',
      languages: [
        {
          code: 'pt',
          name: 'Portuguese',
          native: 'Português',
          rtl: false,
        },
      ],
      name: 'East Timor',
    },
    {
      code: 'TM',
      native: 'Türkmenistan',
      emoji: '🇹🇲',
      languages: [
        {
          code: 'tk',
          name: 'Turkmen',
          native: 'Туркмен / تركمن',
          rtl: false,
        },
        {
          code: 'ru',
          name: 'Russian',
          native: 'Русский',
          rtl: false,
        },
      ],
      name: 'Turkmenistan',
    },
    {
      code: 'TN',
      native: 'تونس',
      emoji: '🇹🇳',
      languages: [
        {
          code: 'ar',
          name: 'Arabic',
          native: 'العربية',
          rtl: true,
        },
      ],
      name: 'Tunisia',
    },
    {
      code: 'TO',
      native: 'Tonga',
      emoji: '🇹🇴',
      languages: [
        {
          code: 'en',
          name: 'English',
          native: 'English',
          rtl: false,
        },
        {
          code: 'to',
          name: 'Tonga',
          native: 'Lea Faka-Tonga',
          rtl: false,
        },
      ],
      name: 'Tonga',
    },
    {
      code: 'TR',
      native: 'Türkiye',
      emoji: '🇹🇷',
      languages: [
        {
          code: 'tr',
          name: 'Turkish',
          native: 'Türkçe',
          rtl: false,
        },
      ],
      name: 'Turkey',
    },
    {
      code: 'TT',
      native: 'Trinidad and Tobago',
      emoji: '🇹🇹',
      languages: [
        {
          code: 'en',
          name: 'English',
          native: 'English',
          rtl: false,
        },
      ],
      name: 'Trinidad and Tobago',
    },
    {
      code: 'TV',
      native: 'Tuvalu',
      emoji: '🇹🇻',
      languages: [
        {
          code: 'en',
          name: 'English',
          native: 'English',
          rtl: false,
        },
      ],
      name: 'Tuvalu',
    },
    {
      code: 'TW',
      native: '臺灣',
      emoji: '🇹🇼',
      languages: [
        {
          code: 'zh',
          name: 'Chinese',
          native: '中文',
          rtl: false,
        },
      ],
      name: 'Taiwan',
    },
    {
      code: 'TZ',
      native: 'Tanzania',
      emoji: '🇹🇿',
      languages: [
        {
          code: 'sw',
          name: 'Swahili',
          native: 'Kiswahili',
          rtl: false,
        },
        {
          code: 'en',
          name: 'English',
          native: 'English',
          rtl: false,
        },
      ],
      name: 'Tanzania',
    },
    {
      code: 'UA',
      native: 'Україна',
      emoji: '🇺🇦',
      languages: [
        {
          code: 'uk',
          name: 'Ukrainian',
          native: 'Українська',
          rtl: false,
        },
      ],
      name: 'Ukraine',
    },
    {
      code: 'UG',
      native: 'Uganda',
      emoji: '🇺🇬',
      languages: [
        {
          code: 'en',
          name: 'English',
          native: 'English',
          rtl: false,
        },
        {
          code: 'sw',
          name: 'Swahili',
          native: 'Kiswahili',
          rtl: false,
        },
      ],
      name: 'Uganda',
    },
    {
      code: 'UM',
      native: 'United States Minor Outlying Islands',
      emoji: '🇺🇲',
      languages: [
        {
          code: 'en',
          name: 'English',
          native: 'English',
          rtl: false,
        },
      ],
      name: 'U.S. Minor Outlying Islands',
    },
    {
      code: 'US',
      native: 'United States',
      emoji: '🇺🇸',
      languages: [
        {
          code: 'en',
          name: 'English',
          native: 'English',
          rtl: false,
        },
      ],
      name: 'United States',
    },
    {
      code: 'UY',
      native: 'Uruguay',
      emoji: '🇺🇾',
      languages: [
        {
          code: 'es',
          name: 'Spanish',
          native: 'Español',
          rtl: false,
        },
      ],
      name: 'Uruguay',
    },
    {
      code: 'UZ',
      native: 'O‘zbekiston',
      emoji: '🇺🇿',
      languages: [
        {
          code: 'uz',
          name: 'Uzbek',
          native: 'Ўзбек',
          rtl: false,
        },
        {
          code: 'ru',
          name: 'Russian',
          native: 'Русский',
          rtl: false,
        },
      ],
      name: 'Uzbekistan',
    },
    {
      code: 'VA',
      native: 'Vaticano',
      emoji: '🇻🇦',
      languages: [
        {
          code: 'it',
          name: 'Italian',
          native: 'Italiano',
          rtl: false,
        },
        {
          code: 'la',
          name: 'Latin',
          native: 'Latina',
          rtl: false,
        },
      ],
      name: 'Vatican City',
    },
    {
      code: 'VC',
      native: 'Saint Vincent and the Grenadines',
      emoji: '🇻🇨',
      languages: [
        {
          code: 'en',
          name: 'English',
          native: 'English',
          rtl: false,
        },
      ],
      name: 'Saint Vincent and the Grenadines',
    },
    {
      code: 'VE',
      native: 'Venezuela',
      emoji: '🇻🇪',
      languages: [
        {
          code: 'es',
          name: 'Spanish',
          native: 'Español',
          rtl: false,
        },
      ],
      name: 'Venezuela',
    },
    {
      code: 'VG',
      native: 'British Virgin Islands',
      emoji: '🇻🇬',
      languages: [
        {
          code: 'en',
          name: 'English',
          native: 'English',
          rtl: false,
        },
      ],
      name: 'British Virgin Islands',
    },
    {
      code: 'VI',
      native: 'United States Virgin Islands',
      emoji: '🇻🇮',
      languages: [
        {
          code: 'en',
          name: 'English',
          native: 'English',
          rtl: false,
        },
      ],
      name: 'U.S. Virgin Islands',
    },
    {
      code: 'VN',
      native: 'Việt Nam',
      emoji: '🇻🇳',
      languages: [
        {
          code: 'vi',
          name: 'Vietnamese',
          native: 'Tiếng Việt',
          rtl: false,
        },
      ],
      name: 'Vietnam',
    },
    {
      code: 'VU',
      native: 'Vanuatu',
      emoji: '🇻🇺',
      languages: [
        {
          code: 'bi',
          name: 'Bislama',
          native: 'Bislama',
          rtl: false,
        },
        {
          code: 'en',
          name: 'English',
          native: 'English',
          rtl: false,
        },
        {
          code: 'fr',
          name: 'French',
          native: 'Français',
          rtl: false,
        },
      ],
      name: 'Vanuatu',
    },
    {
      code: 'WF',
      native: 'Wallis et Futuna',
      emoji: '🇼🇫',
      languages: [
        {
          code: 'fr',
          name: 'French',
          native: 'Français',
          rtl: false,
        },
      ],
      name: 'Wallis and Futuna',
    },
    {
      code: 'WS',
      native: 'Samoa',
      emoji: '🇼🇸',
      languages: [
        {
          code: 'sm',
          name: 'Samoan',
          native: 'Gagana Samoa',
          rtl: false,
        },
        {
          code: 'en',
          name: 'English',
          native: 'English',
          rtl: false,
        },
      ],
      name: 'Samoa',
    },
    {
      code: 'XK',
      native: 'Republika e Kosovës',
      emoji: '🇽🇰',
      languages: [
        {
          code: 'sq',
          name: 'Albanian',
          native: 'Shqip',
          rtl: false,
        },
        {
          code: 'sr',
          name: 'Serbian',
          native: 'Српски',
          rtl: false,
        },
      ],
      name: 'Kosovo',
    },
    {
      code: 'YE',
      native: 'اليَمَن',
      emoji: '🇾🇪',
      languages: [
        {
          code: 'ar',
          name: 'Arabic',
          native: 'العربية',
          rtl: true,
        },
      ],
      name: 'Yemen',
    },
    {
      code: 'YT',
      native: 'Mayotte',
      emoji: '🇾🇹',
      languages: [
        {
          code: 'fr',
          name: 'French',
          native: 'Français',
          rtl: false,
        },
      ],
      name: 'Mayotte',
    },
    {
      code: 'ZA',
      native: 'South Africa',
      emoji: '🇿🇦',
      languages: [
        {
          code: 'af',
          name: 'Afrikaans',
          native: 'Afrikaans',
          rtl: false,
        },
        {
          code: 'en',
          name: 'English',
          native: 'English',
          rtl: false,
        },
        {
          code: 'nr',
          name: 'South Ndebele',
          native: 'isiNdebele',
          rtl: false,
        },
        {
          code: 'st',
          name: 'Southern Sotho',
          native: 'Sesotho',
          rtl: false,
        },
        {
          code: 'ss',
          name: 'Swati',
          native: 'SiSwati',
          rtl: false,
        },
        {
          code: 'tn',
          name: 'Tswana',
          native: 'Setswana',
          rtl: false,
        },
        {
          code: 'ts',
          name: 'Tsonga',
          native: 'Xitsonga',
          rtl: false,
        },
        {
          code: 've',
          name: 'Venda',
          native: 'Tshivenḓa',
          rtl: false,
        },
        {
          code: 'xh',
          name: 'Xhosa',
          native: 'isiXhosa',
          rtl: false,
        },
        {
          code: 'zu',
          name: 'Zulu',
          native: 'isiZulu',
          rtl: false,
        },
      ],
      name: 'South Africa',
    },
    {
      code: 'ZM',
      native: 'Zambia',
      emoji: '🇿🇲',
      languages: [
        {
          code: 'en',
          name: 'English',
          native: 'English',
          rtl: false,
        },
      ],
      name: 'Zambia',
    },
    {
      code: 'ZW',
      native: 'Zimbabwe',
      emoji: '🇿🇼',
      languages: [
        {
          code: 'en',
          name: 'English',
          native: 'English',
          rtl: false,
        },
        {
          code: 'sn',
          name: 'Shona',
          native: 'chiShona',
          rtl: false,
        },
        {
          code: 'nd',
          name: 'North Ndebele',
          native: 'Sindebele',
          rtl: false,
        },
      ],
      name: 'Zimbabwe',
    },
  ],
})

export const getGetCountriesMockHandler = (overrideResponse?: GetCountriesQuery) =>
  mockGetCountriesQueryCountryService(() =>
    HttpResponse.json({
      data: overrideResponse ? overrideResponse : getGetCountriesResponseMock(),
    })
  )

export const getGetCountriesMock = () => [getGetCountriesMockHandler()]
