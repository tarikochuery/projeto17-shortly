import Joi from "joi";

const authSchemas = {
  signUp: Joi.object({
    name: Joi.string()
      .required(),
    email: Joi.string()
      .required()
      .email(),
    password: Joi.string()
      .required()
      .min(6),
    confirmPassword: Joi.string()
      .required()
      .valid(Joi.ref('password'))
  }),
  signIn: Joi.object({
    email: Joi.string()
      .required()
      .email(),
    password: Joi.string()
      .required()
  })
};

export default authSchemas;