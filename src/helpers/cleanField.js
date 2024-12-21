// export const cleanField = (field) => {
//   return field ? field.toString().trim() : null;
// };

export const cleanField = (value) => {
  if (typeof value !== 'string') return value; // Повертаємо значення, якщо це не рядок
  return value.replace(/^"|"$/g, '').trim(); // Видаляємо лапки на початку і в кінці, а також зайві пробіли
};
