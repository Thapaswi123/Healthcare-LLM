
exports.handler=async(e)=>{
 return{statusCode:200, body:JSON.stringify({logged:true, event:e.body})}
}
