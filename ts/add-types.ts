export const parseJSONSafe = (obj: string, fallback: string): string => {
  try {
    return JSON.parse(obj);
  } catch (e: any) {
    return fallback;
  }
};

type SymbolRegisterOptions = {
  string: string; 
  register: string;
  position: string;
};

export const changeSymbolRegister = (params: SymbolRegisterOptions): string => {
  const {
    string,
    register = 'up',
    position = 'first',
  } = params;

  if (typeof string !== 'string' || string.trim().length < 1) {
    return '';
  }

  const transform = (str: string) => (
    register === 'up'
      ? str.toUpperCase()
      : str.toLowerCase()
  );

  return position === 'first'
    ? `${transform(string[0])}${string.slice(1)}`
    : `${string.slice(0, string.length - 2)}${transform(string[string.length - 1])}`;
};

document.addEventListener('click', (event: MouseEvent) => {
  console.log(event.target);
});


const fetchWrapper = (url: string, headers: any, method: string, options: string[]) => {
  return fetch(url, {
    ...options,
    headers,
    method,
  });
}