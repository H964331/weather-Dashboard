export const isValidCityName = (city) => {
  return typeof city === 'string' && city.trim().length > 0;
};

export const celsiusToFahrenheit = (celsius) => (celsius * 9) / 5 + 32;

export const formatDate = (date = new Date()) => date.toISOString().split('T')[0];
