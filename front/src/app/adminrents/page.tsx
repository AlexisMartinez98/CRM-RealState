"use client";
import React, { useEffect, useState } from "react";
import { Box, Container } from "@mui/material";
import Layout from "../commons/layout";
import CustomList from "../commons/listCommon";
import { detalleAdminRentals } from "../services/acquistion.services";
import { AcquisitionFrond } from "../types/types.md";
import HeaderPage from "./headerPage";
import SingleRentModal from "./SingleRentModal";
const columns = [
  { key: "description", label: "Nombre" },
  { key: "transaction_date", label: "Fecha de inicio" },
  { key: "transaction_type", label: "Operacion" },
  { key: "button", label: "bottones" },
];
import ProtectedRoutes from "@/app/components/ProtectedRoutes";

const Adminrents: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [rents, setRents] = useState([]);

  const handleGetRents = async () => {
    const fetchedRents = await detalleAdminRentals();
    setRents(fetchedRents);
  };

  useEffect(() => {
    handleGetRents();
  }, []);

  const filteredData1 = rents.filter((rent: AcquisitionFrond) =>
    rent.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {" "}
      <ProtectedRoutes>
        <Layout>
          <Container component="main" maxWidth="xl">
            <Box
              sx={{
                px: 4,
                py: 1,
                marginTop: 10,
                color: "white",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                background: "transparent",
              }}
            >
              <HeaderPage
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />

              <CustomList
                columns={columns}
                data={filteredData1.map((rent: AcquisitionFrond) => ({
                  ...rent,
                  button: <SingleRentModal rentData={rent}></SingleRentModal>,
                }))}
              />
            </Box>
          </Container>
        </Layout>
      </ProtectedRoutes>
    </>
  );
};

export default Adminrents;
