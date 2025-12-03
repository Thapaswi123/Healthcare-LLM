
export const handler = async () => ({
  statusCode:200,
  body: JSON.stringify({
    patient:{id:"123", name:"John Doe"},
    labs:[{test:"CBC", value:"Normal"}],
    notes:["Patient stable"]
  })
})
