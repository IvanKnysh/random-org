import {createRef, useEffect, useState} from 'react';
import axios from "axios";

const UUIDs = ({apiKey}) => {
	const [id, setId] = useState(0);

	const count = createRef();

	useEffect(() => {
		if (id.length) {
			axios.post('https://api.random.org/json-rpc/4/invoke', {
				jsonrpc: "2.0",
				method: "generateUUIDs",
				params: {
					apiKey: apiKey,
					n: id
				},
				id: 1
			})
				.then((response) => {
					const result = response.data.result.random.data.map(item => `<li>${item}</li>`);
					document.querySelector('.result3').insertAdjacentHTML('beforeend', `
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
	}, [id]);

	const uuids = (e) => {
		e.preventDefault();

		if (count.current.value !== '') {
			setId(count.current.value);
		}
	}

	return (
		<div className="uuids">
			<h2>Задание 3 - Получить рандомные UUIDs</h2>
			<form onSubmit={uuids}>
				<input type="number" required name="count" ref={count} placeholder="Сколько ID нужно получить. Например - 5" />
				<button>Получить рандомные UUIDs</button>
			</form>
			<div className="result3"></div>
		</div>
	);
};

export default UUIDs;