export const context = {
  registrationFields: [
    {
      label: 'Почта',
      type: 'email',
      name: 'email'
    },
    {
      label: 'Логин',
      type: 'text',
      name: 'login'
    },
    {
      label: 'Имя',
      type: 'text',
      name: 'first_name'
    },
    {
      label: 'Фамилия',
      type: 'text',
      name: 'second_name'
    },
    {
      label: 'Телефон',
      type: 'text',
      name: 'phone'
    },
    {
      label: 'Пароль',
      type: 'password',
      name: 'password'
    },
    {
      label: 'Пароль (еще раз)',
      type: 'password',
      name: 'password'
    }
  ],
  loginFields: [
    {
      label: 'Логин',
      type: 'email',
      name: 'login'
    },
    {
      label: 'Пароль',
      type: 'password',
      name: 'password'
    }
  ],
  profileFields: [
    {
      label: 'Почта',
      type: 'email',
      name: 'email',
      value: 'yandex@yandex.ru'
    },
    {
      label: 'Логин',
      type: 'email',
      name: 'login',
      value: 'sobachka'
    },
    {
      label: 'Имя',
      type: 'text',
      name: 'first_name',
      value: 'Andrew'
    },
    {
      label: 'Фамилия',
      type: 'text',
      name: 'second_name',
      value: 'Ivanov'
    },
    {
      label: 'Имя в чате',
      type: 'text',
      name: 'display_name',
      value: 'Avanov'
    },
    {
      label: 'Телефон',
      type: 'text',
      name: 'phone',
      value: '8954645645645'
    }
  ],
  profile: {
    name: 'Andrew'
  },
  messages: [
    {
      id: 1,
      name: 'Elena',
      message: 'Привет, купи хлеб',
      count: 2,
      time: '12:35'
    },
    {
      id: 2,
      name: 'Maxim',
      message: 'я забыл',
      count: 1,
      time: '14:35'
    },
    {
      id: 3,
      name: 'Marina',
      message: 'На работе полный завал',
      count: 0,
      time: '17:35'
    },
    {
      id: 4,
      name: 'Daria',
      message: 'Встретимся в субботу',
      count: 1,
      time: '19:35'
    },
    {
      id: 5,
      name: 'Elena',
      message: 'Привет, купи хлеб',
      count: 2,
      time: '12:35'
    },
    {
      id: 6,
      name: 'Maxim',
      message: 'я забыл',
      count: 1,
      time: '14:35'
    },
    {
      id: 1,
      name: 'Marina',
      message: 'На работе полный завал',
      count: 0,
      time: '17:35'
    },
    {
      id: 1,
      name: 'Daria',
      message: 'Встретимся в субботу',
      count: 1,
      time: '19:35'
    }
  ],
  dialog: {
    name: 'Ivan',
    messages: [
      {
        message: 'Hi!',
        time: '13:15',
        type: 'incoming'
      },
      {
        message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        time: '13:15',
        type: 'incoming'
      },
      {
        message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        time: '13:15',
        type: 'outcoming'
      },
      {
        message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        time: '13:15',
        type: 'incoming'
      }

    ]
  },
  error500: {
    code: '500',
    message: 'Уже фиксим',
    linkText: 'Вернуться обратно'
  },
  error404: {
    code: '400',
    message: 'Не туда попали',
    linkText: 'Вернуться обратно'
  }
};
