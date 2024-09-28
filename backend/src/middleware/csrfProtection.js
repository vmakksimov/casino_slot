
const Tokens = require('csrf');
const tokens = new Tokens();

function csrfProtection(req, res, next) {
  const token = req.cookies['csrf-token'];
  if (!token || !tokens.verify(process.env.CSRF_SECRET, token)) {
    return res.status(403).json({ error: 'Invalid CSRF token' });
  }
  next();
}

module.exports = csrfProtection;