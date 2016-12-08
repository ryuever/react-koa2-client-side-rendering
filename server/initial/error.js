import Err from '../utils/Err';
import { ZH, JP, EN } from '../locales/errors';
import Code from '../config/error.js';

Err.setLocale('zh', ZH);
Err.setLocale('en', EN);
Err.setLocale('jp', JP);
Err.setCode(Code);