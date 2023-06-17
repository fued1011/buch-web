import Link from "next/link";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import navLinks from "@/lib/utils/navLinks";

const TopBar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="hidden bg-skin-muted text-skin-dark md:block">
      <div className="max-width padding-x flex items-center justify-between text-sm">
        <div className="flex gap-x-2">
          {navLinks
            .filter((nav) => ["top", "top-only"].includes(nav.position))
            .map((nav) => (
              <Link
                key={nav.name}
                href={nav.href}
                className="flex items-center gap-x-2 px-1 opacity-75 hover:opacity-100"
              >
                {nav.name}
              </Link>
            ))}
        </div>
        <div>
          <IconButton
            onClick={handleClick}
            className="flex h-full items-center gap-1"
            aria-controls="site-languages"
            aria-haspopup="true"
          >
            English{" "}
            <ArrowDropDownIcon
              aria-hidden
              className="dropdown-caret !stroke-skin-dark transition-transform ease-in-out"
            />
          </IconButton>
          <Menu
            id="site-languages"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            className="absolute top-7 z-30 border bg-skin-muted p-1 shadow-lg"
          >
            <MenuItem>
              <Link
                className="inline-block w-full p-1 hover:bg-skin-gray"
                href="#"
              >
                English
              </Link>
            </MenuItem>
            <MenuItem>
              <Link
                className="inline-block w-full cursor-not-allowed p-1 opacity-70"
                tabIndex={-1}
                href="#"
              >
                Burmese
              </Link>
            </MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
