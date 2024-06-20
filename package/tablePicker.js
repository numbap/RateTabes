const {marriedCommonLaw} = require('./TablePicker/MarriedCommonLaw.js')

// This function selects the appropriate table for Income Tested Benefits calculation.

const MARRIED = "married"
const COMMONLAW = "commonlaw"
const WIDDOWED = "widdowed"
const SINGLE = "single"

// Spouse or common-law partners living apart for reasons beyond their control. Formerly involuntary separation.
const tablePicker = (input) => {
   const {partner, client, status, date, lafrbtc} = input;

   if(status === MARRIED || status === COMMONLAW){
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
}


if(status === WIDDOWED){
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

}
 
if(status === SINGLE){
    
}

if(lafrbtc === true){
    
}
}