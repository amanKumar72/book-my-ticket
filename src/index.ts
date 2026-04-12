import 'dotenv';
import { createServer } from 'http';
import app from './app.js'
const PORT: number = Number(process.env['PORT'] || 8080)

async function main() {
    try {
        const server = createServer(app)
        server.listen(PORT, () => {
            console.log(`Http server is running on PORT ${PORT}`)
        })
    } catch (error) {
        console.log(`Error starting http server`)
        throw error
    }
}

main()