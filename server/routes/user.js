import express from 'express'

import ensureAuth from '../middleware/ensureAuth.js'
import { searchUser } from '../controllers/user.js'

const router = express.Router();

// ------------ search user ------------- //
router.get('/', ensureAuth, searchUser);

export default router;