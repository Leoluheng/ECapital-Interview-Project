import './asset/App.css';
import EmployeeTable from './components/EmployeeTable';

function App() {
  return (
    <div className="App">
      <h1 align="center">ECapital Interview Assignment</h1>
      <h4 align="center">Table supporting CRUD operation</h4>
      <EmployeeTable></EmployeeTable>
    </div>
  );
}

export default App;
