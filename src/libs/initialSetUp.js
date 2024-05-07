import  {Roles}  from "../models/roles.js"

export const createRoles = async () => {
try {
    const count = await Roles.estimatedDocumentCount()

    if(count > 0) return ;
   
    const values = await Promise.all([
       new Roles({name: 'admin'}).save(),
       new Roles({name: 'player'}).save()
    ])
   
    console.log(values)
} catch (error) {
    console.error(error)
}
} 