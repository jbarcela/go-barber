import User from '../models/user';
import File from '../models/file';

class ProviderController {
  async index(req, res) {
    const providers = await User.findAll({
      where: { is_provider: true },
      attributes: ['id', 'name', 'email'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    return res.json(providers);
  }
}

export default new ProviderController();
