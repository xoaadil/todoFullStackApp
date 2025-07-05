const userModel = require("../Models/User");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
let signup = async (req, res, next) => {
    console.log("📤 Sending user data to database...")
    try {
        const { name, email, password } = req.body;
        const user = await userModel.findOne({ email: email });
        if (user) {
            return res.status(400).send({ message: "This email is already registered" });
        }
        else {
            let hashpass = await bcrypt.hash(password, 5);
            const user = await userModel.create({
                name: name,
                email: email,
                password: hashpass
            })
        }

    }
    catch (err) {
        console.log(err)
    }
    console.log("✅ User successfully saved in database");
    next();
}
let login = async (req, res, next) => {
    console.log("📤 Sending user data to database for Verifcation Login");

    try {
        const { email, password } = req.body;
        let user = await userModel.findOne({ email: email });
        if (!user) {
            return res.status(400).send({ message: "incorrect details" });
        }
        else {
            let hash = await bcrypt.compare(password, user.password);
            if (hash) {
                console.log("📤  user data is persent database for Verifcation Login");
                let token = jwt.sign({ id: user._id }, JWT_SECRET);
                req.token = token;
                req.name=user.name;
                console.log(user);
                 next();
            }
            else{
                  return res.status(400).send({ message: "incorrect details" });
            }

        }

    }
    catch (err) {
        console.log(err);
    }
   
}


module.exports = { signup,login }