"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Input,
  RadioGroup,
  FormLabel,
  FormControlLabel,
  Radio,
  Select,
  MenuItem,
} from "@mui/material";
import { getAllEstates } from "../../services/estates.services";
import { getAllBuyersAndTenants } from "../../services/client.services";
import { fetchUsersAccordingToLoggedUserType } from "../../services/user.services";
import { Client, Estate, User } from "../../types/types.md";
import { createNewAcquistion } from "../../services/acquistion.services";
import Layout from "../../commons/layout";
import { useSelector } from "react-redux";
import { RootState } from "../../states/store";
import Link from "next/link";
import ArrowBackButton from "@/app/commons/buttons/arrowBackButton";
import { H3 } from "../../commons/headlines";
import { Subtitle1, SubtitleDesciption1 } from "../../commons/subtitles/index";
import { CRMFontFamily } from "../../font";
import PrimaryButton from "../../commons/buttons/primaryButton";

const page = () => {
  const inputStyle = {
    color: "white",
    border: "1px solid white",
    borderRadius: "25px",
    padding: "4px 15px",
    margin: "15px",
    width: "100%",
  };

  const [buyerAndTenants, setBuyersAndTenants] = useState([]);
  const [estates, setEstates] = useState([]);
  const [users, setUsers] = useState([]);
  const loggedUser = useSelector((state: RootState) => state.user);
  const handleGetData = async () => {
    const fetchedEstates = await getAllEstates();
    setEstates(fetchedEstates);
    const fetchedBuyerAndTenants = await getAllBuyersAndTenants();
    setBuyersAndTenants(fetchedBuyerAndTenants);

    const fetchedUsers = await fetchUsersAccordingToLoggedUserType(
      loggedUser.type,
      loggedUser.id
    );

    setUsers(fetchedUsers);
  };

  useEffect(() => {
    handleGetData();
  }, [loggedUser.id]);
  const initialState = {
    description: "",
    estateID: "",
    buyerOrTenantID: "",
    transactionType: "",
    transactionCurrency: "",
    transactionPrice: "",
    agentID: "",
    ownerID: "",
  };
  const [newAcquisition, setNewAcquisition] = useState(initialState);

  const handleInput = (e: any) => {
    if (e.target.name === "estateID") {
      const selectedEstate: Estate = estates.filter(
        (estate: Estate) => e.target.value === estate.id
      )[0];
      const selectedEstateOwnerID = selectedEstate.owner_id;

      setNewAcquisition((previousAcquisition) => ({
        ...previousAcquisition,
        [e.target.name]: e.target.value,
        ownerID: selectedEstateOwnerID,
      }));
    } else {
      setNewAcquisition((previousAcquisition) => ({
        ...previousAcquisition,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (
      !newAcquisition.transactionCurrency ||
      !newAcquisition.transactionType
    ) {
      return alert("Por favor, completa todos los campos");
    } else {
      await createNewAcquistion(newAcquisition);
      alert("Captacion creada con exito");
      location.reload();
    }
  };

  return (
    <Layout
      children={
        <Box
          display={"flex"}
          alignItems={"center"}
          sx={{ marginTop: 15, marginLeft: 10 }}
        >
          <Box
            width={"50%"}
            flexDirection={"column"}
            padding={"10px 30px"}
            display={"flex"}
            minHeight={"100vh"}
          >
            <H3 bold={true} sx={{ marginBottom: "15px" }}>
              {" "}
              <Link href="/acquisitions">
                <ArrowBackButton />
              </Link>
              Añadir Captación
            </H3>
            <form onSubmit={handleSubmit}>
              <Subtitle1>Descripción</Subtitle1>
              <Input
                onChange={handleInput}
                value={newAcquisition.description}
                name="description"
                sx={{ ...inputStyle, height: "50px" }}
                disableUnderline={true}
                required
              />

              <Subtitle1>Propiedad Asociada</Subtitle1>
              <FormControl>
                <Select
                  onChange={handleInput}
                  value={newAcquisition.estateID}
                  name="estateID"
                  sx={inputStyle}
                  displayEmpty
                  disableUnderline
                  required
                >
                  <MenuItem value="" disabled>
                    <SubtitleDesciption1>
                      Selecciona una propiedad
                    </SubtitleDesciption1>
                  </MenuItem>
                  {estates.map((estate: Estate) => (
                    <MenuItem key={estate.id} value={estate.id}>
                      {estate.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Subtitle1>Comprador/Inquilino asociado </Subtitle1>
              <FormControl>
                <Select
                  onChange={handleInput}
                  value={newAcquisition.buyerOrTenantID}
                  name="buyerOrTenantID"
                  sx={inputStyle}
                  displayEmpty
                  disableUnderline
                  required
                >
                  <MenuItem value="" disabled>
                    <SubtitleDesciption1>
                      Selecciona un cliente
                    </SubtitleDesciption1>
                  </MenuItem>
                  {buyerAndTenants.map((client: Client) => (
                    <MenuItem key={client.id} value={client.id}>
                      {`${client.first_name} ${client.last_name}`}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Subtitle1>Agente asociado</Subtitle1>
              <FormControl>
                <Select
                  onChange={handleInput}
                  value={newAcquisition.agentID}
                  name="agentID"
                  sx={inputStyle}
                  displayEmpty
                  disableUnderline
                  required
                >
                  <MenuItem value="" disabled>
                    <SubtitleDesciption1>
                      Selecciona un agente
                    </SubtitleDesciption1>
                  </MenuItem>
                  {users?.map((user: User) => (
                    <MenuItem key={user.id} value={user.id}>
                      {`${user.firstname} ${user.lastname}`}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Box
                display={"flex"}
                flexDirection={"row"}
                alignItems={"center"}
                justifyContent={"space-around"}
                margin={"10px 0px"}
              >
                <FormControl sx={{ color: "white" }}>
                  <FormLabel id="transactionType" sx={{ color: "white" }}>
                    <Subtitle1>Tipo de operación</Subtitle1>
                  </FormLabel>
                  <RadioGroup>
                    <FormControlLabel
                      value="sale"
                      name="transactionType"
                      onClick={handleInput}
                      control={
                        <Radio
                          sx={{
                            color: "white",
                          }}
                        />
                      }
                      label="Venta"
                    />

                    <FormControlLabel
                      value="rent"
                      name="transactionType"
                      onClick={handleInput}
                      control={
                        <Radio
                          sx={{
                            color: "white",
                          }}
                        />
                      }
                      label="Alquiler"
                    />
                  </RadioGroup>
                </FormControl>
                <FormControl sx={{ color: "white" }}>
                  <FormLabel id="transactionCurrency" sx={{ color: "white" }}>
                    <Subtitle1>Tipo de cambio</Subtitle1>
                  </FormLabel>
                  <RadioGroup>
                    <FormControlLabel
                      onClick={handleInput}
                      value="USD"
                      name="transactionCurrency"
                      control={
                        <Radio
                          sx={{
                            color: "white",
                          }}
                        />
                      }
                      label="Dólar"
                    />
                    <FormControlLabel
                      value="ARS"
                      name="transactionCurrency"
                      onClick={handleInput}
                      control={
                        <Radio
                          sx={{
                            color: "white",
                          }}
                        />
                      }
                      label="Peso argentino"
                    />
                  </RadioGroup>
                </FormControl>
                <Subtitle1>Precio</Subtitle1>

                <Input
                  onChange={handleInput}
                  value={newAcquisition.transactionPrice}
                  type="text"
                  name="transactionPrice"
                  sx={{ ...inputStyle, width: "25%" }}
                  disableUnderline={true}
                  required
                />
              </Box>
              <PrimaryButton type="submit">Añadir</PrimaryButton>
            </form>
          </Box>
        </Box>
      }
    ></Layout>
  );
};

export default page;
