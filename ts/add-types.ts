export const parseJSONSafe = <T>(obj: string, fallback: T): T => {
  try {
    return JSON.parse(obj) as T;
  } catch (e: any) {
    return fallback as T;
  }
};

type SymbolRegisterOptions = {
  string: string;
  register: 'up' | 'down';
  position: 'first' | 'end';
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

enum MouseEventType {
  click = 'click'
}

document.addEventListener(MouseEventType.click, (event: MouseEvent) => {
  console.log(event.target);
});

const fetchWrapper = (
  url: Parameters<typeof fetch>[0],
  headers?: Parameters<typeof fetch>[1]['headers'],
  method?: Parameters<typeof fetch>[1]['method'],
  options?: Parameters<typeof fetch>[1],
) => {
  return fetch(url, {
    ...options,
    headers,
    method,
  });
}
