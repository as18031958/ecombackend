import bcryptjs from 'bcryptjs'

export const hashPassword = async(password)=>{
    try{
    const saltRound = 10;
    const newpassword = new bcryptjs.hash(password,saltRound);
    return newpassword;
    }catch(error){
        console.log(error)
    }
    }

export const comparePassword = async(password,newpassword)=>{
    return bcryptjs.compare(password,newpassword)
}