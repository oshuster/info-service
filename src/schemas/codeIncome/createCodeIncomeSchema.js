import * as yup from 'yup';

export const createCodeIncomeSchema = yup.object({
  code: yup.number().required("Поле 'code' обов'язкове"),
  name: yup
    .string()
    .required("Поле 'name' обов'язкове")
    .max(300, "Поле 'name' має бути не більше 300 символів"),
});