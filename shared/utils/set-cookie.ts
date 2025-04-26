/**
 * Стандартная утилита для сохранения токена в куку document.cookie
 * @param name - уникальный ключ для сохранения куки
 * @param value - значение куки
 * @param props - опциональные свойства. Используемые: {expires: 0} - для удаления сохраненной куки
 */
export function setCookie(
  name: string,
  value: string,
  props?: Record<string, unknown>,
) {
  props = props || undefined;
  let exp = props?.expires;
  if (typeof exp == "number" && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props!.expires = d;
  }
  if (exp && (exp as Date).toUTCString) {
    props!.expires = (exp as Date).toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + "=" + value;
  for (const propName in props) {
    updatedCookie += "; " + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }
  document.cookie = updatedCookie;
}
