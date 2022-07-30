import React from "react";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { deleteCustomer } from "../../api/Customer";
import { mostrarExito, mostrarAlertaEliminar } from "../Alert/Alert";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

// eslint-disable-next-line react/prop-types, import/no-anonymous-default-export
export default ({ row, onDeleteRow, size }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const editRow = () => {
    console.log("editRow", row);
    //editCustomerAlert(row, '');
  };
  const deleteRow = async () => {
    setAnchorEl(null);
    if (await mostrarAlertaEliminar("Cliente")) {
      let id = row.id;
      let _delete = await deleteCustomer(id);
      if (_delete) {
        /* Fila eliminada */
        await mostrarExito(
          "Cliente eliminado",
          "El cliente ha sido eliminado correctamente",
          "success"
        );
        window.location.reload();
      } else {
        /* Error al eliminar */
        await mostrarExito("Error", "No se pudo eliminar el cliente", "error");
      }
    }
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    "border-radius": "5px",
    bgcolor: "background.paper",
    boxShadow: 24,
    pt: 2,
    pb: 3,
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
        size={size}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="menu"
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleOpenModal}>
          <ListItemIcon>
            <EditIcon fontSize="small" color="secondary" />
          </ListItemIcon>
          <Typography variant="inherit">Editar</Typography>
        </MenuItem>
        <Modal
          open={open}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={{ ...style, width: 500 }}>
            <Typography variant="h6" className="pl-4 font-semibold">
              Editar datos del cliente
            </Typography>
            <Divider />
            <form>
              <div className="form-group px-4 mb-4">
                <Typography variant="h6">Correo electrónico:</Typography>
                <input
                  type="email"
                  name="correo"
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="email"
                  placeholder="Ingrese su correo electrónico"
                />
              </div>
            </form>
          </Box>
        </Modal>

        <Divider />

        <MenuItem onClick={deleteRow}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" color="secondary" />
          </ListItemIcon>
          <Typography variant="inherit">Eliminar</Typography>
        </MenuItem>
      </Menu>
    </div>
  );
};
