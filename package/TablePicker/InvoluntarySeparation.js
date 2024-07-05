const involuntarySeparation = (input) => {
    const {partner, client, status, date, lafrbtc} = input;

    // If a GIS/ALW couple experiences an involuntary separation, then paragraph 15(3)(b) applies to the GIS spouse and subsection 19(8) applies to the ALW spouse.

    // Paragraph 15(3)(b) states that the GIS spouse is treated as if they are single, i.e. Table 1 and subsection 19(8) states that the ALW will continued to be paid but using the ALW spouse's income only. This ALW piece is also confirmed under the definition of "monthly joint income" in subsection 22(1), para(b).

    if(input.lafrbtc){
        if (client.oas.active){
            // Calculate client GIS on Table 1 using single income
            // If this is higher than entitlement on joint income, return Table 1, otherwise, return same income
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

module.exports = { involuntarySeparation };