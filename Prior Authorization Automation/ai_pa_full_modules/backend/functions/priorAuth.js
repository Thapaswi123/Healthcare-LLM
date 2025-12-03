
exports.handler=async(e)=>{
 const body=JSON.parse(e.body||"{}")
 return{statusCode:200, body:JSON.stringify({packet:"PA Packet", input:body})}
}
