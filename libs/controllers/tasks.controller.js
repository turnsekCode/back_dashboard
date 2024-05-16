import Task from "../models/task.model.js";
import { uploadImage, deleteImage } from "../libs/cloudinary.js";
import fs from "fs-extra";

export const createTask = async (req, res) => {
  // console.log(req.body)
  try {
    const {
      title,
      slug,
      categorie,
      title_h1,
      description_p_1,
      description_p_2,
      description_p_3,
      url_web,
      description,
      date,
    } = req.body;
    let images = [];
    // Verifica si se han enviado imágenes
    if (req.files && req.files.image) {
      // Itera sobre las claves del objeto 'image'
      const imageFiles = Array.isArray(req.files.image)
        ? req.files.image
        : [req.files.image]; // Si hay más de una imagen, las convierte en un array
      for (const imageFile of imageFiles) {
        const result = await uploadImage(imageFile.tempFilePath);
        await fs.remove(imageFile.tempFilePath);
        images.push({
          url: result.secure_url,
          public_id: result.public_id,
        });
      }
    }
    const newTask = new Task({
      title,
      slug,
      categorie,
      title_h1,
      description_p_1,
      description_p_2,
      description_p_3,
      url_web,
      description,
      date,
      images,
      //user: req.user.id,
    });
    const savedTask = await newTask.save();
    res.json(savedTask);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Algo fue mal en la creacion de tarea" });
  }
};

export const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Tarea no encontrada" });
    res.json(task);
  } catch (error) {
    return res.status(404).json({ message: "Tarea no encontrada" });
  }
};

export const getTaskSlug = async (req, res) => {
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

export const getAllTasks = async (req, res) => {
  try {
    // Busca todas las tareas en la colección
    const tasks = await Task.find();

    // Devuelve todas las tareas encontradas en formato JSON
    res.json(tasks);
  } catch (error) {
    // Si ocurre algún error, devuelve un error 500 con un mensaje
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const updateTask = async (req, res) => {
  console.log("update", req.params);
  try {
    const { id } = req.params;
    const {
      title,
      slug,
      categorie,
      title_h1,
      description_p_1,
      description_p_2,
      description_p_3,
      url_web,
      description,
      date,
    } = req.body;
    let images = []; // Array para almacenar las nuevas imágenes
    // Verifica si se ha enviado una nueva imagen
    if (req.files && req.files.image) {
      // Elimina las imágenes existentes
      const task = await Task.findById(id);
      for (const image of task.images) {
        await deleteImage(image.public_id);
      }
      // Sube las nuevas imágenes al sistema de almacenamiento y guarda sus URLs y public_ids
      const imageFiles = Array.isArray(req.files.image)
        ? req.files.image
        : [req.files.image]; // Si hay más de una imagen, las convierte en un array
      for (const imageFile of imageFiles) {
        const result = await uploadImage(imageFile.tempFilePath);
        await fs.remove(imageFile.tempFilePath);
        images.push({
          url: result.secure_url,
          public_id: result.public_id,
        });
      }
    }
    const task = await Task.findById(id);
    // Actualiza los demás campos de la tarea
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      {
        title: title || task.title,
        slug: slug || task.slug,
        categorie: categorie || task.categorie,
        title_h1: title_h1 || task.title_h1,
        description_p_1: description_p_1 || task.description_p_1,
        description_p_2: description_p_2 || task.description_p_2,
        description_p_3: description_p_3 || task.description_p_3,
        url_web: url_web || task.url_web,
        description: description || task.description,
        date: date || task.date,
        images: images, // Actualiza las imágenes en la tarea
      },
      { new: true } // Devuelve el documento actualizado
    );
    res.json(updatedTask);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Algo fue mal en la actualización de tarea" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Task.findByIdAndDelete(id);
    if (post) {
      // Eliminar todas las imágenes asociadas al post
      if (post.images.length > 0) {
        for (const image of post.images) {
          await deleteImage(image.public_id);
        }
      }
      if (!post) return res.sendStatus(404);
      return res.sendStatus(204);
    }
    return res.sendStatus(404);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
