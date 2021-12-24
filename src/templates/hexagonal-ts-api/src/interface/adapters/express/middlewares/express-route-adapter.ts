import { Request, Response } from 'express';
import { Controller } from '@interface/api/rest';

export const adaptRoute = (controller: Controller) => async (req: Request, res: Response) => {
  const request = {
    ...(req.body || {}),
    ...(req.params || {}),
  };
  const httpResponse = await controller.handle(request);
  if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
    res.status(httpResponse.statusCode).json(httpResponse.body);
  } else {
    res.status(httpResponse.statusCode).json({
      error: httpResponse.body.message,
    });
  }
};
