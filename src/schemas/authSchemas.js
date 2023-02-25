import Joi from "joi";

const authSchemas = {
  signUpSchema: Joi.object({
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
  })
};

export default authSchemas;