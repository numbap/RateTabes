const widowed = (input) => {
    if(client.alws.active && client.oas.active){
        // This is an error. Both cannot be active at the same time
    }
    if(input.status === WIDDOWED){
        if(client.oas.active){
            // GIS on Table 1
        }
        if(client.alws.active){
            // Client paid on Table 5
        }
        if(client.age > 60 && client.age <= 65){
            // client may be eligible for ALWS
        }
        // If within ALWS age
    
    }else{
        // Return an error
    }
}
module.exports = { widowed };