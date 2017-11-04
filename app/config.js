module.exports = {
  oauth: {
    clientId: 'guy',
    clientSecret: '123',
    authorizationUrl: 'http://localhost:8080/api/oauth2/authorize',
    tokenUrl: 'http://localhost:8080/api/oauth2/token',
    useBasicAuthorizationHeader: true,
    redirectUri: 'http://localhost:8080'
  },
  user: {
    username: 'marius',
    password: '123'
  }
};
