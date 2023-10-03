const Address = require('../models/Address');
const User = require('../models/User');

// Create a new address
exports.createAddress = async (req, res) => {
    const userId = req.user.userId; // from authMiddleware
    const { firstName, lastName, address, city, state, country, pinCode, mobileNumber, isDefault } = req.body;

    try {
        const newAddress = new Address({
            userId,
            firstName,
            lastName,
            address,
            city,
            state,
            country,
            pinCode,
            mobileNumber,
            isDefault,
        });
        // if new address is default, then update all other addresses to non-default
        if (isDefault) {
            await Address.updateMany({ userId }, { isDefault: false });
        }
        
        const savedAddress = await newAddress.save();
        res.json(savedAddress);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to create address' });
    }
}

// Get all addresses of a user
exports.getAddresses = async (req, res) => {
    const userId = req.user.userId; // from authMiddleware

    try {
        const addresses = await Address.find({ userId });
        res.json(addresses);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to get addresses' });
    }
}

// Get an address by id
exports.getAddressById = async (req, res) => {
    const userId = req.user.userId; // from authMiddleware
    const addressId = req.params.id;

    try {
        const address = await Address.findOne({ _id: addressId, userId });
        res.json(address);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to get address' });
    }
}

// Update an address
exports.updateAddress = async (req, res) => {
    console.log(req.body);
    const userId = req.user.userId; // from authMiddleware
    const addressId = req.params.id;
    const { firstName, lastName, address, city, state, country, pinCode, mobileNumber, isDefault } = req.body;

    try {
        const updatedAddress = await Address.findOneAndUpdate(
            { _id: addressId, userId },
            { firstName, lastName, address, city, state, country, pinCode, mobileNumber, isDefault },
            { new: true }
        );
        // if updated address is default, then update all other addresses to non-default
        if (isDefault) {
            await Address.updateMany({ userId, _id: { $ne: addressId } }, { isDefault: false });
        }
        res.json(updatedAddress);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to update address' });
    }
}

// Delete an address
exports.deleteAddress = async (req, res) => {
    const userId = req.user.userId; // from authMiddleware
    const addressId = req.params.id;

    try {
        // Check if the address exists and belongs to the user
        const addressToDelete = await Address.findOne({ _id: addressId, userId });

        if (!addressToDelete) {
            return res.status(404).json({ message: 'Address not found' });
        }

        // Delete the address
        await Address.deleteOne({ _id: addressId });

        res.json({ message: 'Address deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete address' });
    }
}
