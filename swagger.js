import { serve, setup } from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import 'dotenv/config';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Portfolio API',
      version: '1.0.0',
      description: 'APIs to support the portfolio page of Damyant Jain',
    },
    servers: [
      {
        url: process.env.API_URL,
      },
    ],
  },
  apis: ['./Portfolio/*/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

export default function swagger(app) {
  app.use('/portfolioapi', serve, setup(swaggerSpec));
}
