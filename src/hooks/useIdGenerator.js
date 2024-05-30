import { useRef } from "react"

const useIdGenerator = initialValue => {
	const id = useRef(typeof initialValue === 'number' ? initialValue : 0);

	const getId = () => id.current++;
	const setId = value => id.current = value;

	return [getId, setId];
}

export default useIdGenerator;