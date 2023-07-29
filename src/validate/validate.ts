export interface AuthFieldsProps {
  first_name: string
  second_name: string
  email: string
  password: string
  login: string
  phone: string
}

export const registrationValid = (fields: AuthFieldsProps): boolean => {
  return Boolean(validate(fields.login, 'login') && validate(fields.password, 'password') &&
        validate(fields.first_name, 'name') && validate(fields.second_name, 'name') &&
        validate(fields.email, 'email') && validate(fields.phone, 'phone'));
};

export const isLoginValid = (fields: AuthFieldsProps): boolean => {
  return Boolean(validate(fields.login, 'login') && validate(fields.password, 'password'));
};

export const profileValid = (fields: AuthFieldsProps): boolean => {
  return Boolean(validate(fields.login, 'login') && validate(fields.password, 'password') &&
        validate(fields.first_name, 'name') && validate(fields.second_name, 'name') &&
        validate(fields.email, 'email'));
};

export const isValid = (type: string) => {
  let regExp;
  let errorMsg;

  switch (type) {
    case 'email':
      regExp = /^[-\w.]+@([A-z0-9][-A-z0-9]+.)+[A-z]{2,4}$/;
      errorMsg = 'Введите корректный email';
      break;
    case 'login':
      regExp = /^[a-zA-Z][a-zA-Z0-9-_.]{2,20}$/;
      errorMsg = 'Логин должен содержать от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание';
      break;
    case 'password':
      regExp = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/;
      errorMsg = 'От 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра.';
      break;
    case 'phone':
      regExp = /^[+|0-9][0-9]{9,15}$/;
      errorMsg = 'От 10 до 15 символов, состоит из цифр, может начинается с плюса.';
      break;
    case 'name':
      regExp = /^[A-ZА-Я][a-zа-яA-ZА-Я-.]{1,}$/;
      errorMsg = 'Латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис).';
      break;
    case 'message':
      regExp = /^\w{1,}/;
      errorMsg = 'Сообщение не может быть пустым';
      break;
    case 'displayName':
      regExp = /^\w{1,}/;
      errorMsg = 'Поле не может быть пустым';
      break;
  }
  return { regExp, errorMsg };
};

export const validate = (event: string | FocusEvent, type: string) => {
  const value: string = (typeof event === 'object' ? (event['target'] as HTMLInputElement).value : event) as string;

  if (!value) {
    return;
  }

  const { regExp, errorMsg } = isValid(type);

  if (regExp?.test(value)) {
    return true;
  }
  if (event instanceof FocusEvent) {
    const target = event.target as HTMLInputElement;
    target.setCustomValidity(errorMsg ?? '');
    target.reportValidity();
  }
  return false;
};
