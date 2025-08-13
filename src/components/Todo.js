import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';

// ICONS
import CheckIcon from '@mui/icons-material/Check';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import { useContext, useState } from 'react';
import { todosContext } from '../contexts/TodosContext';


// DIALOG
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';




export default function Todo({ todo, handleCheck }) {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [showUpdateDialog, setShowUpdateDialog] = useState(false);
    const [updatedTodo, setUpdatedTodo] = useState({ title: todo.title, details: todo.details });
    const {todos, setTodos} = useContext(todosContext);
    // EVENT HANDLERS
    function handleCheckClick() {
        const updatedTodos = todos.map((t) => {
            if(t.id == todo.id) {
                t.isCompleted = !t.isCompleted
            } 

            return t;
        });
        setTodos(updatedTodos);
        localStorage.setItem("todos", JSON.stringify(updatedTodos) );
    }
    function handleDeleteClick() {
        setShowDeleteDialog(true);
    }
    function handleDeleteDialogClose() {
        setShowDeleteDialog(false);
    }
    
    function handleDeleteConfirm() {
        const updatedTodos = todos.filter((t) => {
            return t.id != todo.id;
        })
        setTodos(updatedTodos);
        localStorage.setItem("todos", JSON.stringify(updatedTodos) );
    }
    
    function handleUpdateClose() {
        setShowUpdateDialog(false);
    }
    function handleUpdateClick() {
        setShowUpdateDialog(true);
    }

    function handleUpdateConfirm() {
        const updatedTodos = todos.map((t) => {
            if(t.id == todo.id) {
                return {...t, title:updatedTodo.title, details:updatedTodo.details}
            }else {
                return t;
            }
        });

        setTodos(updatedTodos);
        setShowUpdateDialog(false);
        localStorage.setItem("todos", JSON.stringify(updatedTodos) );
    }

    //==== EVENT HANDLERS =====
    return (
        <>
        {/* DELETE DIALOG */}
            <Dialog
            style={{direction:"rtl"}}
            open={showDeleteDialog}
            onClose={handleDeleteDialogClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
                <DialogTitle id="alert-dialog-title">
                هل أنت متأكد من رغبتك فى حذف المهمه؟
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    لا يمكنك التراجع عن الحذف بعد إتمامه
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleDeleteDialogClose} >إغلاق</Button>
                <Button  autoFocus onClick={handleDeleteConfirm} >
                    نعم,قم بالحذف
                </Button>
                </DialogActions>
        </Dialog>
        {/* ==DELETE DIALOG== */}
        {/* UPDATE DIALOG */}
        <Dialog
            style={{direction:"rtl"}}
            open={showUpdateDialog}
            onClose={handleUpdateClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
                <DialogTitle id="alert-dialog-title">
                تعديل المهمه
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <TextField
                autoFocus
                required
                margin="dense"
                id="name"
                label="عنوان المهمه"
                
                fullWidth
                variant="standard"
                value={updatedTodo.title}
                onChange={(e) => {setUpdatedTodo({...updatedTodo, title: e.target.value})}}
            />
                    <TextField
                autoFocus
                required
                margin="dense"
                id="name"
                name="email"
                label="التفاصيل"
                
                fullWidth
                variant="standard"
                value={updatedTodo.details}
                onChange={(e) => {setUpdatedTodo({...updatedTodo, details: e.target.value})}}
            />
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleUpdateClose} >إغلاق</Button>
                <Button  autoFocus onClick={handleUpdateConfirm} >
                    تأكيد
                </Button>
                </DialogActions>
        </Dialog>
        {/* ==UPDATE DIALOG== */}
            <Card className='todoCard' sx={{ minWidth: 275, background: "#283593", color: "white", marginTop: "5px" }}>
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid size={8}>
                            <Typography variant='h5' gutterBottom sx={{ textAlign: "right" , textDecoration: todo.isCompleted? "line-through":"none" }} >
                                {todo.title}
                            </Typography>
                            <Typography variant='h6' gutterBottom sx={{ textAlign: "right" }} >
                                {todo.details}
                            </Typography>
                        </Grid>
                        {/* ACTION BUTTONS */}
                        <Grid size={4} display="flex" justifyContent="space-around" alignItems="center" >
                            {/* CHECK ICON BUTTON */}
                            <IconButton onClick={() => {
                                handleCheckClick();
                            }} className="iconButton" aria-label="delete" style={{color:  todo.isCompleted ? "white" : "#8bc348", background: todo.isCompleted ? "#8bc34a" :"white", border:"solid #8bc348 3px"}} >
                                <CheckIcon />
                            </IconButton>
                            {/*== CHECK ICON BUTTON ==*/}
                            {/* UPDATE ICON BUTTON */}
                            <IconButton onClick={handleUpdateClick} className="iconButton" aria-label="delete" style={{color:"#1769aa", background:"white", border:"solid #1769aa 3px"}} >
                                <ModeEditOutlineOutlinedIcon />
                            </IconButton>
                            {/*== UPDATE ICON BUTTON ==*/}
                            {/* DELETE ICON BUTTON */}
                            <IconButton onClick={handleDeleteClick} className="iconButton" aria-label="delete" style={{color:"#b23c17", background:"white", border:"solid #b23c17 3px"}} >
                                <DeleteOutlineOutlinedIcon />
                            </IconButton>
                            {/* ==DELETE ICON BUTTON== */}
                        </Grid>
                        {/*=== ACTION BUTTONS ===*/}
                    </Grid>

                </CardContent>

            </Card>
        </>
    );
}