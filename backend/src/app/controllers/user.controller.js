import User from '../models/user';

class UserController {
  async store(req, res) {
    const userExists = await User.findOne({
      where: { email: req.body.email },
    });

    if (userExists) {
      return res.status(400).json({
        error: 'User already exists.',
      });
    }

    const { id, name, email, is_provider } = await User.create(req.body);

    return res.json({
      id,
      name,
      email,
      is_provider,
    });
  }

  async update(req, res) {
    const { email, oldPassword } = req.body;

    const user = await User.findByPk(req.userId);

    if (email !== user.email) {
      const userExists = await User.findOne({
        where: { email },
      });

      if (userExists) {
        return res.status(400).json({
          error: 'User already exists.',
        });
      }
    }

    if (oldPassword) {
      const oldPasswordIsValid = await user.checkPassword(oldPassword);
      if (!oldPasswordIsValid) {
        return res.status(401).json({
          error: 'Password does not match',
        });
      }
    }

    const { id, name, is_provider } = await user.update(req.body);

    return res.json({
      id,
      name,
      email,
      is_provider,
    });
  }
}

export default new UserController();
