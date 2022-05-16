import express from 'express'

import { createWorkSpace, fetchWorkSpace , selectWorkSpace, addUserToWorkspace} from '../controllers/workSpace.js'
import { createNewChannel } from '../controllers/channel.js';
import ensureAuth from '../middleware/ensureAuth.js'

const router = express.Router()

// ------------ create workspace ------------- //
router.post('/workspace/create', ensureAuth, createWorkSpace)

// ------------ fetch all workspace ------------- //
router.get('/workspace/fetch-all', ensureAuth, fetchWorkSpace)

// ------------ fetch current workspace ------------- //
router.post('/workspace/current', ensureAuth, selectWorkSpace)

// ------------ create new channel ------------- //
router.post('/channel/create', ensureAuth, createNewChannel)

// ------------ add user to new workspace ------------- //
router.patch('/workspace/add-user', ensureAuth, addUserToWorkspace)



export default router;