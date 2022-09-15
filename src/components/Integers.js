import {createRef, useEffect, useState} from 'react';
import axios from "axios";

const Integers = ({apiKey}) => {
	const [int, setInt] = useState([]);

	const min = createRef();
	const max = createRef();
	const count = createRef();

	useEffect(() => {
		if (int.length) {
			axios.post('https://api.random.org/json-rpc/4/invoke', {
				jsonrpc: "2.0",
				method: "generateIntegers",
				params: {
					apiKey: apiKey,
					min: int[0],
					max: int[1],
					n: int[2]
				},
				id: 1
			})
				.then((response) => {
					document.querySelector('.result').insertAdjacentHTML('beforeend', `
						<h3>Результат: </h3>
						<p>${response.data.result.random.data.join(', ')}</p>
					`);
				})
				.catch((error) => {
					console.error(error);
				});
		}
	}, [int]);

	const integer = (e) => {
		e.preventDefault();

		if (min.current.value !== '' && max.current.value !== '' && count.current.value !== '') {
			setInt([min.current.value, max.current.value, count.current.value]);
		}
	}

	return (
		<div className="integer">
			<h2>Задание 1 - Получить рандомные значеня</h2>
			<form onSubmit={integer}>
				<input type="number" required name="min" ref={min} placeholder="Введите минимальное значение. Например - 1" />
				<input type="number" required name="max" ref={max} placeholder="Введите максимальное значение. Например - 10" />
				<input type="number" required name="count" ref={count} placeholder="Сколько чисел нужно вернуть. Например - 7" />
				<button>Получить рандомные значения</button>
			</form>
			<div className="result"></div>
		</div>
	);
};

export default Integers;