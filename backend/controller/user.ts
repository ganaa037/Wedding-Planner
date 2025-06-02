import { Usermodel } from "../model/user";
import bcrypt from "bcrypt";

export const createUser = async (req, res) => {
  const { email, password, isVerified } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await Usermodel.find({ email: email });
    console.log(user, "User");
    if (user.length > 0)
      return res.status(405).send({
        success: true,
        massage: "user already created",
      });

    const User = await Usermodel.create({
      email: email,
      password: hashedPassword,
      isVerified: isVerified,
    });
    res.status(200).send({ success: true, user: user }).end();
  } catch (error) {
    console.error(error, "err");
    res
      .status(400)
      .send({
        success: false,
        massage: error,
      })
      .end();
  }
};

export const getUser = async (_, res) => {
  try {
    const users = await Usermodel.find().select("-password");
    return res
      .status(200)
      .send({
        success: true,
        massage: users,
      })
      .end();
  } catch (error) {
    return res
      .status(400)
      .send({
        success: false,
        masssage: error,
      })
      .end();
  }
};
export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Usermodel.findById(id);
    return res
      .status(200)
      .send({
        success: true,
        user: user,
      })
      .end();
  } catch (error) {
    console.error(error, "err");
    return res
      .status(400)
      .send({
        success: true,
        massage: error,
      })
      .end();
  }
};
