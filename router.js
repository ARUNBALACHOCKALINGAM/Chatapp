const apiRouter = require("express").Router();
const userController = require("./controllers/userController");
const cors = require("cors");

apiRouter.use(cors());

apiRouter.get("/", (req, res) =>
  res.json(
    "Hello, if you see this message that means your backend is up and running successfully. Congrats! Now let's continue learning React!"
  )
);

apiRouter.post("/register", userController.apiRegister);
apiRouter.post("/login", userController.apiLogin);
apiRouter.post("/userData", userController.displayUsers);
module.exports = apiRouter;
