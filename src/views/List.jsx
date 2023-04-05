import { ListItem } from '../components';

export function List({ data }) {
	return (
		<>
			<p>
				Hello from the <code>/list</code> page!
			</p>
			<ul>
				{data.map((data, i) => (
					<ListItem 
					key={i} 
					name={data.name} 
					/>
				))}
			</ul>
		</>
	);
}
