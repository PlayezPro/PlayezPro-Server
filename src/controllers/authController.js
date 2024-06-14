import { Users } from "../models/user.js";
import Jwt from "jsonwebtoken";
import { Roles } from '../models/roles.js';
import { privateKey } from "../libs/keypair.js";


// Controller function for user signup
export const singUp = async (req, res) => {
    const { name, lastName, userName, email, phoneNumber, password, repeatPassword, roles } = req.body;

    // Validate that passwords are provided and match
    if (!password || !repeatPassword) {
        return res.status(400).json({ message: 'Password and repeat password are required' });
    }
    if (password !== repeatPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }

    console.log('Received password:', password);  // Debug log

    try {
        // Encrypt the password
        const hashedPassword = await Users.encryptPassword(password);

        // Create a new user with the hashed password
        const newUser = new Users({
            name,
            lastName,
            userName,
            email,
            phoneNumber,
            password: hashedPassword,
            repeatPassword: hashedPassword,
        });

        // Assign roles to the new user
        if (roles) {
            const foundRoles = await Roles.find({ name: { $in: roles } });
            newUser.roles = foundRoles.map(role => role._id);
        } else {
            const role = await Roles.findOne({ name: "player" });
            newUser.roles = [role._id];
        }

        // Save the new user to the database
        const savedUser = await newUser.save();
        console.log(savedUser);

        // Generate a JWT token for the new user
        const token = Jwt.sign({ id: savedUser._id }, privateKey, { expiresIn: 86400 });

        // Send the token in the response
        res.status(200).json({ token });
    } catch (error) {
        console.error('Error signing up:', error);  // Debug log
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Controller function for user signin
export const signIn = async (req, res) => {
    try {
        // Find the user by email
        const userFound = await Users.findOne({ email: req.body.email });

        if (!userFound) return res.status(400).json({ message: "User not found" });

        // Compare the provided password with the stored hashed password
        const matchPassword = await Users.comparePassword(req.body.password, userFound.password);

        if (!matchPassword) return res.status(401).json({ token: null, message: 'Invalid password' });

        // Extract user roles
        const roles = userFound.roles;

        // Generate a JWT token for the user
        const token = Jwt.sign({ id: userFound._id, roles: userFound.roles }, privateKey, { expiresIn: 86400 });

        // Set the token in the response header
        res.header('Authorization', 'Bearer '+ token);

        // Send the token and roles in the response
        res.json({ token, roles });
    } catch (error) {
        console.error('Error signing in:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
