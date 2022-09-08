import { Request, Response } from 'express';
import TractorService from '../services/TractorService';
import AppError from '../errors/AppError';

class TractorController {
  public async getAllTractors(req: Request, res: Response): Promise<Response> {
    const { modelName } = req.query;
    try {
      const response = await TractorService.getAllTractors({ modelName });

      return res.json(response);
    } catch (error) {
      throw new AppError(error.message, 400);
    }
  }

  public async getTractorsByUserId(req: Request, res: Response): Promise<Response> {
    const { modelName } = req.query;
    try {
      const response = await TractorService.getTractorsByUserId({
        userId: req.user.id,
        modelName,
      });

      return res.json(response);
    } catch (error) {
      throw new AppError(error.message, 400);
    }

  }

  public async createTractor(req: Request, res: Response): Promise<Response> {
    try {
      const { manufacturer, modelName, power, year } = req.body;
      const response = await TractorService.create({
        userId: req.user.id,
        photo: req.file?.filename,
        manufacturer,
        modelName,
        power,
        year,
      });

      return res.json(response);
    } catch (error) {
      throw new AppError(error.message, 400);
    }
  }

  public async updateTractor(req: Request, res: Response): Promise<Response> {
    try {
      const { manufacturer, modelName, power, year } = req.body;
      const { tractorId } = req.params;

      const response = await TractorService.updateTractor({
        userId: req.user.id,
        photo: req.file?.filename,
        tractorId,
        manufacturer,
        modelName,
        power,
        year
      });

      return res.json(response);
    } catch (error) {
      throw new AppError(error.message, 400);
    }
  }

  public async deleteTractor(req: Request, res: Response): Promise<Response> {
    try {
      const { tractorId } = req.params;
      const userId = req.user.id;

      await TractorService.deleteTractor({ userId, tractorId });

      return res.json({ delete: true });
    } catch (error) {
      throw new AppError(error.message, 400);
    }

  }
}

export default new TractorController();
