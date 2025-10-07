const setSession = (access_token: string | null, refresh_token: string | null) => {
  if (access_token) {
    localStorage.setItem('access_token', access_token);
    if (refresh_token) localStorage.setItem('refresh_token', refresh_token);
  }
};

const removeSession = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
};

export {setSession, removeSession};

