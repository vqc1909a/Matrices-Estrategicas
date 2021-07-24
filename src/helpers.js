export const redondearDecimalPuro = (numero) => parseFloat(numero.toFixed(15).replace(/\.?0+$/, ''))
