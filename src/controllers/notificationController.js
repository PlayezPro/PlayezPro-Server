import notificationModel from "../models/notification.js";

export const createNotification = async (req, res) => {
    const { recipient, post, sender, message } = req.body;
    try {
        const newNotification = new notificationModel({ recipient, post, sender, message });
        await newNotification.save();
        return res.status(200).json({ message: 'Notificación creada correctamente', newNotification });
    } catch (error) {
        console.error('Error al crear la notificación:', error);
        return res.status(500).json({ error: 'Hubo un error al procesar la solicitud' });
    }
};

export const deleteNotification = async (req, res) => {
    const { notificationId } = req.body;
    try {
        const deletedNotification = await notificationModel.findByIdAndDelete(notificationId);
        if (!deletedNotification) {
            return res.status(400).json({ error: 'No se encontró la notificación' });
        }
        return res.status(200).json({ message: 'Notificación eliminada correctamente' });
    } catch (error) {
        console.error('Error al eliminar la notificación:', error);
        return res.status(500).json({ error: 'Hubo un error al procesar la solicitud' });
    }
};

export const getUserNotifications = async (req, res) => {
    const { userId } = req.params;
    try {
        const notifications = await notificationModel.find({ recipient: userId }).sort({ createdAt: -1 });
        return res.status(200).json({ notifications });
    } catch (error) {
        console.error('Error al obtener las notificaciones:', error);
        return res.status(500).json({ error: 'Hubo un error al procesar la solicitud' });
    }
};

export const markAsRead = async (req, res) => {
    const { notificationId } = req.body;
    try {
        const notification = await notificationModel.findByIdAndUpdate(notificationId, { isRead: true }, { new: true });
        if (!notification) {
            return res.status(400).json({ error: 'No se encontró la notificación' });
        }
        return res.status(200).json({ message: 'Notificación marcada como leída', notification });
    } catch (error) {
        console.error('Error al marcar la notificación como leída:', error);
        return res.status(500).json({ error: 'Hubo un error al procesar la solicitud' });
    }
};
