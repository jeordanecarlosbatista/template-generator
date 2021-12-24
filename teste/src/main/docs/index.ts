import components from './components';
import paths from './paths';
import schemas from './schemas';

export default {
  openapi: '3.0.0',
  info: {
    title: 'API Restfull',
    description: 'Essa é a documentação da API',
    version: '1.0.0',
    contact: {
      name: '',
      email: '',
      url: '',
    },
    license: {
      name: '',
      url: '',
    },
  },
  externalDocs: {
    description: '',
    url: '',
  },
  servers: [{
    url: '/api',
    description: 'Main Server',
  }],
  tags: [{
    name: 'HealthCheck',
    description: 'APIs relacionadas a HealthCheck',
  }],
  paths,
  schemas,
  components,
};
