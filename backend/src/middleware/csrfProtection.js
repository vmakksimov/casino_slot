
const Tokens = require('csrf');
const tokens = new Tokens();

/**
 * Protects against cross-site request forgery (CSRF) attacks by verifying the CSRF token.
 *
 * @param {object} req - The incoming HTTP request object.
 * @param {object} res - The outgoing HTTP response object.
 * @param {function} next - The next middleware function in the stack.
 * @return {void}
 */
function csrfProtection(req, res, next) {
  const token = req.cookies['csrf-token'];
  if (!token || !tokens.verify(process.env.CSRF_SECRET, token)) {
    return res.status(403).json({ error: 'Invalid CSRF token' });
  }
  next();
}

module.exports = csrfProtection;