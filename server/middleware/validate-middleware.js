// const validate = (structure) => async (req, res, next) => {
//   try {
//     const parseBody = await structure.parseAsync(req.body);
//     res.body = parseBody;
//     console.log(structure);
//     next();
//   } catch (err) {
//     const status = 422;
//     const message = 'fill the details correct';
//     const extraDetails = err.errors[0].message;

//     const error = {
//       status,
//       message,
//       extraDetails,
//     };

//     console.log(error);
//     res.status(400).json({ msg: "Hello This is Error " });
//     next(error);
//   }
// };

// module.exports = validate;

const validate = (structure) => async (req, res, next) => {
  try {
    // Parse and validate the request body
    const parseBody = await structure.parseAsync(req.body);
    req.body = parseBody; // Replace the request body with the parsed data
    next(); // Proceed to the next middleware
  } catch (err) {
    // Handle validation errors
    const status = 422; // Unprocessable Entity
    const message = 'Fill in the details correctly';
    let extraDetails = 'Validation error occurred';

    // Safely access err.errors if it exists and has the expected structure
    if (err.errors && Array.isArray(err.errors) && err.errors.length > 0) {
      extraDetails = err.errors[0].message;
    }

    // Log the error for debugging
    console.error({
      status,
      message,
      extraDetails,
    });

    // Send a response with the error details
    res.status(status).json({
      success: false,
      message,
      extraDetails,
    });
  }
};

module.exports = validate;
