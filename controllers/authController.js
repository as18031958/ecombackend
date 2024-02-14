import userModels from "../models/userModels.js";
import  {comparePassword, hashPassword} from "../helpers/authHelper.js";
import JWT from 'jsonwebtoken'


export const registerController = async (req,res)=>{
    try{
        const {name,email,password,phone,address} = req.body

        //validation
        if(!name){
            return res.send({message:"name is required"})
        }
        if(!email){
            return res.send({message:"email is required"})
        }
        if(!password){
            return res.send({message:"password is required"})
        }
        if(!phone){
            return res.send({message:"phonenumber is required"})
        }
        if(!address){
            return res.send({message:"address is required"})
        }
        //check user
        const finduser = await userModels.findOne({email})

        if(finduser){
            return res.status(200).send({
                success:false,
                message:"user already present",
                
            })
        }
        //registration user
        const hashedpassword = await hashPassword(password)
        //save
        const user = await new userModels({name,email,phone,address,password:hashedpassword}).save();
        res.status(201).send({
            success:true,
            message:"registerd",
            user,
        })




    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error in registration",
            error
        })

    }
};

//post login
export const loginContoller = async (req,res)=>{
    try{
        const{email,password} = req.body 

        //validation
        if(!email || !password){
            return res.status(404).send({
                success:false,
                message:"invalid email or password"
            })
        }
        //check user
        const user = await userModels.findOne({email})
        if(!user){
            return res.status(404).send({
                success:false,
                message:"Email not registerd"
            })
        }
        const match = await comparePassword(password,user.password)
        if(!match){
            return res.status(200).send({
                success:false,
                message:"Invalid password"
            })
        }
        //token
        const token = await JWT.sign({_id:user._id }, process.env.authToken, {expiresIn:"30d"})

        res.status(200).send({
            success:true,
            message:"login succesfully",
            user:{
                name:user.name,
                email:user.email,
                phone:user.phone,
                address:user.address,
            },
            token,
        });

    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in login",
            error
        })
    }
}

//test controller
export const testController = (req,res)=>{
    try{
    res.send('protected route')
    } catch(error){
        console.log(error);
        res.send({send})
    }
}