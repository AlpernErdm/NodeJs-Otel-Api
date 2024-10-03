const User = require("../models/User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res, next) => {
    const { userName, password, email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "Zaten böyle bir kullanıcı bulunmakta" });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Şifre uzunluğu minimum 6 olmalıdır" });
        }

        if (!isEmail(email)) {
            return res.status(400).json({ message: "Email tipinde değil" });
        }

        const passwordHash = await bcrypt.hash(password, 12);
        const newUser = await User.create({ ...req.body, password: passwordHash });
        const token = await jwt.sign({ id: newUser._id, isAdmin: newUser._isAdmin }, "SECRET_KEY", { expiresIn: "1h" });

        return res.cookie("token", token, { httpOnly: true }).status(201).json({
            token, newUser
        });

    } catch (error) {
        return res.status(500).json(error);
    }
};

const login = async (req, res, next) => {
    const { password, email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Böyle bir kullanıcı bulunmakta" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ message: "Şifreler uyuşmamakta" });
        }

        const token = await jwt.sign({ id: user._id, isAdmin: user._isAdmin }, "SECRET_KEY", { expiresIn: "1h" });

        return res.cookie("token", token, { httpOnly: true }).status(200).json({
            token, user
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

function isEmail(email) {
    let regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return regex.test(email);
}

module.exports = { register, login };
