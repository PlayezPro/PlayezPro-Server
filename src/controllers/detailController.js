import { DetailUser } from "../models/detail.js"
import { memory } from "../middlewares/uploadMedia.js";
import { initializeApp } from "firebase/app";
import config from "../firebase/firebase.js"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

//metodos
initializeApp(config.firebaseConfig);
const storage = getStorage();
const createDetails = async (req, res) => {
    try {
        const newDetailUser = new DetailUser(req.body);
        const savedDetails = await newDetailUser.save();
        res.status(201).send(savedDetails);
    } catch (error) {
        res.status(400).send(error);
    }
};

const getAllDetails = async (req, res) => {
    try {
        const details = await DetailUser.find({});
        res.status(200).send(details);
    } catch (error) {
        res.status(400).send(error);
    }
};

const updateDetails = async (req, res) => {
    try {
        const updatedDetails = await DetailUser.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).send(updatedDetails);
    } catch (error) {
        res.status(400).send(error);
    }
};
export const addProfileImg = async (req, res) => {
    const userId = req.params.id;
  
    try {
      await memory.single('imagen')(req, res, async (err) => {
        if (err) {
          console.error('Error al cargar el archivo en memoria:');
          return res.status(500).json({ message: 'Error al cargar el archivo en memoria' });
        }
        const file = req.file;
        const maxSize = 2 * 1024 * 1024; // 20MB
        if (file.size > maxSize) {
          return res.status(400).send('El archivo no debe superar los 2MB');
        }
  
        const fileBuffer = req.file.buffer;
        const tempFileRef = ref(storage, `perfil/${req.file.originalname}`);
  
        await uploadBytes(tempFileRef, fileBuffer);
        const tempFileDownloadUrl = await getDownloadURL(tempFileRef);
        
        // Actualizar el campo photo sin importar si ya existe
        const user = await DetailUser.findByIdAndUpdate(
          userId,
          { $set: { photo: tempFileDownloadUrl } },
          { new: true, runValidators: true, context: 'query' }
        );
  
        if (!user) {
          return res.status(404).json({ message: 'Usuario no encontrado' });
        }
  
        return res.status(200).json({ message: 'Usuario actualizado exitosamente' });
      });
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
      return res.status(500).json({ message: 'Error al actualizar el usuario' });
    }
  };

const deleteDetails = async (req, res) => {
    try {
        await DetailUser.findByIdAndDelete(req.params.id);
        res.sendStatus(204);
    } catch (error) {
        res.status(400).send(error);
    }
};

export { createDetails, getAllDetails, updateDetails, deleteDetails };

const getDetailById = async (req, res) => {
    const id = req.params.userId
    try {
        const detail = await DetailUser.findOne({userId:id});
        if (!detail) {
            return res.status(404).send("Detalle no encontrado");
        }
        res.status(200).send(detail);
    } catch (error) {
        res.status(400).send(error);
    }
};

export { getDetailById };