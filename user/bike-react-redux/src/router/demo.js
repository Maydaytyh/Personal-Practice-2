import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Link
} from 'react-router-dom';
const Home = () => (
	<div>
		<h2>Home</h2>
	</div>
);
const About = () => (
	<div>
		<h2>About</h2>
	</div>
);
const Topic = ({match}) => (
	<div>
		<h3>{match.params.topicId}</h3>
	</div>
);
const Topics = ({ match }) => (
	<div>
		<h2>Topics</h2>
		<ul>
			<li>
				{/* 此处的match.url与match.path都是topics */}
				<Link to={`${match.url}/rendering`}>Rendering</Link>
			</li>
			<li>
				<Link to={`${match.url}/componnets`}>Components</Link>
			</li>
			<li>
				<Link to={`${match.url}/props-v-state`}>
					Props v.State
				</Link>
			</li>
		</ul>
		<Route path={`${match.path}/:topicId`} component={Topic}/>
		<Route exact path={match.path} render={()=>(
			<h3>请选择一个主题！</h3>
		)}/>	
	</div>
);
const BasicExample = () => (
	<Router>
		<div>
			<ul>
				<li>
					<Link to="/">Home</Link>
				</li>					
				<li>
					<Link to="/about">About</Link>
				</li>
				<li>
					<Link to="/topics">Topics</Link>						
				</li>
			</ul>
			<Route exact path="/" component={Home}/>
			<Route path="/about" component={About}/>
			<Route path="/topics" component={Topics}/>
		</div>
	</Router>
);
export default BasicExample;