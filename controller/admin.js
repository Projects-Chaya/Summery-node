const Admin = require('../model/admin');
const User = require('../model/user');
const Weather = require('../model/weather')

const createAdmin = async (req, res) => {
    const newAdmin = new Admin(req.body);
    try {
        const a = await newAdmin.save();
        await User.updateMany({ _id: req.body.users }, { $push: { 'adminId': a._id } })
        console.log({ admin: a });
        res.status(200).json({ admin: a })
    } catch (error) {
        console.log(`error.... ${error}`);
        res.status(404).send(`error.... ${error}`);
    }
}

const loginAdmin = ((req, res) => {

    Admin.findById({ _id: req.params.id }).then(admin => {
        res.status(200).json({admin:admin})
    }).catch(err => {
        console.log(`Error: ${err}`);
        res.send(`Error: ${err}`);
    })
})


const updateAdmin = async (req, res) => {
    try {
        const adminUpdate = await Admin.findByIdAndUpdate({ _id: req.params.id }, { users: req.body.users })
        const reasult = req.body.users
        reasult.map(async index => {
            await User.findByIdAndUpdate({ _id: index }, { adminId: req.params.id })
        })
        res.status(200).json({ admin: adminUpdate })
    } catch (error) {
        console.log(`Error ${error}`);
        res.status(404).send(`Error ${error}`);
    }
}
const getAllUser = ((req, res) => {
    Admin.findById(req.params.id)
        .populate({ path: 'users', select: 'name email' })
        .then(user => {
            res.status(200).json({ user: user })
        }).catch(err => {
            console.log(err)
        })
})

const deleteUser = async (req, res) => {
    try {
        const user = await Admin.findByIdAndUpdate({ _id: req.params.adminId }, { $pull: { users: req.params.userId } });
        await Weather.findByIdAndUpdate({ users: req.params.userId }, { $pull: { users: req.params.userId } })
        await User.findByIdAndDelete({ _id: req.params.userId }, { adminId: req.params.adminId });
        res.status(200).send(`Delete user`)
    } catch (error) {
        console.log(`Error: ${error}`);
    }
}


module.exports = { createAdmin, deleteUser, updateAdmin, loginAdmin, getAllUser }