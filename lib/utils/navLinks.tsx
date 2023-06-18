import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonIcon from '@mui/icons-material/Person';

type Position = "top" | "top-only" | "main" | "main-mobile"

type NavLinks = {
  name: string
  href: string
  icon: JSX.Element | null
  position: Position
}[]

const navLinks: NavLinks = [
  {
    name: "About Us",
    href: "/about-us",
    icon: null,
    position: "top",
  },
  {
    name: "Contact Us",
    href: "/contact",
    icon: null,
    position: "top",
  },
  {
    name: "Privacy Policy",
    href: "/privacy-policy",
    icon: null,
    position: "top-only",
  },
  {
    name: "Account",
    href: "/account",
    icon: <PersonIcon />,
    position: "main",
  },
  {
    name: "Wishlist",
    href: "/wishlist",
    icon: <FavoriteIcon />,
    position: "main",
  },
]

export default navLinks
