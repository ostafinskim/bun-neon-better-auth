import { auth } from '@/lib/auth'
import { routeNotFound } from '@/middleware'
import { toNodeHandler } from 'better-auth/node'
import cors from 'cors'
import express from 'express'
import morgan from 'morgan'

const app = express()
const PORT = process.env.PORT || 3333

app.use(morgan('dev'))
app.use(cors({
	origin: '*',
	credentials: true
}))

// better auth
app.all("/api/auth/{*any}", toNodeHandler(auth));

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.get('/health', (req, res) => {
	res.status(200).json({ message: 'ok' })
})

// not found
app.use(routeNotFound)

// error

async function main() {
	try {
		app.listen(PORT, () => {
			console.log(`Server is running on http://localhost:${PORT}`)
		})
	} catch (error) {
		console.error(error)
		process.exit(1)
	}
}

main()