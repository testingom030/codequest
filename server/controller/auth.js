import users from '../models/auth.js'
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const signup = async (req, res) => {
    console.log('Signup request received:', { ...req.body, password: '***' });
    
    try {
        const { name, email, password } = req.body;

        // Input validation
        if (!name || !email || !password) {
            console.log('Missing required fields:', { name: !!name, email: !!email, password: !!password });
            return res.status(400).json({ message: "All fields are required" });
        }

        if (!email.includes('@')) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }

        // Check for existing user
        const extinguser = await users.findOne({ email });
        if (extinguser) {
            return res.status(409).json({ message: "User already exists" });
        }

        // Create new user
        const hashedpassword = await bcrypt.hash(password, 12);
        const newuser = await users.create({
            name,
            email,
            password: hashedpassword
        });

        // Generate token
        const token = jwt.sign({
            email: newuser.email, 
            id: newuser._id
        }, process.env.JWT_SECRET || 'fallback-secret-key', { 
            expiresIn: "1h" 
        });

        console.log('User created successfully:', { id: newuser._id, email: newuser.email });
        res.status(201).json({ 
            result: {
                _id: newuser._id,
                name: newuser.name,
                email: newuser.email
            }, 
            token 
        });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ 
            message: "Failed to create user", 
            error: error.message,
            type: error.name
        });
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const extinguser = await users.findOne({ email });
        if (!extinguser) {
            return res.status(404).json({ message: "User does not exists" })
        }
        const ispasswordcrct = await bcrypt.compare(password, extinguser.password);
        if (!ispasswordcrct) {
            res.status(400).json({ message: "Invalid credentiasl" });
            return
        }
        const token = jwt.sign({
            email: extinguser.email, id: extinguser._id
        }, process.env.JWT_SECRET, { expiresIn: "1h" }
        )

        res.status(200).json({ result: extinguser, token })
    } catch (error) {
        console.error('Signup Error:', error); // Enhanced error logging
        res.status(500).json({
            message: "something went wrong...",
            error: error.message,
            type: error.name
        });
        return
    }
}
