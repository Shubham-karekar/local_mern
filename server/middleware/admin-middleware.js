// const adminMiddleware = async (req, res, next) => {
//   try {
//     console.log(req.user);
//     const adminRole = req.user.isAdmin;
//     if (!adminRole) {
//       res.status(404).json({ Message: "Acces is denied" });
//     }
//   } catch (error) {
//     next(error);
//   }
// };


const adminMiddleware = async (req, res, next) => {
  try {
    if (!req.user || !req.user.isAdmin) {
      return res.status(403).json({ message: "Access denied. Admin only." });
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = adminMiddleware;
