import userModel from "../models/userModel.js";

async function update(req, res) {
  let doc = "";
  try {
    doc = await userModel.findOne({ _id: req.params.id });
  } catch (err) {
    return res.status(401).send({
      status: "error",
      message: "user-not-found",
    });
  }

  // Use overwrite and save so we go by pre-save validation
  //  update(), updateMany(), findOneAndUpdate(), etc. do not execute save() middleware
  try {
    doc.overwrite(req.body);
    await doc.save();
    res.json({
      status: "ok",
      message: "user successfully updated",
    });
  } catch (err) {
    return res.status(401).send({
      status: "error",
      message: "email-already-in-use",
    });
  }
}

export default { update };
