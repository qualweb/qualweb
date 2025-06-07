import localeCurrency from 'locale-currency';

function getCurrencyByLocale(locale: string): string | null {
  const currency = localeCurrency.getCurrency(locale);
  return currency;
}
export interface CurrencyInfo {
  code: string;
  name: string;
  symbol: string;
}
export function getCurrencyInfo(locale: string): CurrencyInfo | null {
  const currencyCode = getCurrencyByLocale(locale);
  if (!currencyCode) {
    return null;
  }
  try {
    const parts = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currencyCode,
      currencyDisplay: 'name'
    }).formatToParts(0);

    let currencyName = '';
    for (const part of parts) {
      if (part.type === 'currency') {
        currencyName = part.value;
        break;
      }
    }

    // Tentar extrair o símbolo da moeda
    const partsSymbol = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currencyCode
    }).formatToParts(0);

    let currencySymbol = '';
    for (const part of partsSymbol) {
      if (part.type === 'currency') {
        currencySymbol = part.value;
        break;
      }
    }

    return {
      code: currencyCode,
      name: currencyName,
      symbol: currencySymbol
    };
  } catch (error) {
    console.error(`Erro ao obter informações da moeda para ${locale} e ${currencyCode}:`, error);
    return null;
  }
}
