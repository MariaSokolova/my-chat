export const SET_NAME = 'SET_NAME';
export const SET_SOCKET = 'SET_SOCKET';

export function setName(name) {
  return {
    type: SET_NAME,
    payload: name,
  }
}

export function setSocket(socket) {
  return {
    type: SET_SOCKET,
    payload: socket,
  }
}

