import { Request, Response, Router } from "express";
import { STATUS_CODES } from "../constants/api.enum";

const Test = () => {
  const router: Router = Router();

  router.get("/", async (req: Request, res: Response) => {
    return res.status(STATUS_CODES.OK).json({
      success: true,
      message: "success",
      code: STATUS_CODES.OK
    });
  });

  return router;
}

export default Test;