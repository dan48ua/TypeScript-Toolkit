export class EventBus {
	private listeners: Record<string, Function[] | undefined> = {}

	subscribe(eventType: 'user_deleted', listener: (id: string) => void): void
	subscribe(
		eventType: 'error',
		listener: (err: { code: number; message: string }) => void,
	): void

	subscribe(eventType: string, listener: Function): void {
		const currentListeners = this.listeners[eventType] ?? []

		this.listeners = {
			...this.listeners,
			[eventType]: [...currentListeners, listener],
		}
	}

	unsubscribe(eventType: 'user_deleted', listener: (id: string) => void): void
	unsubscribe(
		eventType: 'error',
		listener: (err: { code: number; message: string }) => void,
	): void

	unsubscribe(eventType: string, listener: Function): void {
		const currentListeners = this.listeners[eventType]

		if (!currentListeners) {
			return
		}

		this.listeners = {
			...this.listeners,
			[eventType]: currentListeners.filter(
				currentListener => currentListener !== listener,
			),
		}
	}

	notify(eventType: 'user_deleted', payload: string): void
	notify(eventType: 'error', payload: { code: number; message: string }): void

	notify(eventType: string, payload: unknown): void {
		const currentListeners = this.listeners[eventType]

		if (!currentListeners) {
			return
		}

		currentListeners.forEach(listener => {
			listener(payload)
		})
	}
}
