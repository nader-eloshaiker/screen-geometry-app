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
        },
        {
          code: 'uz',
        },
        {
          code: 'tk',
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
        },
        {
          code: 'ru',
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
        },
        {
          code: 'gn',
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
        },
        {
          code: 'sm',
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
        },
        {
          code: 'pa',
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
        },
        {
          code: 'hr',
        },
        {
          code: 'sr',
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
        },
        {
          code: 'fr',
        },
        {
          code: 'de',
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
        },
        {
          code: 'ff',
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
        },
        {
          code: 'rn',
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
        },
        {
          code: 'ay',
        },
        {
          code: 'qu',
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
        },
        {
          code: 'nb',
        },
        {
          code: 'nn',
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
        },
        {
          code: 'tn',
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
        },
        {
          code: 'ru',
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
        },
        {
          code: 'es',
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
        },
        {
          code: 'fr',
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
        },
        {
          code: 'ln',
        },
        {
          code: 'kg',
        },
        {
          code: 'sw',
        },
        {
          code: 'lu',
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
        },
        {
          code: 'sg',
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
        },
        {
          code: 'ln',
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
        },
        {
          code: 'fr',
        },
        {
          code: 'it',
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
        },
        {
          code: 'fr',
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
        },
        {
          code: 'pa',
        },
        {
          code: 'en',
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
        },
        {
          code: 'tr',
        },
        {
          code: 'hy',
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
        },
        {
          code: 'sk',
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
        },
        {
          code: 'ar',
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
        },
        {
          code: 'ar',
        },
        {
          code: 'en',
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
        },
        {
          code: 'eu',
        },
        {
          code: 'ca',
        },
        {
          code: 'gl',
        },
        {
          code: 'oc',
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
        },
        {
          code: 'sv',
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
        },
        {
          code: 'fj',
        },
        {
          code: 'hi',
        },
        {
          code: 'ur',
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
        },
        {
          code: 'fr',
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
        },
        {
          code: 'ff',
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
        },
        {
          code: 'fr',
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
        },
        {
          code: 'ch',
        },
        {
          code: 'es',
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
        },
        {
          code: 'en',
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
        },
        {
          code: 'ht',
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
        },
        {
          code: 'en',
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
        },
        {
          code: 'ar',
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
        },
        {
          code: 'gv',
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
        },
        {
          code: 'en',
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
        },
        {
          code: 'ku',
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
        },
        {
          code: 'fr',
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
        },
        {
          code: 'sw',
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
        },
        {
          code: 'ru',
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
        },
        {
          code: 'fr',
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
        },
        {
          code: 'ru',
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
        },
        {
          code: 'fr',
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
        },
        {
          code: 'ta',
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
        },
        {
          code: 'st',
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
        },
        {
          code: 'de',
        },
        {
          code: 'lb',
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
        },
        {
          code: 'bs',
        },
        {
          code: 'sq',
        },
        {
          code: 'hr',
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
        },
        {
          code: 'fr',
        },
        {
          code: 'nl',
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
        },
        {
          code: 'mg',
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
        },
        {
          code: 'mh',
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
        },
        {
          code: 'pt',
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
        },
        {
          code: 'ch',
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
        },
        {
          code: 'en',
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
        },
        {
          code: 'ny',
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
        },
        {
          code: 'af',
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
        },
        {
          code: 'nb',
        },
        {
          code: 'nn',
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
        },
        {
          code: 'na',
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
        },
        {
          code: 'mi',
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
        },
        {
          code: 'ur',
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
        },
        {
          code: 'en',
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
        },
        {
          code: 'gn',
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
        },
        {
          code: 'en',
        },
        {
          code: 'fr',
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
        },
        {
          code: 'en',
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
        },
        {
          code: 'en',
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
        },
        {
          code: 'ms',
        },
        {
          code: 'ta',
        },
        {
          code: 'zh',
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
        },
        {
          code: 'ar',
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
        },
        {
          code: 'en',
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
        },
        {
          code: 'ss',
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
        },
        {
          code: 'ar',
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
        },
        {
          code: 'ru',
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
        },
        {
          code: 'ru',
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
        },
        {
          code: 'to',
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
        },
        {
          code: 'en',
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
        },
        {
          code: 'sw',
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
        },
        {
          code: 'ru',
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
        },
        {
          code: 'la',
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
        },
        {
          code: 'en',
        },
        {
          code: 'fr',
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
        },
        {
          code: 'en',
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
        },
        {
          code: 'sr',
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
        },
        {
          code: 'en',
        },
        {
          code: 'nr',
        },
        {
          code: 'st',
        },
        {
          code: 'ss',
        },
        {
          code: 'tn',
        },
        {
          code: 'ts',
        },
        {
          code: 've',
        },
        {
          code: 'xh',
        },
        {
          code: 'zu',
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
        },
        {
          code: 'sn',
        },
        {
          code: 'nd',
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
