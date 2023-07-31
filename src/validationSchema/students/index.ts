import * as yup from 'yup';

export const studentValidationSchema = yup.object().shape({
  name: yup.string().required(),
  attendance: yup.boolean().nullable(),
  health_record: yup.string().nullable(),
  academic_record: yup.string().nullable(),
  behavior_record: yup.string().nullable(),
  user_id: yup.string().nullable(),
});
