# Reflexión sobre el código

## 1. ¿Por qué es mejor tener el controlador separado de las rutas?

Porque permite separar responsabilidades:

- El **router** define las rutas (endpoints)
- El **controller** contiene la lógica de cada endpoint

Ventajas:
- Código más limpio y organizado
- Más fácil de mantener
- Más fácil de escalar
- Permite reutilizar lógica
- Facilita el testing

Si todo está en un solo archivo, el código se vuelve difícil de leer y mantener.

---

## 2. Si mañana quisieras cambiar los datos en memoria por PostgreSQL, ¿en qué archivo harías el cambio?

Principalmente en:
** src/data/peliculas.js


Porque ese archivo se encarga del acceso a datos.

- Actualmente usa arrays en memoria
- Podría cambiarse por consultas a una base de datos (SQL)

El resto del código (controllers y rutas) no tendría que cambiar, o muy poco.

## 3. ¿Qué pasaría si en el router tuvieras /:id antes que /:id/resenas?

Express evalúa las rutas en orden.

Si se define primero /:id y después /:id/resenas, cuando se haga una petición a:

/api/peliculas/1/resenas

Express interpretará que el id es "1/resenas" y entrará en la ruta incorrecta.

Esto provocará errores, normalmente un 404, porque no encontrará la película.

---

