import { MouseEventHandler } from "react"
import Link from "next/link"
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { Accordion, AccordionActions, AccordionDetails } from "@mui/material";

type Props = {
  title: string
  mobile?: boolean
  menuList: {
    name: string
    href: string
  }[]
  onClick?: MouseEventHandler<HTMLAnchorElement>
}

const CollapsibleMenu = ({
  title,
  mobile = false,
  menuList,
  onClick,
}: Props) => {
  return (
    <Accordion className={`${mobile ? "py-0" : "py-3"}`}>
      <AccordionActions
        className={`flex w-full items-center justify-between p-2 font-serif text-lg font-medium hover:bg-skin-muted`}
      >
        {title}
        <AddIcon className="plus-icon" />
        <RemoveIcon className="minus-icon" />
      </AccordionActions>
      <AccordionDetails>
        <ul className="flex flex-col px-2 font-sans text-[15px]">
          {menuList.map(menu => (
            <li key={menu.name}>
                <Link
                  href={menu.href}
                  className={`text-link ${
                    mobile ? "block p-2 text-base hover:bg-skin-muted" : ""
                  }`}
                  onClick={onClick}
                >
                  {menu.name}
                </Link>
            </li>
          ))}
        </ul>
      </AccordionDetails>
    </Accordion>
  )
}

export default CollapsibleMenu
