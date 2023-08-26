"use client"
import Modal from "@mui/material/Modal"
import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import Divider from "@mui/material/Divider"

export default ({ show, title, children, onSubmit, onClose, size = "md" }: any) => {
  return (
    <Modal open={show} onClose={onClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box
        className="absolute top-1/2 left-1/2 bg-white rounded-lg py-6 px-8 -translate-x-1/2 -translate-y-1/2"
        sx={{
          width: size == "sm" ? "30%" : size == "md" ? "60%" : "90%",
          boxShadow: 24,
        }}
      >
        <div className="modal-title flex-none text-xl mb-3">{title}</div>
        <Divider className="mb-3" />
        <div className="modal-body flex-1 mb-4">{children}</div>
        <div className="modal-footer flex-none flex justify-end">
          <Button variant="outlined" color="primary" onClick={onSubmit}>
            Save
          </Button>
        </div>
      </Box>
    </Modal>
  )
}
