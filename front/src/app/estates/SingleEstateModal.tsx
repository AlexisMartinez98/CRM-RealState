"use client";
import * as React from "react";
import { Grid, Modal, Button, Box, Divider, Typography } from "@mui/material";
import CloseButton from "@/app/commons/buttons/closeButton";
import { H4, H5 } from "@/app/commons/headlines";
import {
  Subtitle1,
  SubtitleDesciption1,
} from "@/app/commons/subtitles/index.tsx";
import PrimaryButton from "@/app/commons/buttons/primaryButton";
import ModalBox from "@/app/commons/ModalBox";
import { Estate } from "@/app/types/types.md";

export default function SingleEstateModal({
  estateData,
}: {
  estateData: Estate;
}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box>
      <PrimaryButton onClick={handleOpen}>Ver Detalle</PrimaryButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ModalBox>
          <Grid container spacing={3}>
            <Grid item xs={1}>
              <CloseButton onClick={handleClose} />
            </Grid>
            <Grid
              item
              xs={8}
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"center"}
            >
              <H4 bold={true}>{estateData.name}</H4>
            </Grid>
            <Grid item xs={3}>
              <PrimaryButton>Iniciar chat</PrimaryButton>
            </Grid>
          </Grid>
          <H5>
            Información general
            <Divider
              sx={{ width: "95%", bgcolor: "#576B7E", margin: "10px 0px" }}
            ></Divider>
          </H5>
          <Grid container spacing={2} sx={{ margin: "10px 0px" }}>
            <Grid item xs={6}>
              <Subtitle1>Propietario</Subtitle1>
              <SubtitleDesciption1>{`${estateData.owner.first_name} ${estateData.owner.last_name}`}</SubtitleDesciption1>
              <Subtitle1>Teléfono de contacto</Subtitle1>
              <SubtitleDesciption1>11 1234 5678</SubtitleDesciption1>
              <Subtitle1>Email</Subtitle1>
              <SubtitleDesciption1>
                {estateData.owner.email}
              </SubtitleDesciption1>
            </Grid>
            <Grid item xs={6} display={"flex"} justifyContent={"center"}>
              <Box
                component="img"
                src={
                  estateData.images?.length
                    ? estateData.images[0]
                    : "https://images.pexels.com/photos/700558/pexels-photo-700558.jpeg?auto=compress&cs=tinysrgb&w=1600"
                }
                alt="estate picture"
                sx={{ height: "200px", width: "auto" }}
              />
            </Grid>
            <Divider
              sx={{ width: "95%", bgcolor: "#576B7E", margin: "10px 0px" }}
            ></Divider>
          </Grid>
          <Grid container spacing={2} sx={{ margin: "10px 0px" }}>
            <Grid item xs={6}>
              <Subtitle1>Tipo de producto</Subtitle1>
              <SubtitleDesciption1>{estateData.category}</SubtitleDesciption1>
              <Subtitle1>Dirección</Subtitle1>
              <SubtitleDesciption1>{estateData.address}</SubtitleDesciption1>
            </Grid>
            <Grid item xs={6}>
              <Subtitle1>Tipo de operación</Subtitle1>
              <SubtitleDesciption1>
                {estateData.operation_type}
              </SubtitleDesciption1>
              <Subtitle1>Barrio</Subtitle1>
              <SubtitleDesciption1>{estateData.city}</SubtitleDesciption1>
            </Grid>
            <Divider
              sx={{ width: "95%", bgcolor: "#576B7E", margin: "20px 0px" }}
            ></Divider>
          </Grid>
          <Grid container spacing={1} sx={{ margin: "20px 0px" }}>
            <Grid item xs={12}>
              <Subtitle1>Descripción</Subtitle1>
              <SubtitleDesciption1>
                {estateData.description}
              </SubtitleDesciption1>
              <Subtitle1>Agente asignado</Subtitle1>
              <SubtitleDesciption1>Don Draper </SubtitleDesciption1>
            </Grid>
          </Grid>
        </ModalBox>
      </Modal>
    </Box>
  );
}
