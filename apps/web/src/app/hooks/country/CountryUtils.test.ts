import { expect } from '@playwright/test'
import { describe, it } from 'vitest'
import {
  defaultLanguage,
  defaultLocale,
  generateSearchIndex,
  supportedLanguageCodes,
  toCountryDictionary,
  toLanguageList,
} from './CountryUtils'

describe('CountryUtils', () => {
  describe('supportedLanguageCodes', () => {
    it('should return an array of supported language codes', () => {
      expect(supportedLanguageCodes).toBeInstanceOf(Array)
      expect(supportedLanguageCodes.length).toBeGreaterThan(0)
    })
  })

  describe('defaultLanguage', () => {
    it('should return the default language code', () => {
      expect(defaultLanguage).toBe('en')
    })
  })

  describe('defaultLocale', () => {
    it('should return the default locale code', () => {
      expect(defaultLocale).toBe('en-US')
    })
  })

  describe('generateSearchIndex', () => {
    it('should return a search index string for a given country and language code', () => {
      const country = {
        code: 'US',
        name: 'United States',
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
      }
      const languageCode = 'en'
      const expectedSearchIndex = 'en-US:united states:United States:english:English'
      expect(generateSearchIndex(country, languageCode)).toBe(expectedSearchIndex)
    })
  })

  describe('toCountryDictionary', () => {
    it('should return a country dictionary object with supported languages', () => {
      const countries = [
        {
          code: 'US',
          name: 'United States',
          native: 'United States',
          emoji: '🇺🇸',
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
        },
        {
          code: 'CA',
          name: 'Canada',
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
        },
      ]
      const expectedLanguageCodes = ['en-US', 'en-CA', 'es-US', 'fr-CA']
      const expectedCountryDictionary = {
        ar: [],
        de: [],
        el: [],
        en: [
          {
            searchTags: 'en-US:united states:United States:english:English',
            locale: 'en-US',
            code: 'US',
            language: {
              code: 'en',
              name: 'English',
              native: 'English',
              rtl: false,
            },
            name: 'United States',
            native: 'United States',
            emoji: '🇺🇸',
          },
          {
            searchTags: 'en-CA:canada:Canada:english:English',
            locale: 'en-CA',
            code: 'CA',
            language: {
              code: 'en',
              name: 'English',
              native: 'English',
              rtl: false,
            },
            name: 'Canada',
            native: 'Canada',
            emoji: '🇨🇦',
          },
        ],
        fa: [],
        es: [
          {
            searchTags: 'es-US:united states:United States:spanish:Español',
            locale: 'es-US',
            code: 'US',
            language: {
              code: 'es',
              name: 'Spanish',
              native: 'Español',
              rtl: false,
            },
            name: 'United States',
            native: 'United States',
            emoji: '🇺🇸',
          },
        ],
        fr: [
          {
            searchTags: 'fr-CA:canada:Canada:french:Français',
            locale: 'fr-CA',
            code: 'CA',
            language: {
              code: 'fr',
              name: 'French',
              native: 'Français',
              rtl: false,
            },
            name: 'Canada',
            native: 'Canada',
            emoji: '🇨🇦',
          },
        ],
        hi: [],
        it: [],
        ja: [],
        ko: [],
        mk: [],
        nl: [],
        pt: [],
        si: [],
        ta: [],
        zh: [],
      }
      expect(toCountryDictionary(countries)).toEqual({
        record: expectedCountryDictionary,
        codes: expectedLanguageCodes,
      })
    })
  })

  describe('toLanguageList', () => {
    it('should return a language list object with supported languages', () => {
      const languages = [
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
        {
          code: 'fr',
          name: 'French',
          native: 'Français',
          rtl: false,
        },
      ]
      const expectedLanguageList = [
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
        {
          code: 'fr',
          name: 'French',
          native: 'Français',
          rtl: false,
        },
      ]
      expect(toLanguageList(languages)).toEqual(expectedLanguageList)
    })
  })
})
