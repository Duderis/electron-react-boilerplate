import request from 'request';

const getUrl = (type) => {
  switch (type) {
    case 'team':
      return 'http://localhost:8080/api/teams';
    case 'task':
      return 'http://localhost:8080/api/tasks';
    case 'board':
      return 'http://localhost:8080/api/boards';
    case 'lane':
      return 'http://localhost:8080/api/swimlanes';
    case 'user':
      return 'http://localhost:8080/api/users';
    case 'client':
      return 'http://localhost:8080/api/clients';
    default:
      return '';
  }
};

export function get(type, cb, id = false, token) {
  let url = getUrl(type);
  if (id !== false) { url = `${url}/${id}`; }
  request.get({
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${token}`
    },
    url
  }, cb);
}

export function post(type, cb, formData, token) {
  const url = getUrl(type);
  request.post({
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${token}`
    },
    url,
    form: formData
  }, cb);
}

export function put(type, cb, formData, id, token) {
  const url = `${getUrl(type)}/${id}`;
  request({
    url,
    method: 'PUT',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${token}`
    },
    form: formData
  }, cb);
}
