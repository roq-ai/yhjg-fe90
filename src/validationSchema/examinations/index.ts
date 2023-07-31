import * as yup from 'yup';

export const examinationValidationSchema = yup.object().shape({
  name: yup.string().required(),
  date: yup.date().nullable(),
  user_id: yup.string().nullable(),
});
