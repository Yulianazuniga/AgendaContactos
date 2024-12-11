const express = require('express');
const router = express.Router();
const Contact = require('../models/agenda');

// Crear un nuevo contacto
router.post("/contacts", async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).json(contact);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Obtener todos los contactos
router.get("/contactsall", async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Obtener un contacto por ID
router.get("/contacts/:id", async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ error: "Contacto no encontrado" });
    res.json(contact);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Actualizar un contacto
router.put("/contacts/:id", async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!contact) return res.status(404).json({ error: "Contacto no encontrado" });
    res.json(contact);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Eliminar un contacto
router.delete("/contacts/:id", async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) return res.status(404).json({ error: "Contacto no encontrado" });
    res.json({ message: "Contacto eliminado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
