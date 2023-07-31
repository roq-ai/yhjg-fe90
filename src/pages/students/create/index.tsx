import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createStudent } from 'apiSdk/students';
import { studentValidationSchema } from 'validationSchema/students';
import { UserInterface } from 'interfaces/user';
import { getUsers } from 'apiSdk/users';
import { StudentInterface } from 'interfaces/student';

function StudentCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: StudentInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createStudent(values);
      resetForm();
      router.push('/students');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<StudentInterface>({
    initialValues: {
      name: '',
      attendance: false,
      health_record: '',
      academic_record: '',
      behavior_record: '',
      user_id: (router.query.user_id as string) ?? null,
    },
    validationSchema: studentValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Students',
              link: '/students',
            },
            {
              label: 'Create Student',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Student
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.name}
            label={'Name'}
            props={{
              name: 'name',
              placeholder: 'Name',
              value: formik.values?.name,
              onChange: formik.handleChange,
            }}
          />

          <FormControl
            id="attendance"
            display="flex"
            alignItems="center"
            mb="4"
            isInvalid={!!formik.errors?.attendance}
          >
            <FormLabel htmlFor="switch-attendance">Attendance</FormLabel>
            <Switch
              id="switch-attendance"
              name="attendance"
              onChange={formik.handleChange}
              value={formik.values?.attendance ? 1 : 0}
            />
            {formik.errors?.attendance && <FormErrorMessage>{formik.errors?.attendance}</FormErrorMessage>}
          </FormControl>

          <TextInput
            error={formik.errors.health_record}
            label={'Health Record'}
            props={{
              name: 'health_record',
              placeholder: 'Health Record',
              value: formik.values?.health_record,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.academic_record}
            label={'Academic Record'}
            props={{
              name: 'academic_record',
              placeholder: 'Academic Record',
              value: formik.values?.academic_record,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.behavior_record}
            label={'Behavior Record'}
            props={{
              name: 'behavior_record',
              placeholder: 'Behavior Record',
              value: formik.values?.behavior_record,
              onChange: formik.handleChange,
            }}
          />

          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            labelField={'email'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/students')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'student',
    operation: AccessOperationEnum.CREATE,
  }),
)(StudentCreatePage);
