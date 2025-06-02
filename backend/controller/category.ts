import { CategoryModel } from "../model/category";

export const createCategory = async (req, res) => {
  const { name } = req.body;
  try {
    const categoryName = await CategoryModel.create({
      name: name,
    });
    res
      .status(200)
      .send({
        success: true,
        categoryName: categoryName,
      })
      .end();
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
export const getCategory = async (_, res) => {
  try {
    const category = await CategoryModel.find();
    return res.status(200).send({ success: true, category: category }).end();
  } catch (error) {
    console.error(error, "err");
    return res
      .status(400)
      .send({
        success: false,
        massage: error,
      })
      .end();
  }
};

export const getCategoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await CategoryModel.findById(id);
    return res.status(200).send({ success: true, category: category }).end();
  } catch (error) {
    console.error(error, "err");
    return res.status(400).send({ success: false, massage: error }).end();
  }
};
