import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Link
} from 'react-router-dom';
import Common from '../presentational/common';
import Admin from '../presentational/admin';
const Page = ({match}) => {
	const level = match.params.level;
	return(
		<div>
			<h3>{level}</h3>
			{
				level == 'common' ? (<Common></Common>)
					:level == 'admin'? (<Admin></Admin>)
						:level == 'super'?(<Super></Super>)
							: void 0
			}
		</div>
	);
};
const Pages = ({ match }) => (
	<div>
		<Route path={`${match.path}/:level`} component={Page}/>
	</div>
);
const PageRouter = () => (
	<Router>
		<div>
			<Route path="/access" component={Pages}/>
		</div>
	</Router>
);
export default PageRouter;