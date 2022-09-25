import { Router } from 'express'

const router = Router()

router.route('/signup').post((req, res) => res.send('POST signup'))
router.route('/login').post((req, res) => res.send('POST login'))
router.route('/logout').post((req, res) => res.send('POST logout'))

export default router
