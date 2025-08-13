import TodoList from './components/TodoList';
import './App.css';
import { createTheme, ThemeProvider } from '@mui/material';
// import { orange } from '@mui/material/colors';
import { todosContext } from './contexts/TodosContext';
import { v4 as uuidv4} from 'uuid';
import { useState } from 'react';


const theme = createTheme({
  typography: {
    fontFamily: ['Alexandria'],
  },
  palette: {
    primary:{
      main:"#dd2c00"
    }
  }
});

const initialTodos = [
    {
        id: uuidv4(),
        title: "مهمه 1",
        details: "تسيلاؤتنسيلاترلاس",
        isCompleted: false
    },
    {
        id: uuidv4(),
        title: "مهمه 1",
        details: "تسيلاؤتنسيلاترلاس",
        isCompleted: false
    },
    {
        id: uuidv4(),
        title: "مهمه 1",
        details: "تسيلاؤتنسيلاترلاس",
        isCompleted: false
    },
    
]

function App() {
  const [todos, setTodos] = useState(initialTodos);
  return (
    <ThemeProvider theme={theme}  >
      <div className="App" style={{display:"flex", justifyContent:"center", alignItems:"center" ,background:"#191b1f", height:"100vh", direction:"rtl"}} >
        <todosContext.Provider value={{todos, setTodos}} >
          <TodoList />
        </todosContext.Provider>
        </div>
    
      </ThemeProvider>
  );
}

export default App;
