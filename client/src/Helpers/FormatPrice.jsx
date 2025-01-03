// // src/Helpers/FormatPrice.js
// const FormatPrice = ({ price }) => {
//     return new Intl.NumberFormat('en-IN', {
//       style: 'currency',
//       currency: 'INR',
//     }).format(price / 100);
//   };
  
//   export default FormatPrice;
  
const FormatPrice = ({ price }) => {
  return Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(price / 100);
};

export default FormatPrice;
