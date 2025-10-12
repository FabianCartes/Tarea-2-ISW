import Joi from "joi";

export const userBodyValidation = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .max(255)
    .required()
    .messages({
      "string.email": "El formato del correo electronico no es valido",
      "string.empty": "El correo electronico es obligatorio",
      "any.required": "El correo electronico es obligatorio",
    }),

  password: Joi.string()
    .min(4)
    .max(16)
    .required()
    .messages({
      "string.min": "La contraseña debe tener al menos 4 caracteres",
      "string.max": "La contraseña no puede superar los 16 caracteres",
      "string.empty": "La contraseña es obligatoria",
      "any.required": "La contraseña es obligatoria",
    }),
})
.options({
  allowUnknown: false, // campos que no sean los del entity
  stripUnknown: true,  // elimina campos no correspondientes
  abortEarly: false,  
});
