// Language Service for managing translations
import { translations } from './translations.js';

class LanguageService {
    constructor() {
        this.currentLanguage = localStorage.getItem('preferred-language') || 'en';
        this.translations = translations;
        this.observers = new Set();
    }

    getCurrentLanguage() {
        return this.currentLanguage;
    }

    setLanguage(lang) {
        if (this.translations[lang]) {
            this.currentLanguage = lang;
            localStorage.setItem('preferred-language', lang);
            this.notifyObservers();
        }
    }

    toggleLanguage() {
        const newLang = this.currentLanguage === 'en' ? 'fr' : 'en';
        this.setLanguage(newLang);
    }

    translate(key) {
        return this.translations[this.currentLanguage][key] || key;
    }

    // Observer pattern for components to react to language changes
    subscribe(callback) {
        this.observers.add(callback);
    }

    unsubscribe(callback) {
        this.observers.delete(callback);
    }

    notifyObservers() {
        this.observers.forEach(callback => callback(this.currentLanguage));
    }
}

// Create and export a singleton instance
export const languageService = new LanguageService();