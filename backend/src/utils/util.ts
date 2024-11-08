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