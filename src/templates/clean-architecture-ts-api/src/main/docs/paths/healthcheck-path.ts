export const helthcheckPath = {
  get: {
    tags: ['Helth Check'],
    summary: 'API use to validate the status of a microservice and its dependencies',
    description: 'A health check can assess anything that a microservice needs, including dependencies, system properties, database connections, endpoint connections, and resource availability',
    requestBody: {
      required: false,
      content: {
        'application/json': {
          schema: {
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Ok',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/healthCheckOutput',
            },
          },
        },
      },
      400: {
        $ref: '#/components/badRequest',
      },
      401: {
        $ref: '#/components/unauthorized',
      },
      404: {
        $ref: '#/components/notFound',
      },
      500: {
        $ref: '#/components/serverError',
      },
    },
  },
};
