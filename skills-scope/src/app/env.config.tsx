const baseUrl = process.env.NODE_ENV === 'development'
  ? 'http://localhost:5277'
  : 'https://skillsscope-backend.azurewebsites.net';

export default baseUrl;