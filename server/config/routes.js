import Router from 'koa-router';
import { Questionnaire } from '../controllers'; 
import fs from 'fs';
import path from 'path';

const getRouter = new Router();

getRouter.get('*', (ctx, next) => {
  ctx.type = 'html';
  ctx.body = fs.createReadStream(path.join(__dirname, '..', '..', 'dist', 'index.html'));  
});

const apiRouter = new Router({
  prefix: '/api/v1',
})

apiRouter.post('/questionnaire', Questionnaire.postQuestionnaire);

// export default router;
const router = { getRouter, apiRouter };

export default router;  