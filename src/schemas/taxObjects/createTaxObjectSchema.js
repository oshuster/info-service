import * as yup from 'yup';

export const createTaxObjectSchema = yup.object({
  type: yup
    .string()
    .required("Поле 'type' обов'язкове")
    .matches(
      /^[0-9]{1,10}$/,
      "Поле 'type' має бути числовим рядком довжиною до 10 символів"
    ),
  name: yup
    .string()
    .required("Поле 'name' обов'язкове")
    .max(255, "Поле 'name' має бути не більше 255 символів"),
});
