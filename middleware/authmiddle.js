import JWT from 'jsonwebtoken'

export const requirsignin = async (req,res,next)=>{
    try{
        const decode = JWT.verify(
            req.headers.authorization,
            process.env.JWT_SECRET
        )
        next();

    }catch(error){
      console.log("error",error)
    }
}
