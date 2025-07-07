const userModel = require("../Models/User");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

let signup = async (req, res) => { 
    console.log("📤 Sending user data to database...")
    try {
        const { name, email, password } = req.body;
        
        // Validate input
        if (!name || !email || !password) {
            return res.status(400).json({ 
                success: false, 
                message: "Name, email and password are required" 
            });
        }

        const user = await userModel.findOne({ email: email });
        if (user) {
            return res.status(400).json({ 
                success: false, 
                message: "This email is already registered" 
            });
        }

        let hashpass = await bcrypt.hash(password, 5);
        const newUser = await userModel.create({
            name: name,
            email: email,
            password: hashpass
        });

        console.log("✅ User successfully saved in database");
        return res.status(201).json({ 
            success: true, 
            message: "User created successfully",
            user: newUser 
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ 
            success: false, 
            message: "Internal server error",
            error: err.message 
        });
    }
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