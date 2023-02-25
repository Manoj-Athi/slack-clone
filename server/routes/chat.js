import express from 'express'

import { createWorkSpace, fetchWorkSpace , selectWorkSpace, addUserToWorkspace} from '../controllers/workSpace.js'
import { createGroupChannel, createDirectChannel } from '../controllers/channel.js';
import ensureAuth from '../middleware/ensureAuth.js'
import { sendMessage, fetchMessages, fetchAllUnreadMessages , setMessageRead} from '../controllers/message.js'

const router = express.Router()

// ------------ create workspace ------------- //
router.post('/workspace/create', ensureAuth, createWorkSpace)

// ------------ fetch all workspace ------------- //
router.get('/workspace/fetch-all', ensureAuth, fetchWorkSpace)

// ------------ fetch current workspace ------------- //
router.post('/workspace/current', ensureAuth, selectWorkSpace)

// ------------ create new channel ------------- //
router.post('/channel/create', ensureAuth, createGroupChannel)
router.post('/channel/create-direct', ensureAuth, createDirectChannel)

// ------------ add user to new workspace ------------- //
router.patch('/workspace/add-user', ensureAuth, addUserToWorkspace)

// ------------ send message in channel ------------- //
router.post('/message/', ensureAuth, sendMessage)

// ------------ fetch all messages in a channel ------------- //
router.get('/message/', ensureAuth, fetchMessages)
// ------------ mark messages read in a workspaces ------------- //
router.post('/read', ensureAuth, setMessageRead)

// ------------ fetch all unread messages in a workspaces ------------- //
router.get('/unread-message/', ensureAuth, fetchAllUnreadMessages)


export default router;