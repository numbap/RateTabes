const { calculateTable1GIS } = require("./Table1GIS.js");
const { calculateTable2GIS } = require("./Table2GIS.js");
const { calculateTable3GIS } = require("./Table3GIS.js");
const { calculateTable4GIS } = require("./Table4GIS.js");

const scenario = {
    client: { years: 10, years: 5, age: 30, oas: false, inc: 1000.5 },
    partner: { years: 15, iyears: 8, age: 35, oas: true, inc: 2000.75 },
    vars: {
      single: { se: 50.5, tu: 100.75, pe: 500.25 },
      parnered: { se: 70.25, tu: 150.5, pe: 700.75 },
      date: "2023-01-01",
    },
};

function livingApart(scenario) {
    const client = {...scenario.client}
    const partner = {...scenario.partner}
    const date = scenario.vars.date
    const single = {...scenario.vars.single}
    const partnered = {...scenario.vars.parnered}
    const combined = {inc: client.inc + partner.inc}

    console.log(client, partner, date, single, partnered)

    // Calculate for each tate table

    const T1 = calculateTable1GIS(single.se, single.tu, single.pe, client.inc, client.years, client.iyears, client.age, date);
    const T2 = calculateTable2GIS(partnered.se, partnered.tu, partnered.pe, combined.inc, client.years, client.iyears, client.age, date);
    const T3 = calculateTable3GIS(single.se, single.tu, single.pe, combined.inc, client.years, client.iyears, client.age, date);;
    const T4 = calculateTable4GIS(partnered.se, partnered.tu, partnered.pe, combined.inc, client.years, client.iyears, client.age, date);

    // Table 2
    if(client.oas && partner.oas){
        if(T1 > T2){
            return {table: 1, amount: T1}
        }else{
            return {table: 2, amount: T2}
        }
    }

    // Table 3
    if(client.oas && partner.oas){
        if(T1 > T3){
            return {table: 1, amount: T1}
        }else{
            return {table: 3, amount: T3}
        }
    }

    // Table 4
    if(client.oas && partner.oas){
        if(T1 > T4){
            return {table: 1, amount: T1}
        }else{
            return {table: 4, amount: T4}
        }
    }

  return null;
}

// Example usage
// Supplement Equivalent (SE)
const DATE = "2023-11-01"; // Example values, replace with actual values
// Top-Up (TU)
const AGE = 78;
const YEARS = 20;
// Pension Equivalent (PE)
const PE = 713.34;
// Joint Income (INC)
const INC = 11000;

console.log("=======================================");
console.log(livingApart(scenario))
