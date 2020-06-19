export const arrayToObject = (array, property = "_id") =>
  array.reduce(
    (ant, act) => ({
      ...ant,
      [act[property]]: act,
    }),
    {}
  );

export const pesosToCentavos = (pesos) => (pesos === 0 ? pesos : pesos * 100);

export const centavosToPesos = (centavos) =>
  centavos === 0 ? centavos : centavos / 100;

export const formatDate = (date) => date.slice(0, 10).replace(/-/g, "/");

export const formatHour = (date) => date.slice(11, 16);
