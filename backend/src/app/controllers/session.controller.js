import jwt from 'jsonwebtoken';

import User from '../models/user';
import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({
        error: 'User not found',
      });
    }

    const passwordIsValid = await user.checkPassword(password);
    if (!passwordIsValid) {
      return res.status(401).json({
        error: 'Password does not match',
      });
    }

    const { id, name } = user;

    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
