
exports.handler=async()=>{
 return{statusCode:200, body:JSON.stringify({patient:{id:1,name:'Jane'},labs:[1,2],notes:['ok']})}
}
