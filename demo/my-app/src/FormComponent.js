import React, { useState } from 'react';
import {incomeTestedCalc} from 'kc983po';

const FormComponent = () => {
  const [formData, setFormData] = useState({
    table: '',
    age: '',
    income: '',
    oasYears: '',
    deferralMonths: '',
  });

  // Example usage
// Supplement Equivalent (SE)
const SE = 900.43; // Example values, replace with actual values. "Aggregate maximum supplement"
// Top-Up (TU)
const TU = 165.04;
// Pension Equivalent (PE)
const PE = 713.34;
// OAS and International Years
const YEARS = 40
// Client age
const AGE = 65

  const handleChange = (e) => {
    const { name, value } = e.target;
    let total = 0;
    if(formData.table && formData.age){
        total = Math.max(0, incomeTestedCalc({TABLE: formData.table,SE, TU, PE, INC: formData.income, YEARS: formData.oasYears, AGE: formData.age}))
    }

    setFormData({ ...formData, [name]: value, total });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-lg w-full p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-8 text-gray-800 text-center">Income Tested Benefit</h2>
        <form>
          {/* Table Drop Down */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="table">
              Table
            </label>
            <select
              id="table"
              name="table"
              className="block w-full bg-white border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={formData.table}
              onChange={handleChange}
            >
              <option value="" disabled>Select Table</option>
              <option value="1GIS">Table 1 GIS</option>
              <option value="2GIS">Table 2 GIS</option>
              <option value="3GIS">Table 3 GIS</option>
              <option value="4GIS">Table 4 GIS</option>
              <option value="4ALW">Table 4 ALW</option>
              <option value="4ALW">Table 5 ALWS</option>
            </select>
          </div>

          {/* Age Drop Down */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="age">
              Age
            </label>
            <select
              id="age"
              name="age"
              className="block w-full bg-white border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={formData.age}
              onChange={handleChange}
            >
              <option value="" disabled>Select Age</option>
              <option value={50}>Under 60</option>
              <option value={61}>60-64</option>
              <option value={66}>65-74</option>
              <option value={76}>75+</option>
            </select>
          </div>

          {/* Income Numeric Field */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="income">
              Income
            </label>
            <input
              type="number"
              id="income"
              name="income"
              className="block w-full bg-white border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              min="0"
              value={formData.income}
              onChange={handleChange}
              placeholder="Enter your income"
            />
          </div>

          {/* OAS Years Numeric Field */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="oasYears">
              OAS Years
            </label>
            <input
              type="number"
              id="oasYears"
              name="oasYears"
              className="block w-full bg-white border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              min="1"
              max="40"
              value={formData.oasYears}
              onChange={handleChange}
              placeholder="Enter OAS years"
            />
          </div>

          {/* Deferral Months Numeric Field */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="deferralMonths">
              Deferral Months
            </label>
            <input
              type="number"
              id="deferralMonths"
              name="deferralMonths"
              className="block w-full bg-white border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              min="0"
              max="60"
              value={formData.deferralMonths}
              onChange={handleChange}
              placeholder="Enter deferral months"
            />
          </div>
        </form>
        <div className="text-8xl">${formData.total}</div>
      </div>
    </div>
  );
};

export default FormComponent;
