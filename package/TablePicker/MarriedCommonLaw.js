const marriedCommonLaw = (input) => {
    if(input === MARRIED || input === COMMONLAW){
        if (!client.oas.active && !partner.oas.active){
            // Neither is entitled to Income Tested Benefit
        }
        if (client.oas.active && partner.oas.active){
            // Calculate on Table 2
        }
        if (!client.oas.active && partner.oas.active){
            if(client.alw.active){
                // Partner GIS on Table 4
                // Client allowance on Table 4
            }else{
                // Partner GIS on Table 3
            }
        }
        if (client.oas.active && !partner.oas.active){
            if(partner.alw.active){
                // Client GIS on Table 4
                // partner allowance on Table 4
            }else{
                // Client GIS on Table 3
            }
        }
    }else{
        // return an error that the proper conditions have not been met.
    }
}

module.exports = { marriedCommonLaw };