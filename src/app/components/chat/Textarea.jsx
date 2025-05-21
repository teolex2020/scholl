'use client'

import { useState, useEffect, useRef } from 'react'

const GrowingTextArea = (props) => {
	const [textAreaValue, setTextAreaValue] = useState()
	const textAreaRef = useRef(null)

	useEffect(() => {
		if (textAreaRef.current) {
			textAreaRef.current.style.height = 'auto'
			textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`
		}
	}, [textAreaValue, props.value])

const handleInputChange = (event) => {
	props.onChange
		? props.onChange(event)
		: setTextAreaValue((prev) => event.target.value)
}

	const handleContentKeyDown = (e) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault()

			const form = textAreaRef.current?.closest('form')
			if (form) {
				form.requestSubmit()
			}
		}
	}

	const handleInput = () => {
		if (textAreaRef.current) {
			textAreaRef.current.style.height = 'auto'
			textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`
		}
	}

	return (
		<textarea
			{...props}
			ref={textAreaRef}
			value={props.value ?? textAreaValue}
			onChange={handleInputChange}
			onKeyDown={handleContentKeyDown}
			onInput={handleInput}
			style={{ resize: 'none', width: '100%' }}
			rows={1}
			placeholder='Type your message...'
		/>
	)
}

export default GrowingTextArea
