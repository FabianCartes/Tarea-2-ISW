import { AppDataSource } from "../config/configDB.js";
import { User } from "../entities/user.entity.js";
import bcrypt from "bcrypt";

const userRepository = AppDataSource.getRepository(User);

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function createUser(data) {
  const hashedPassword = await bcrypt.hash(data.password, 10);

  const newUser = userRepository.create({
    email: data.email,
    password: hashedPassword,
  });

  const saved = await userRepository.save(newUser);

  // No devolver password al crear
  const { password, ...userWithoutPassword } = saved;
  return userWithoutPassword;
}

export async function findUserByEmail(email) {
  // Útil para login (necesitamos el password hashed)
  return await userRepository.findOneBy({ email });
}

export async function findUserById(id) {
  return await userRepository.findOneBy({ id });
}

//actualizar usuario
export async function updateUser(id, data) {
  const userId = Number(id);
  const { email, password } = data || {};

  if (!email && !password) {
    throw { status: 400, message: "Nada para actualizar" };
  }

  // Buscar usuario actual
  const user = await userRepository.findOneBy({ id: userId });
  if (!user) {
    throw { status: 404, message: "Usuario no encontrado" };
  }

  // Si se pide cambiar email: validar formato y unicidad
  if (email) {
    if (!emailRegex.test(email)) {
      throw { status: 400, message: "Formato de email inválido" };
    }
    const existing = await userRepository.findOneBy({ email });
    if (existing && String(existing.id) !== String(userId)) {
      throw { status: 409, message: "El email ya está en uso" };
    }
    user.email = email;
  }

  // Si se pide cambiar password: hashear
  if (password) {
    const hashed = await bcrypt.hash(password, 10);
    user.password = hashed;
  }

  const updated = await userRepository.save(user);

  // No devolver password
  const { password: _, ...result } = updated;
  return result;
}

//eliminar usuario
export async function deleteUser(id) {
  const userId = Number(id);

  const user = await userRepository.findOneBy({ id: userId });
  if (!user) {
    throw { status: 404, message: "Usuario no encontrado" };
  }

  const queryRunner = AppDataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    await queryRunner.manager.remove(user);

    await queryRunner.commitTransaction();
    return true;
  } catch (err) {
    await queryRunner.rollbackTransaction();
    // Re-lanzar manteniendo formato de error que usan los controllers
    if (err.status && err.message) throw err;
    throw { status: 500, message: "Error al eliminar usuario" };
  } finally {
    await queryRunner.release();
  }
}
