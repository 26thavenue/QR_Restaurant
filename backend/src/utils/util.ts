import winston from 'winston';

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'src/logger/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'src/logger/combined.log' })
  ]
});

export function isValidDate(dateString:string) {
  const date = new Date(dateString);
  const isValid = !isNaN(date.getTime()) && dateString === date.toISOString().slice(0, 10);
  return isValid;
}

// const corsConfig = () => {
//   const allowedOrigins = *

//   const options = {
//     origin: (origin, callback) => {
//       if (!origin || allowedOrigins.indexOf(origin) !== -1) {
//         callback(null, true);  
//       } else {
//         callback(new Error('Not allowed by CORS'), false);  
//       }
//     },
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],  
//     allowedHeaders: ['Content-Type', 'Authorization'],  
//     credentials: true,  
//     preflightContinue: false,  
//     optionsSuccessStatus: 204 
//   };

//   return options;
// };

export const corsConfig = () => {
  const options = {
    origin: true,  // Allow all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204
  };

  return options;
};;