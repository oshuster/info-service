import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Info-service Yatax API',
      version: '1.0.0',
      description:
        'API для пошуку, створення, редагування та видалення професій.',
    },
    servers: [
      {
        url: 'http://localhost:3345/info-service',
        description: 'Development server',
      },
      {
        url: 'https://gdzapp.com/info-service',
        description: 'Production server',
      },
    ],
    components: {
      schemas: {
        Profession: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'Унікальний ідентифікатор професії',
              example: 1,
            },
            code_kp: {
              type: 'string',
              description: 'Код класифікації професії',
              example: '1234',
            },
            name: {
              type: 'string',
              description: 'Назва професії',
              example: 'Інженер',
            },
          },
        },
        Katotg: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'Унікальний ідентифікатор катотг',
              example: 1,
            },
            katotg: {
              type: 'string',
              description: 'IBAN',
              example: 'UA05120090012345678',
            },
            dps_name: {
              type: 'string',
              description: 'Назва ДПС',
              example: 'ФЛОРІАНІВКА',
            },
            adress: {
              type: 'string',
              description: 'Адреса',
              example:
                'село Флоріанівка Вінницька обл. Хмільницький район (Козятинська тергромада)',
            },
            dps_code: {
              type: 'string',
              description: 'Код ДПС',
              example: '234',
            },
          },
        },
        KVED: {
          type: 'object',
          properties: {
            id: {
              type: 'number',
              description: 'Унікальний ідентифікатор КВЕД',
              example: 1,
            },
            code: {
              type: 'string',
              description: 'Код КВЕД',
              example: '11.11',
            },
            name: {
              type: 'string',
              description: 'Опис виду діяльності',
              example: 'Виробництво електрообладнання',
            },
            description: {
              type: 'string',
              description: 'html markup',
              example: '<p>Виробництво електрообладнання</p>',
            },
            info: {
              type: 'string',
              description: 'Додтковий текст',
              example: 'Додаткова інформація',
            },
          },
        },
        EditKVED: {
          type: 'object',
          properties: {
            id: {
              type: 'number',
              description: 'ID запису КВЕД',
              example: 1,
            },
            code: {
              type: 'string',
              description: 'Новий код КВЕД',
              example: '56789',
            },
            name: {
              type: 'string',
              description: 'Новий опис діяльності',
              example: 'Роздрібна торгівля',
            },
            description: {
              type: 'string',
              description: 'html markup',
              example: '<p>Виробництво електрообладнання</p>',
            },
            info: {
              type: 'string',
              description: 'Додтковий текст',
              example: 'Додаткова інформація',
            },
          },
          required: ['id', 'code', 'name', 'description'],
        },
        TaxObject: {
          type: 'object',
          properties: {
            id: {
              type: 'number',
              description: 'Унікальний ідентифікатор обʼєкту',
              example: 1,
            },
            type: {
              type: 'string',
              description: 'Код обʼєкту',
              example: '123456',
            },
            name: {
              type: 'string',
              description: 'Назва обʼєкту',
              example: 'Адміністративний будинок',
            },
          },
        },
        EditTaxObject: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'ID обʼєкту',
              example: '1',
            },
            type: {
              type: 'string',
              description: 'Новий код обʼєкту',
              example: '654321',
            },
            name: {
              type: 'string',
              description: 'Нова назва обʼєкту',
              example: 'Житловий будинок',
            },
          },
          required: ['id', 'code', 'name'],
        },
      },
      responses: {
        ProfessionNotFound: {
          description: 'Професію не знайдено',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    example: 'Profession with ID not found',
                  },
                },
              },
            },
          },
        },
        ObjectNotFound: {
          description: 'Обʼєкт не знайдено',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    example: 'Object with ID:{id} not found',
                  },
                },
              },
            },
          },
        },
        ValidationError: {
          description: 'Помилка валідації даних',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  errors: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        field: { type: 'string', example: 'code_kp' },
                        message: {
                          type: 'string',
                          example: "Поле 'code_kp' обов'язкове",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        ValidationKvedError: {
          description: 'Помилка валідації даних',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  errors: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        field: { type: 'string', example: 'description' },
                        message: {
                          type: 'string',
                          example: "Поле 'description' обов'язкове",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        ValidationKatotgError: {
          description: 'Помилка валідації даних',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  errors: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        field: { type: 'string', example: 'dps_name' },
                        message: {
                          type: 'string',
                          example: "Поле 'dps_name' обов'язкове",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        ValidationTypeObjectsError: {
          description: 'Помилка валідації даних',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  errors: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        field: { type: 'string', example: 'type' },
                        message: {
                          type: 'string',
                          example: "Поле 'type' обов'язкове",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

export const swaggerDocs = (app, port) => {
  app.use(
    '/info-service/swagger-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
  );
  console.log(
    `Swagger Docs доступні за адресою: http://localhost:${port}/info-service/swagger-docs`
  );
};
