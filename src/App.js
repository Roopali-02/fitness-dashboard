import React from 'react';
import Layout from './components/Layout';
import Dashboard from './scenes/Dashboard';
import Footer from './components/Footer';
import Facilities from './scenes/Facilities';
import {Routes,Route} from 'react-router-dom';

const App = ()=>{
	return (
		<div className="app">
			<Layout>
				<Routes>
					<Route path='/' element={<Dashboard />} />
					<Route element={<Facilities />} />
				</Routes>
				<Footer></Footer>
			</Layout>
		</div>
	);
}

export default App;
