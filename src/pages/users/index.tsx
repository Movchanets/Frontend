import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef, GridApi, GridCellValue } from "@mui/x-data-grid";
import Loader from "../../components/loader";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { Link } from 'react-router-dom';
import { Button, ButtonGroup, InputLabel, MenuItem, Select, SelectChangeEvent, TablePagination } from '@mui/material';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';





const Users: React.FC<any> = () => {
  const { UserBlock, UserUnblock, UserDelete } = useActions();
  const { GetUsers } = useActions();
  const { loading, allUsers } = useTypedSelector((state) => state.UserReducer);
  const [pageSize, setPageSize] = useState(5);
  const [page, setPage] = useState(0);
  const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  const AlertDialogSlide: React.FC<any> = ({ email }) => {
    const [open, setOpen] = React.useState(false);



    const handleClickOpen = () => {
      setOpen(true);

    };

    const handleClose = () => {
      setOpen(false);

    };

    async function DoAction() {


      await UserDelete(email);
      await GetUsers(page, pageSize);
      handleClose();
    }


    return (
      <div>
        <Button variant="outlined" onClick={handleClickOpen}>
          Delete
        </Button>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted

          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"Delete this user?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              You cannot undo this action
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            <Button onClick={DoAction}>Agree</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
  const columns: GridColDef[] = [
    { field: "userName", headerName: "UserName", width: 170 },
    { field: "name", headerName: "Name", width: 170 },
    { field: "surname", headerName: "Surname", width: 230 },
    { field: "email", headerName: "Email", width: 130 },
    { field: "emailConfirm", headerName: "Confirmed email", width: 130 },
    { field: "role", headerName: "Role", width: 130 },
    { field: "isBlocked", headerName: "isBlocked", width: 130 },
    {
      field: 'Block',
      headerName: 'Block',
      sortable: false,

      renderCell: (params) => {


        const isblocked = params.row.isBlocked;
        async function onClick(e: any) {

          e.stopPropagation(); // don't select this row after clicking



          const email = params.row.email;

          isblocked ? await UserUnblock(email) : await UserBlock(email);
          GetUsers(page, pageSize);


        };

        return <Button onClick={onClick}>{isblocked ? "Unblock" : "Block"}</Button>;
      }
    },
    {
      field: 'Delete',
      headerName: 'Delete',
      sortable: false,

      renderCell: (params) => {

        const api: GridApi = params.api;
        const email = params.row.email;


        return <AlertDialogSlide email={email} />;
      }
    },
    {
      field: 'Edit',
      headerName: 'Edit',
      sortable: false,

      renderCell: (params) => {
        return (<Button><Link to={`/dashboard/profile`} state={{ User: params.row }}>Edit</Link> </Button>);

      }
    }
  ];

  let rows: any[] = allUsers;

  useEffect(() => {
    GetUsers(page, pageSize);
  }, [pageSize, page]);

  if (loading) {
    return <Loader />;
  }
  const handleChange = (event: SelectChangeEvent) => {
    setPageSize(Number(event.target.value));
  };
  return (
    <div style={{ height: "80vh", width: "100%" }}>
      <DataGrid
        hideFooter={true}

        rows={rows}
        columns={columns}
      />
      <ButtonGroup aria-label="medium outlined button group">
        <Button onClick={() => { setPage((currPage) => ++currPage) }}>+</Button>
        <Button >{page}</Button>
        <Button disabled={page == 0 ? true : false} onClick={() => setPage((currPage) => --currPage)}>-</Button>
        <div >
          <InputLabel id="PageSize">Page size</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={pageSize.toString()}
            label="PageSize"
            onChange={handleChange}
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
          </Select>
        </div>
        <Button component={Link} to={'/dashboard/register'}>Register New User</Button>
      </ButtonGroup>

    </div >
  );
};

export default Users;
