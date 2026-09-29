import { EventBus } from './eventBus'
import { Logger } from './logger'
import { UserRepo } from './userRepo'
import { Validation } from './validation'

const validation = new Validation()
const userRepo = new UserRepo()
const eventBus = new EventBus()
const logger = new Logger()

eventBus.subscribe('user_deleted', id => {
	logger.info(
		`Событие шины: Пользователь с ID "${id}" успешно удален из системы.`,
	)
})

eventBus.subscribe('error', err => {
	logger.error(`Событие шины: Системный сбой код ${err.code} — ${err.message}`)
})

const dirtyDataFromApi: unknown = {
	id: 'usr-48',
	name: 'Данил',
	birthday: 1719522000,
	role: 'admin',
}

logger.info('Запуск интеграционного пайплайна...')

try {
	if (validation.isUser(dirtyDataFromApi)) {
		logger.info(
			`Данные успешно валидированы. Тип сужен до User для: ${dirtyDataFromApi.name}`,
		)

		userRepo.createUser(dirtyDataFromApi)
		logger.info(
			`Пользователь "${dirtyDataFromApi.name}" успешно занесен в UserRepo.`,
		)

		console.log('Текущее состояние репозитория:', userRepo.getUsers())
	} else {
		eventBus.notify('error', {
			code: 400,
			message: 'Входящий payload не соответствует интерфейсу User',
		})
	}

	eventBus.notify('user_deleted', 'usr-48')
} catch (err: any) {
	eventBus.notify('error', {
		code: 500,
		message: err.message ?? 'Unknown runtime error',
	})
}
