import { ipcMain } from 'electron';

import memorandum from './memorandum';
import login from './login';
import register from './register';

const controllers = [];

controllers.push(new memorandum());
controllers.push(new login());
controllers.push(new register());
