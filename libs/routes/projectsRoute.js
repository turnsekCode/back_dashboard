import Task from "../models/task.model.js";

export const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate("user");
    if (!task) return res.status(404).json({ message: "Tarea no encontrada" });
    res.json(task);
  } catch (error) {
    return res.status(404).json({ message: "Tarea no encontrada" });
  }
};

export const getTaskSlug = async (req, res) => {
 // console.log("slug", req)
  try {
    // Busca la tarea por el campo slug en lugar de la id
    const task = await Task.findOne({ slug: req.params.slug });

    if (!task) {
      // Si no se encuentra ninguna tarea con ese slug, devuelve un error 404
      return res.status(404).json({ message: "Tarea por slug no encontrada" });
    }

    // Si se encuentra la tarea, devuelve la tarea encontrada
    res.json(task);
  } catch (error) {
    // Si ocurre algún error durante la búsqueda, devuelve un error 500
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};






