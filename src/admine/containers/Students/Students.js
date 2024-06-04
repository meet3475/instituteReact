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





export default function Students() {
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
        roll_no: number().required("Please entre Roll no."),
        email: string().email().required("Please entre Email."),
        mobile_no:number().required("Please entre Phone no."),
        address: string().required("Please entre  address").min(5, "Please entre minimum 5 charactrer in message"),
        DOB: string().required("Please entre Birthdate"),
        password:string().required("Please entre Password")
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            roll_no: '',
            email: '',
            mobile_no: '',
            address:'',
            DOB:'',
            password:''
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
            const response = await fetch("http://localhost:8000/api/v1/students/list-students");
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
            await fetch("http://localhost:8000/api/v1/students/update-students", {
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
            await fetch("http://localhost:8000/api/v1/students/delete-students/" + data._id, {
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
            await fetch("http://localhost:8000/api/v1/students/update-students/" + data._id, {
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
        { field: 'roll_no', headerName: 'Roll no', width: 130 },
        { field: 'email', headerName: 'Email', width: 130 },
        { field: 'mobile_no', headerName: 'Mobile no', width: 130 },
        { field: 'address', headerName: 'Address', width: 130 },
        { field: 'DOB', headerName: 'Birth Date', width: 130 },
        { field: 'password', headerName: 'Password', width: 130 },
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
                    Add Students
                </Button>
                <Dialog
                    open={open}
                    onClose={handleClose}
                >
                    <DialogTitle>Students</DialogTitle>
                    <form onSubmit={handleSubmit}>
                        <DialogContent>
                            <TextField
                                margin="dense"
                                id="name"
                                name="name"
                                label="Students Name"
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
                                name="roll_no"
                                label="Students Roll no."
                                type="number"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.roll_no}
                                error={errors.roll_no && touched.roll_no ? true : false}
                                helperText={errors.roll_no && touched.roll_no ? errors.roll_no : ''}
                            />
                            <TextField
                                margin="dense"
                                id="name"
                                name="email"
                                label="Students email"
                                type="email"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                                error={errors.email && touched.email ? true : false}
                                helperText={errors.email && touched.email ? errors.email : ''}
                            />
                            <TextField
                                margin="dense"
                                id="name"
                                name="mobile_no"
                                label="Students Mobile no."
                                type="number"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.mobile_no}
                                error={errors.mobile_no && touched.mobile_no ? true : false}
                                helperText={errors.mobile_no && touched.mobile_no ? errors.mobile_no : ''}
                            />
                             <TextField
                                margin="dense"
                                id="name"
                                name="address"
                                label="Students Address"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.address}
                                error={errors.address && touched.address ? true : false}
                                helperText={errors.address && touched.address ? errors.address : ''}
                            />
                             <TextField
                                margin="dense"
                                id="name"
                                name="DOB"
                                label="Students DOB"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.DOB}
                                error={errors.DOB && touched.DOB ? true : false}
                                helperText={errors.DOB && touched.DOB ? errors.DOB : ''}
                            />
                             <TextField
                                margin="dense"
                                id="name"
                                name="password"
                                label="Students Password"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                                error={errors.password && touched.password ? true : false}
                                helperText={errors.password && touched.password ? errors.password : ''}
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