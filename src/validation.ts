import { User } from './dto'

export class Validation {
	isUser(x: unknown): x is User {
		if (typeof x !== 'object' || x === null) {
			return false
		}
		const user = x as Record<string, unknown>
		return (
			typeof user['id'] === 'string' &&
			typeof user['name'] === 'string' &&
			typeof user['birthday'] === 'number' &&
			(user['role'] === 'admin' || user['role'] === 'user')
		)
	}
}
