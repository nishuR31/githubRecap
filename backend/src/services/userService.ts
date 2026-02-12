import { updateUserById } from "../repository/userRepository";

export async function editUserService(userId: string, data: any) {
  return updateUserById(userId, data);
}
