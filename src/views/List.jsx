import { ListItem } from '../components';

export function List({ data }) {
	return (
		<>
			<p>
				Hello from the <code>/list</code> page!
			</p>
			<ul>
				{/**
				 * TODO: write some JavaScript that renders the `data` array of objects
				 * using the `ListItem` component that's imported at the top
				 * of this file.
				 */}
				{data.map((data, i) => (
					<ListItem key={i} name={data.name} />
				))}
			</ul>
		</>
	);
}
