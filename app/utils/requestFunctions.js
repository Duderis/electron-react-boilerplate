import request from 'request';

const tempToken = 'Bearer 7Hz22x4A7yFGOI4fpiwVMCI8HjSrnXquFqkca7JSYFgMkB2uTuhXqdopqx1Qm5yrkS6lfqafwXH76hv9e3fyLfEGCEQwrXwi8WIGW53oIxu3zVsX77En2QglhVcw03FFCXQfRt1m7X3r4EtAvJfCECBVg8R2nK1BnY86tul3yAe9VZZBtXAKdmfnQEOFvVQigGnutMJ8z5X32PlECJmB3B5etPjr0FWYoZ01LGrDIP8xa6FUpDtFLkCIsQ8yL5rH';

export function get(type,cb,id=false,token = tempToken){
  let url = '';
  switch(type){
    case 'team':
      url = 'http://localhost:8080/api/teams';
      break;
    case 'task':
      url = 'http://localhost:8080/api/tasks';
      break;
    case 'board':
      url = 'http://localhost:8080/api/boards';
      break;
    case 'lane':
      url = 'http://localhost:8080/api/swimlanes';
      break;
    case 'user':
      url = 'http://localhost:8080/api/users';
      break;
  }
  if(id)
    url += '/' + id;
  request.get({
    headers:{
      'content-type':'application/x-www-form-urlencoded',
      'Authorization' : tempToken
    },
    url: url
  },cb)
}
