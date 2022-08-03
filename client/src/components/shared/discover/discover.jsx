import { Link } from "react-router-dom";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";

function Discover({ projects, user }) {
  let projectsList = [];

  projectsList = projects.filter((pr) => pr.lifeCycle == "open");

  return (
    <>
      <AppBar>
        <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            component="div"
            onClick={() => window.location.reload(false)}
          >
            Discover
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          width: "100vw",
          margin: "8vh 0 8vh 0",
          display: "flex",
          flexWrap: "wrap",
          gap: "2vw",
        }}
      >
        {projectsList.map((pr) => (
          <Card
            sx={{
              width: "49vw",
              height: "49w",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              textDecoration: "none",
            }}
            component={Link}
            to={`${pr._id}`}
            variant="elevation"
            elevation={5}
          >
            <CardHeader
              title={pr.name}
              subheader={`Bids: ${pr.bids.length || 0}`}
            />
            <CardMedia
              component="img"
              height="150vw"
              image={`http://192.168.1.144:3000/${pr.projectImage}`}
              alt="Paella dish"
            />
          </Card>
        ))}
      </Box>
    </>
  );
}

export default Discover;
