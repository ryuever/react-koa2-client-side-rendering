import Router from 'koa-router';
import { Questionnaire, Type, Option } from '../controllers'; 
import fs from 'fs';
import path from 'path';

const getRouter = new Router();

const apiRouter = new Router({
  prefix: '/api/v1',
})

apiRouter.post('/questionnaire', Questionnaire.createQuestionnaire);

apiRouter.post('/type', Type.createType);
apiRouter.get('/type', Type.getType);

apiRouter.post('/type/:typeId/options', Option.createOptions);
apiRouter.get('/type/:typeId/options', Option.getOptions);

getRouter.get('*', (ctx, next) => {
  ctx.type = 'html';
  ctx.body = fs.createReadStream(path.join(__dirname, '..', '..', 'dist', 'index.html'));  
});

// export default router;
const router = { getRouter, apiRouter };

export default router;  