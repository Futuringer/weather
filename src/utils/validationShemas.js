export const RegisterAndLoginSchema = (yup) => {
  return yup.object().shape({
    username: yup
      .string()
      .required('Имя пользователя обязательно')
      .min(3, 'Имя пользователя должно содержать минимум 3 символа'),
    password: yup.string().required('Пароль обязателен').min(6, 'Пароль должен содержать минимум 6 символов'),
  });
};
