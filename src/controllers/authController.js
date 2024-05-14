import { Users } from "../models/user.js";
import Jwt from "jsonwebtoken";
import { Roles } from '../models/roles.js';
import dotenv from 'dotenv'

dotenv.config();

const SECRET = process.env.JWT_SECRET;

export const singUp = async (req, res) => {
    const { name, lastName, userName, email, phoneNumber, password, repeatPassword, roles } = req.body;

    const hashedPassword = await Users.encryptPassword(password);

    const newUser = new Users({
        name,
        lastName,
        userName,
        email,
        phoneNumber,
        password: hashedPassword,
        repeatPassword,
    });

    if (roles) {
        const foundRoles = await Roles.find({ name: { $in: roles } });
        newUser.roles = foundRoles.map(role => role._id);
    } else {
        const role = await Roles.findOne({ name: "player" });
        newUser.roles = [role._id];
    }

    const savedUser = await newUser.save();
    console.log(savedUser);

    const token = Jwt.sign({ id: savedUser._id }, SECRET, { expiresIn: 86400 }); 

    res.status(200).json({ token });
};

export const signIn = async (req, res) => {
    try {
        const userFound = await Users.findOne({ email: req.body.email });

        if (!userFound) return res.status(400).json({ message: "User not found" });

        const matchPassword = await Users.comparePassword(req.body.password, userFound.password);

        if (!matchPassword) return res.status(401).json({ token: null, message: 'Invalid password' });

        // Extraer los roles del usuario encontrado
        const roles = userFound.roles;

        // Generar el token
        const token = Jwt.sign({ id: userFound._id }, SECRET, { expiresIn: 86400 }); 

        res.header("access", token); 

        // Devolver el token y los roles en la respuesta
        res.json({ token, roles });
    } catch (error) {
        console.error('Error signing in:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
