import Router from 'koa-router';
import { Questionnaire } from '../controllers'; 
console.log('questionnaire ', Questionnaire);

const router = new Router({
  prefix: '/v1',
});

router.post('*', Questionnaire.postQuestionnaire);
// router.post('/postQuestionnaire', Questionnaire.postQuestionnaire);

export default router;