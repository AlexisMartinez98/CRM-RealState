import React from "react";
import Box from "@mui/material/Box";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import PersonIcon from "@mui/icons-material/Person";
import CallIcon from "@mui/icons-material/Call";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HelpIcon from "@mui/icons-material/Help";
import CottageIcon from "@mui/icons-material/Cottage";
import SidebarButton from "../commons/sidebarButton";
import Link from "next/link";

const Sidebar = () => {
  return (
    <Box
      sx={{
        width: 300,
        borderRight: "1px solid #ccc",
        paddingTop: 8,
        backgroundColor: "transparent",
      }}
    >
      <Box>
        <Link href="/home" passHref>
          <SidebarButton icon={<SignalCellularAltIcon />} text="Reportes" />
        </Link>
        <Link href="/agents" passHref>
          <SidebarButton icon={<PeopleAltIcon />} text="Agentes" />
        </Link>
        <Link href="/adminRents" passHref>
          <SidebarButton
            icon={<HomeWorkIcon />}
            text="Administracion de alquileres"
          />
        </Link>
        <Link href="/clients" passHref>
          <SidebarButton icon={<PersonIcon />} text="Clientes" />
        </Link>
        <Link href="/estates" passHref>
          <SidebarButton
            icon={<CottageIcon />}
            text="
          Propiedades"
          />
        </Link>
      </Box>
    </Box>
  );
};

export default Sidebar;
