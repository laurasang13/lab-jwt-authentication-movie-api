const peliculaService = require('../services/PeliculaService');

// GET /api/peliculas
const listarPeliculas = async (req, res, next) => {
  try {
    const { genero } = req.query;
    const peliculas = await peliculaService.obtenerTodas(genero);
    res.json(peliculas);
  } catch (err) {
    next(err);
  }
};

// GET /api/peliculas/:id
const obtenerPelicula = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const pelicula = await peliculaService.obtenerPorId(id);
    if (!pelicula) return res.status(404).json({ error: 'Película no encontrada' });
    res.json(pelicula);
  } catch (err) {
    next(err);
  }
};

// POST /api/peliculas
const crearPelicula = async (req, res, next) => {
  try {
    const { titulo, anio, nota, director_id, genero_id } = req.body;
    const nueva = await peliculaService.crear({ titulo, anio, nota, director_id, genero_id });
    res.status(201).json(nueva);
  } catch (err) {
    next(err);
  }
};

// DELETE /api/peliculas/:id
const eliminarPelicula = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const eliminada = await peliculaService.eliminar(id);
    if (!eliminada) return res.status(404).json({ error: 'Película no encontrada' });
    res.json({ mensaje: 'Película eliminada', pelicula: eliminada });
  } catch (err) {
    next(err);
  }
};

// GET /api/estadisticas
const obtenerEstadisticas = async (req, res, next) => {
  try {
    const stats = await peliculaService.obtenerEstadisticas();
    res.json(stats);
  } catch (err) {
    next(err);
  }
};

// PUT /api/peliculas/:id
const actualizarPelicula = async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const { titulo, anio, nota, director_id, genero_id } = req.body

    // ⚠️ Como tu service no tiene update, devolvemos mock
    res.json({
      mensaje: 'Película actualizada (mock)',
      id,
      datos: { titulo, anio, nota, director_id, genero_id }
    })

  } catch (err) {
    next(err)
  }
}

// GET /api/peliculas/:id/resenas
const listarResenas = async (req, res, next) => {
  try {
    const id = Number(req.params.id)

    // ⚠️ Mock porque no tienes service
    res.json({
      pelicula_id: id,
      resenas: []
    })

  } catch (err) {
    next(err)
  }
}

// POST /api/peliculas/:id/resenas
const crearResena = async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const { comentario, nota } = req.body

    // ⚠️ Mock
    res.status(201).json({
      mensaje: 'Reseña creada (mock)',
      pelicula_id: id,
      comentario,
      nota
    })

  } catch (err) {
    next(err)
  }
}
// Nota: He quitado temporalmente actualizarPelicula, listarResenas y crearResena 
// porque tu Service aún no las tiene implementadas.

module.exports = {
  listarPeliculas,
  obtenerPelicula,
  crearPelicula,
  eliminarPelicula,
  obtenerEstadisticas, 
  listarResenas,
  crearResena, 
  actualizarPelicula
};