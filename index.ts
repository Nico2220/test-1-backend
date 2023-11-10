import express, { Express, Request, Response } from "express";
import { connectDB } from "./db";
import { User } from "./user.entity";
const app: Express = express();

const port = process.env.PORT || 3000;

(async () => {
  const { exec } = require("child_process");
  const migrate = exec("npx sequelize-cli db:migrate");

  migrate.stdout.on("data", (data: string | string[]) => {
    console.log("data=", data);
  });
})();

connectDB();

app.put("/:userId/:amount", async (req: Request, res: Response) => {
  try {
    const { userId, amount } = req.params;
    const user = await User.findOne({ where: { id: userId } });
    if (!userId || !Number(amount)) {
      return res.status(400).json({ error: "ivalid params" });
    }

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    user.balance = user.balance - Number(amount);
    if (user.balance < 0) {
      return res.status(400).json({ error: "Not enough funds on the balance" });
    }
    await user.save();
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
