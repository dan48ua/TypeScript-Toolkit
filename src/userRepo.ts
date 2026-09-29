import { User } from './dto'

type Users = Record<User['id'], Omit<User, 'id'>>
type UpdateUser = Partial<Omit<User, 'id'>>

export class UserRepo {
	private users: Users = {}

	createUser(user: User): boolean {
		if (this.users[user.id]) {
			throw Error('This user is already exists')
		}
		this.users = {
			...this.users,
			[user.id]: {
				name: user.name,
				birthday: user.birthday,
				role: user.role,
			},
		}
		return true
	}

	updateUser(id: string, user: UpdateUser): boolean {
		if (!this.users[id]) {
			throw Error('There`s no user with this ID')
		}
		this.users = {
			...this.users,
			[id]: { ...this.users[id], ...user },
		}
		return true
	}

	getUsers(): Users {
		return this.users
	}
}
