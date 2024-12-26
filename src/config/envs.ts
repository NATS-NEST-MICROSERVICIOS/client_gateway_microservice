import 'dotenv/config';
import * as joi from 'joi';

/////validar datos con joi
const envVarsSchema = joi
  .object({
    PORT: joi.number().default(3002),
    NATS_SERVERS: joi.array().items(joi.string()).required(),
  })
  .unknown(true);

const { error, value: envVars } = envVarsSchema.validate({
  ...process.env,
  NATS_SERVERS: process.env.NATS_SERVERS?.split(','),
});
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

////valida variables de entorno
export const envs = {
  port: envVars.PORT,
  natsServers: envVars.NATS_SERVERS,
};
