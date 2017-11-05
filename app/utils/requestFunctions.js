import request from 'request';

const tempToken = 'Bearer 7Hz22x4A7yFGOI4fpiwVMCI8HjSrnXquFqkca7JSYFgMkB2uTuhXqdopqx1Qm5yrkS6lfqafwXH76hv9e3fyLfEGCEQwrXwi8WIGW53oIxu3zVsX77En2QglhVcw03FFCXQfRt1m7X3r4EtAvJfCECBVg8R2nK1BnY86tul3yAe9VZZBtXAKdmfnQEOFvVQigGnutMJ8z5X32PlECJmB3B5etPjr0FWYoZ01LGrDIP8xa6FUpDtFLkCIsQ8yL5rH';

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

export function get(type, cb, id = false, token = tempToken) {
  let url = getUrl(type);

  if (id) { url += `/${id}`; }
  request.get({
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      Authorization: token
    },
    url
  }, cb);
}

export function post(type, cb, formData, token = tempToken) {
  const url = getUrl(type);
  request.post({
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      Authorization: token
    },
    url,
    form: formData
  }, cb);
}

export function put(type, cb, formData, id, token = tempToken) {
  const url = `${getUrl(type)}/${id}`;
  request({
    url,
    method: 'PUT',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      Authorization: token
    },
    form: formData
  }, cb);
}
