import { DetailUser } from "../models/detail.js"


//metodos
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

const deleteDetails = async (req, res) => {
    try {
        await DetailUser.findByIdAndDelete(req.params.id);
        res.sendStatus(204);
    } catch (error) {
        res.status(400).send(error);
    }
};

export { createDetails, getAllDetails, updateDetails, deleteDetails };



// export const DetailUser = async (req, res) =>{
//     const { id, userId, photo, birthYear, nationality, currentTeam, dorsal, favPosition, mainFoot, weight, height} = req.body
//     try {
//         const detail = new DetailUser ({
//             id: id,
//             userId: userId,
//             photo: photo,
//             birthYear: birthYear,
//             nationality: nationality,
//             currentTeam:currentTeam,
//             dorsal:dorsal,
//             favPosition:favPosition,
//             mainFoot: mainFoot,
//             weight: weight,
//             height: height,
//         })
//         await detail.save()
//         res.status(201).json({message: "Details added", DetailUser})
//     } catch (error) {
//         res.status(500).json({message: "No se añaden detalles", error})
//     }
// }