// export const cleanField = (field) => {
//   return field ? field.toString().trim() : null;
// };

export const cleanField = (value) => {
  if (typeof value !== 'string') return value;
  return value.replace(/^"|"$/g, '').trim();
};
