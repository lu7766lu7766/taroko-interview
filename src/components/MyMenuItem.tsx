import { MenuItem, ListItemIcon, ListItemText } from "@mui/material"
import { Check } from "@mui/icons-material"
export default ({ title, onClick, checked }: { title: string; onClick: () => void; checked: boolean }) => (
  <MenuItem onClick={onClick}>
    {checked ? (
      <>
        <ListItemIcon>
          <Check />
        </ListItemIcon>
        {title}
      </>
    ) : (
      <ListItemText inset>{title}</ListItemText>
    )}
  </MenuItem>
)
