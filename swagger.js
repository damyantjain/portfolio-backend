import { serve, setup } from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'My REST API',
    },
    servers: [
      {
        url: 'http://localhost:4000',
      },
    ],
  },
  apis: ['./Portfolio/*/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

export default function swagger(app) {
  app.use('/api-docs', serve, setup(swaggerSpec));
}
