// middleware/checkRole.js
const checkRole = (requiredRole) => {
  return (req, res, next) => {
    // req.user đã có từ middleware isAuthenticated trước đó
    if (req.user.role !== requiredRole) {
      return res.status(403).json({ 
        message: `Truy cập bị từ chối. Bạn cần quyền ${requiredRole}.` 
      });
    }
    next();
  };
};

module.exports = checkRole;