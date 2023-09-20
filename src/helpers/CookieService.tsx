export function saveTokenToCookie(resToken: string) {
  // console.log('AUTH_TOKEN:::', resToken);
  // localStorage.setItem('AUTH_TOKEN', resToken);

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(1, 0, 0, 0);

  document.cookie = `hexschoolTodo=${resToken}; expires=${tomorrow.toUTCString()}`;
}
// end of saveTokenToCookie(resToken)

export function removeTokenFromCookie() {
  document.cookie =
    'hexschoolTodo=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
}
// end of removeTokenFromCookie()

export function getTokenFromCookie() {
  return (
    document.cookie
      .split('; ')
      .find((row) => row.startsWith('hexschoolTodo='))
      ?.split('=')[1] || ''
  );
}
// end of getTokenFromCookie()
