This package contains 5 files for calculating income-tested benefits based on financial and OAS inputs. 
Table5ALWS.js still has some minor issues that I'm ironing out. But the other 4 seem ready. 

To Do:

 - Develop automated tests for the functions against every income teir for every historical rate table spreadsheet that we intend to cover. This will ensure accuracy and compliance. 
 - Create functions to select rate tables based on income amounts, marital status and other factors. 
 - Create input validation functions to prevent impossible scenarios. 
 - Create automated tests to validate functions against ISSA scenarios. 
 - Create a suite of OAS calculation functions. Ensure that these functions respect the 65+1 rule. 
 - Publish this package to NPM under an official sanctioned library.
 - Create a suite of functions related to residency calculations
 - create a suite of functions related to future dates and milestones
 - create a suite of functions related to optimized OAS scenarios