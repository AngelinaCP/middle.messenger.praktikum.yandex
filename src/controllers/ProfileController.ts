import { ProfileApi } from '../api';
import { type User } from './AuthController';
import { AuthController } from './';

class ProfileController {
  public async getUser (userId: string) {
    await ProfileApi.getUser(userId);
  }

  public async changeUserInfo (user: User) {
    await ProfileApi.changeUserInfo(user);
  }

  public async changeUserPassword (passwords: Record<string, string>) {
    await ProfileApi.changeUserPassword(passwords);
  }

  public async updateAvatar (formData: FormData) {
    await ProfileApi.updateAvatar(formData);
    await AuthController.getUserInfo();
  }
}

export default new ProfileController();
