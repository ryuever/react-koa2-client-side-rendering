import Router from 'koa-router';
import { Questionnaire } from '../controllers'; 

const router = new Router({
  prefix: '/api/v1',
});

router.post('*', Questionnaire.postQuestionnaire);

export default router;