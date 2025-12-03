
const jwt=require('jsonwebtoken')
exports.login=async (e)=>{
 const {email,pwd}=JSON.parse(e.body)
 const token=jwt.sign({email,role:'clinician'},'secret',{expiresIn:'1h'})
 return{statusCode:200, body:JSON.stringify({token})}
}
