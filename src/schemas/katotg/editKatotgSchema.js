import * as yup from 'yup';

export const editKatotgSchema = yup.object({
  id: yup.number().required("Поле 'id' обов'язкове"),
  katotg: yup
    .string()
    .required("Поле 'katotg' обов'язкове")
    .max(50, "Поле 'katotg' має бути не більше 50 символів"),
  dps_name: yup
    .string()
    .required("Поле 'dps_name' обов'язкове")
    .max(255, "Поле 'dps_name' має бути не більше 255 символів"),
  adress: yup
    .string()
    .required("Поле 'adress' обов'язкове")
    .max(255, "Поле 'adress' має бути не більше 255 символів"),
  dps_code: yup
    .string()
    .required("Поле 'dps_code' обов'язкове")
    .matches(
      /^[0-9]{1,10}$/,
      "Поле 'dps_code' має бути числовим рядком довжиною до 10 символів"
    ),
});
