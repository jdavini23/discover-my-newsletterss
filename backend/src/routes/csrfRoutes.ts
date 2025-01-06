import express, { Request, Response } from 'express';

const csrfRouter = express.Router();

// Route to retrieve CSRF token
csrfRouter.get('/csrf-token', (req: Request, res: Response) => {
  // The generateCsrfToken middleware will have already set res.locals.csrfToken
  res.json({ 
    csrfToken: res.locals.csrfToken 
  });
});

export default csrfRouter;
