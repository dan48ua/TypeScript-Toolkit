export class Logger {
	info(message: string): void {
		console.log(`[INFO] [${new Date().toLocaleTimeString()}]: ${message}`)
	}

	error(message: string): void {
		console.error(`[ERROR] [${new Date().toLocaleTimeString()}]: ${message}`)
	}
}
