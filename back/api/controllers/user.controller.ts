const { login, register } = require("../services/user.services");
import { Request, Response } from "express";
import { isValidEmail, isValidPassword } from "../utils/utils";
class UserController {
  static async loginUser(req: Request, res: Response) {
    try {
      const user = await login(req.body);
      return res.status(200).send(user);
    } catch (error) {
      res.status(500).json({ message: "Error en el inicio de sesión", error });
    }
  }

  static async registerUser(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      if (isValidEmail(email) && isValidPassword(password)) {
        const user = await register(email, password);
        return res.status(201).send(user);
      }
    } catch (error) {
      res.status(400).send(error);
    }
  }
}

export default UserController;
