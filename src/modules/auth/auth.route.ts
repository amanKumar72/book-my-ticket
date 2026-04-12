import express from 'express'
import * as authController from './auth.controller'
import RegisterDto from './dto/register.dto'
import LoginDto from './dto/login.dto'
import validateBody from '@/common/middleware/validateBody'
import { isAuthenticated } from './auth.middleware'

const router = express.Router()

router.post('/register', validateBody(RegisterDto), authController.register)

router.post('/login', validateBody(LoginDto), authController.login)

router.get('/me', isAuthenticated, authController.me)  

router.post('/logout', isAuthenticated, authController.logout)

export default router
