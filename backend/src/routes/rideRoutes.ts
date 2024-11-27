import express from "express";
import { estimateRide, confirmRide, getRideHistory } from "../controllers/rideController";
import { Request, Response, NextFunction } from "express";

const router = express.Router();

// Função wrapper para lidar com erros em rotas assíncronas
const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

// Rotas
router.post("/estimate", asyncHandler(estimateRide));
router.patch("/confirm", asyncHandler(confirmRide));
router.get("/:customer_id", asyncHandler(getRideHistory));

export default router;
