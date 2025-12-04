// middleware/authorize.js
const db = require("../db");

function authorize(permissionAction) {
  return async (req, res, next) => {
    try {
      const roleId = req.user.role_id;
      const q = `SELECT 1 FROM role_permissions rp
                 JOIN permissions p ON rp.permission_id = p.id
                 WHERE rp.role_id=$1 AND p.action=$2 LIMIT 1`;
      const r = await db.query(q, [roleId, permissionAction]);
      if (r.rowCount === 0) {
        return res.status(403).json({ message: "Forbidden: no permission" });
      }
      next();
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  };
}

module.exports = authorize;
