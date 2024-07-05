const widowed = (input) => {
    if(client.alws.active && client.oas.active){
        // This is an error. Both cannot be active at the same time
    }
    if(input.status === "widowed"){
        if(client.oas.active){
            // GIS on Table 1
        }
        if(client.alws.active){
            // Client paid on Table 5
        }
        if(client.age > 60 && client.age <= 65){
            // client may be eligible for ALWS
        }
        if(client.age <= 60){
            // client too young for ALWS
        }    
    }else{
        // Return an error
    }
}
module.exports = { widowed };