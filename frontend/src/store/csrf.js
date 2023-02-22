// fetch session show to get current user and csrf token
export const restoreSession = async () => {
  let res = await fetch('/api/session');
  let token = res.headers.get('X-CSRF-Token');
  sessionStorage.setItem('X-CSRF-Token', token);
  let data = await res.json();
  sessionStorage.setItem('currentUser', JSON.stringify(data.user));
  // debugger;
};

// This will replace any fetch that needs a csrf token
export const csrfFetch = async (url, options = {}) => {
  options.method ||= 'GET';
  options.headers ||= {};

  if (options.method.toUpperCase() !== 'GET') {
    options.headers['Content-Type'] = 'application/json';
    options.headers['X-CSRF-Token'] =
      sessionStorage.getItem('X-CSRF-Token');
  }
  // debugger;
  const res = await fetch(url, options);
  if (res.status >= 400) throw res;
  return res;
};
