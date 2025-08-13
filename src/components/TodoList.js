
// import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';

import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ToggleButton from '@mui/material/ToggleButton';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


// Icons
// import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
// import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
// import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
// import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';

// Components
import Todo from './Todo';

// OTHERS
import { todosContext } from '../contexts/TodosContext';
import { useContext, useState, useEffect } from 'react';
import { v4 as uuidv4} from 'uuid';
import { ToggleButtonGroup } from '@mui/material';






export default function TodoList() {
    const { todos, setTodos } = useContext(todosContext);
    
    const [titleInput, setTitleInput] = useState("");
    const [displayTodosType, setDisplayTodosType] = useState("all");

    // filteration arrays
    const CompletedTodos = todos.filter((t) => {
        return t.isCompleted;
    });

    const notCompletedTodos = todos.filter((t) => {
        return !t.isCompleted;
    });

    let todosToBeRendered = todos;
    
    if (displayTodosType == "completed") {
        todosToBeRendered = CompletedTodos;
    }else if (displayTodosType == "non-completed" ) {
        todosToBeRendered = notCompletedTodos;
    }else {
        todosToBeRendered = todos;
    }

    const todosJsx = todosToBeRendered.map((t) => {
        return <Todo key={t.id} todo={t}  />;
    });

    

    useEffect(() => {
        const storageTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
        setTodos(storageTodos);
    }, []);

    function changeDisplayedType(e) {
        setDisplayTodosType(e.target.value);
    }

    function handleAddClick() {
        const newTodo = {
            id: uuidv4(),
            title: titleInput,
            details: "",
            isCompleted: false
        }

        const updatedTodos = [...todos, newTodo];
        setTodos(updatedTodos);
        localStorage.setItem("todos", JSON.stringify(updatedTodos) );
        setTitleInput("");
    }

    
    return (
            <Container maxWidth="sm">
        <Card sx={{ minWidth: 275 }} style={{maxHeight:"80vh", overflow:"scroll"}}>
                <CardContent>
                    <Typography variant='h2' gutterBottom style={{fontWeight:"bold"}} >
                    مهامى
                    <Divider />
                    </Typography>
                    
                    {/* FILTER BUTTONS */}
                    <ToggleButtonGroup 
                        style={{direction:"ltr", marginTop:"30px"}}
                        value={displayTodosType}
                        exclusive
                        onChange={changeDisplayedType}
                        aria-label='text alignment'
                        color='primary'
                    >
                            <ToggleButton value="non-completed" >
                            غير المنجز
                            </ToggleButton>
                            <ToggleButton value="completed" >
                            المنجز
                            </ToggleButton>
                        <ToggleButton value="all">
                            الكل
                            </ToggleButton>
                        </ToggleButtonGroup>
                        
                    {/* =====FILTER BUTTONS==== */}
                    {/* ALL TODOS */}
                    {todosJsx}
                    {/*=== ALL TODOS ===*/}
                    {/* INPUT + ADD BUTTON */}
                    <Grid container style={{marginTop:"20px"}} spacing={2}>
                        <Grid size={8}  >
                            <TextField style={{width:"100%"}} id="outlined-basic" label="عنوان المهمه" variant="outlined" value={titleInput} onChange={(e) => {setTitleInput(e.target.value);}} />
                        </Grid>
                        <Grid size={4} style={{ display:"flex", justifyContent:"space-around", alignItems:"center"}} >
                            <Button style={{width:"100%", height:"100%"}} variant="contained" onClick={() => {
                                handleAddClick();
                            }}
                            disabled={titleInput.length == 0}
                            >إضافه</Button>
                        </Grid>
                    </Grid>
                    {/*== INPUT + ADD BUTTON ==*/}
                </CardContent>
                
            </Card>
            </Container>
    );
}