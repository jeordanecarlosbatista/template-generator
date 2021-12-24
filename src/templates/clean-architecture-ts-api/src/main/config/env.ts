require('dotenv').config();

export default {
  jwtSecret: process.env.JWT_SECRET || 'api',
  port: process.env.PORT || 3333,
};
