import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { number, object, string } from 'yup';
import { useFormik } from 'formik';

import { DataGrid } from '@mui/x-data-grid';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';





export default function Subcourse() {
    const [open, setOpen] = React.useState(false);
    const [data, setData] = React.useState([]);
    const [update, setUpdate] = React.useState(null);

    // console.log(data);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        formik.resetForm();
        setUpdate(null);
    };

    let subcourseSchema = object({
        name: string().required("Please entre name"),
        description: string().required("Please entre description").min(5, "Please entre minimum 5 charactrer in message"),
        duration: string().required("Please entre duration"),
        fees: number().required("Please entre fees")
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            duration: '',
            fees:''
        },

        validationSchema: subcourseSchema,

        onSubmit: (values, { resetForm }) => {

            if (update) {
                handleUpdateData(values)
            } else {
                handleAdd(values)
            }

            resetForm();
            handleClose();
        },
    });


    const { handleSubmit, handleChange, handleBlur, errors, touched, values, setValues } = formik;


    const getData = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/v1/subcourses/list-subcourses");
            const data = await response.json();
            console.log(data);
            setData(data.data);
        } catch (error) {
            console.log(error);
        }
    }

    React.useEffect(() => {
        getData();
    }, [])


    const handleAdd = async (data) => {
        console.log(data);

       try {
           await fetch("http://localhost:8000/api/v1/subcourses/add-subcourses", {
               method: "POST",
               headers: {
                   "Content-Type": "application/json",
               },
               body: JSON.stringify(data)
           })
       } catch (error) {
           console.log(error);
       }
       getData();
   }


    const handleDelete = async (data) => {

        try {
            await fetch("http://localhost:8000/api/v1/subcourses/delete-subcourses/" + data._id, {
                method: "DELETE",
            })
        } catch (error) {
            console.log(error);
        }
        getData();
    }

    const handlEdit = (data) => {
        // console.log(data);
        setOpen(true);
        setValues(data);
        setUpdate(data._id);
    }

    const handleUpdateData = async (data) => {

        try {
            await fetch("http://localhost:8000/api/v1/subcourses/update-subcourses/" + data._id, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            })
        } catch (error) {
            console.log(error);
        }

        getData();
    }

    const columns = [
        { field: 'name', headerName: 'Name', width: 130 },
        { field: 'description', headerName: 'Description', width: 130 },
        { field: 'duration', headerName: 'Duration', width: 130 },
        { field: 'fees', headerName: 'Fees', width: 130 },
        {
            field: 'Action',
            headerName: 'Action',
            width: 130,
            renderCell: (params) => (
                <>
                    <IconButton aria-label="delete" size="large" onClick={() => handlEdit(params.row)}>
                        <EditIcon />
                    </IconButton>

                    <IconButton aria-label="delete" size="large" onClick={() => handleDelete(params.row)}>
                        <DeleteIcon />
                    </IconButton>
                </>
            )


        }

    ];



    return (
        <>
            <React.Fragment>
                <Button variant="outlined" onClick={handleClickOpen}>
                    Add Subcourse
                </Button>
                <Dialog
                    open={open}
                    onClose={handleClose}
                >
                    <DialogTitle>Subcourse</DialogTitle>
                    <form onSubmit={handleSubmit}>
                        <DialogContent>
                            <TextField
                                margin="dense"
                                id="name"
                                name="name"
                                label="Course Name"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.name}
                                error={errors.name && touched.name ? true : false}
                                helperText={errors.name && touched.name ? errors.name : ''}
                            />
                            <TextField
                                margin="dense"
                                id="name"
                                name="description"
                                label="Course Description"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.description}
                                error={errors.description && touched.description ? true : false}
                                helperText={errors.description && touched.description ? errors.description : ''}
                            />
                            <TextField
                                margin="dense"
                                id="name"
                                name="duration"
                                label="Course Duration"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.duration}
                                error={errors.duration && touched.duration ? true : false}
                                helperText={errors.duration && touched.duration ? errors.duration : ''}
                            />
                             <TextField
                                margin="dense"
                                id="name"
                                name="fees"
                                label="Course Fees"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.fees}
                                error={errors.fees && touched.fees ? true : false}
                                helperText={errors.fees && touched.fees ? errors.fees : ''}
                            />
                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button
                                    type="submit"
                                >{update ? 'Update' : 'Add'}</Button>
                            </DialogActions>
                        </DialogContent>
                    </form>


                </Dialog>
            </React.Fragment>

            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={data}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                    getRowId={rows => rows._id}
                />
            </div>
        </>
    );
}