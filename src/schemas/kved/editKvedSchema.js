import * as yup from 'yup';

export const editKvedSchema = yup.object({
  id: yup.number().required("Поле 'id' обов'язкове"),
  code: yup
    .string()
    .required("Поле 'code' обов'язкове")
    .matches(
      /^\d{2}\.\d{2}$/,
      "Поле 'code' має бути у форматі XX.XX (дві цифри, крапка, дві цифри)"
    ),
  name: yup
    .string()
    .required("Поле 'name' обов'язкове")
    .max(255, "Поле 'name' має бути не більше 255 символів"),
  description: yup.string().required("Поле 'description' обов'язкове"),
  info: yup
    .string()
    .max(500, "Поле 'info' має бути не більше 500 символів")
    .nullable(),
});
