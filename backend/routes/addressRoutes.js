const express = require('express');
const router = express.Router();
const AddressController = require('../controllers/AddressController');
const authMiddleware = require('../middleware/authMiddleware');

// @route   POST /api/address
// @desc    Create a new address
router.post('/', authMiddleware, AddressController.createAddress);

// @route   GET /api/address
// @desc    Get all addresses of a user
router.get('/', authMiddleware, AddressController.getAddresses);

// @route   GET /api/address/:id
// @desc    Get an address by id
router.get('/:id', authMiddleware, AddressController.getAddressById);

// @route   PUT /api/address/:id
// @desc    Update an address by id
router.put('/:id', authMiddleware, AddressController.updateAddress);

// @route   DELETE /api/address/:id
// @desc    Delete an address by id
router.delete('/:id', authMiddleware, AddressController.deleteAddress);

module.exports = router;