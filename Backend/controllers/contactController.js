const Contact = require('../models/contactModel');

// Get All Messages and Contact Info (Public)
exports.getMessages = async (req, res) => {
    try {
        const messages = await Contact.find();
        res.json({
            messages
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Store a New Contact Message (Public)
exports.storeMessage = async (req, res) => {
    const { name, email, message } = req.body;

    try {
        const newMessage = new Contact({ name, email, message });
        await newMessage.save();
        res.status(201).json({ message: "Message stored successfully!",data:newMessage,contactInfo: {
            email: "Avinashvmetre20@gmail.com",
            phone: "+91 6360639208"
        }, });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a Message (Protected)
exports.deleteMessage = async (req, res) => {
    const { id } = req.params;

    try {
        const message = await Contact.findById(id);

        if (!message) {
            return res.status(404).json({ message: "Message not found" });
        }

        await message.deleteOne();
        res.json({ message: "Message deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
