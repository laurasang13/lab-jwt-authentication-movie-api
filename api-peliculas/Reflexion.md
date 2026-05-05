# Reflexión — Autenticación JWT

## 1. ¿Por qué el mensaje de error del login debe ser genérico?

Usar un mensaje genérico como "Credenciales incorrectas" es una medida de seguridad fundamental.

Si el sistema indicara específicamente si el error está en el email o en la contraseña, un atacante podría utilizar esa información para identificar qué usuarios existen en el sistema. Esto se conoce como enumeración de usuarios y facilita ataques como fuerza bruta o phishing dirigido.

En cambio, un mensaje genérico no revela información sensible y dificulta que un atacante pueda validar datos parcialmente correctos.

En resumen, no se deben dar pistas sobre qué parte de la autenticación ha fallado.

---

## 2. ¿Qué información NO debería guardarse en el payload del JWT?

El payload de un JWT no está cifrado, solo está firmado. Esto significa que cualquier persona que tenga el token puede decodificarlo fácilmente.

Por ello, nunca se debe incluir información sensible como:

- Contraseñas
- Hashes de contraseñas
- Datos personales sensibles (DNI, tarjetas, direcciones)
- Información interna del sistema

En su lugar, el JWT debe contener únicamente la información mínima necesaria para identificar al usuario, como:

- id del usuario
- email (opcional)
- rol

La regla general es no incluir nada que no quisieras que un tercero pudiera ver.

---

## 3. ¿Por qué usamos bcrypt.compare en lugar de hashear y comparar con ===?

bcrypt utiliza un sistema de hashing con salt, lo que significa que cada vez que se hashea una misma contraseña, el resultado es diferente.

Por ejemplo, la misma contraseña puede generar hashes distintos en cada ejecución.

Por esta razón, no es posible comparar directamente dos hashes con ===.

bcrypt.compare resuelve este problema extrayendo el salt del hash almacenado y aplicando el mismo proceso internamente para verificar si la contraseña es correcta.

Además, está diseñado para ser seguro frente a ataques de tipo timing.

En conclusión, bcrypt.compare es la forma correcta y segura de validar contraseñas.
