import type { Request, Response } from 'express'
import * as authService from './auth.service'
import type { IUser } from './dto/register.dto'
import type { ILogin } from './dto/login.dto'

export const register = async (req: Request, res: Response) => {
    try {
        const data: IUser = req.body
        const user = await authService.register(data)
        res.status(201).json(user)
    } catch (error) {
        console.log(`Error registering user`)
        throw error
    }

}
export const login = async (req: Request, res: Response) => {
    try {
        const data: ILogin = req.body
        const token = await authService.login(data)
        res.cookie('token', token.token, { httpOnly: true, secure: true })
        res.status(200).json(token)
    } catch (error) {
        console.log(`Error logging in user`)
        throw error
    }
}
export const me = async (req: Request, res: Response) => {
    try {
        const user = await authService.getMe(req.user?.userId)
        res.status(200).json({ user })
    } catch (error) {
        console.log(`Error getting user info`)
        throw error
    }
}

export const logout = async (_req: Request, res: Response) => {
    res.clearCookie('token', { httpOnly: true, secure: true })
    res.status(200).json({ message: 'Logout successful' })
}