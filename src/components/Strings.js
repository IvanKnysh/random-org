import {createRef, useEffect, useState} from 'react';
import axios from "axios";

const Strings = ({apiKey}) => {
	const [str, setStr] = useState([]);

	const length = createRef();
	const characters = createRef();
	const count = createRef();

	useEffect(() => {
		if (str.length) {
			axios.post('https://api.random.org/json-rpc/4/invoke', {
				jsonrpc: "2.0",
				method: "generateStrings",
				params: {
					apiKey: apiKey,
					length: str[0],
					characters: str[1],
					n: str[2]
				},
				id: 1
			})
				.then((response) => {
					const result = response.data.result.random.data.map(item => `<li>${item}</li>`);
					document.querySelector('.result2').insertAdjacentHTML('beforeend', `
						<h3>Результат: </h3>
						<ul>
							${result.join(' ')}
						</ul>
					`);
				})
				.catch((error) => {
					console.error(error);
				});
		}
	}, [str]);

	const strings = (e) => {
		e.preventDefault();

		if (length.current.value !== '' && characters.current.value !== '' && count.current.value !== '') {
			setStr([length.current.value, characters.current.value, count.current.value]);
		}
	}

	return (
		<div className="string">
			<h2>Задание 2 - Получить рандомные строки</h2>
			<form onSubmit={strings}>
				<input type="number" required name="length" ref={length} placeholder="Длинна строки. Например - 12" />
				<input type="text" required name="characters" ref={characters} placeholder="Использовать символы для рандома. Например - 'qwerty'" />
				<input type="number" required name="count" ref={count} placeholder="Сколько строк нужно вернуть. Например - 5" />
				<button>Получить рандомные строки</button>
			</form>
			<div className="result2"></div>
		</div>
	);
};

export default Strings;