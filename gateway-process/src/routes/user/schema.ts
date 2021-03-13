import Joi from "@hapi/joi";

export default {
  userId: Joi.object({
    id: Joi.string().required(),
  }),

  userSchema: Joi.object({
    id: Joi.string().required(),
    name: Joi.string(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    group: Joi.number().integer(),
  }),
};
