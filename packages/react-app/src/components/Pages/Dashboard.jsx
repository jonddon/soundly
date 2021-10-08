import { Container, Grid, Button, Box, Modal, TextField } from "@material-ui/core";

import React, { useState } from "react";
import "./css/Dashboard.scss";
// import { Line } from 'react-chartjs-2';

const data = {
  labels: ['1', '2', '3', '4', '5', '6'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      fill: false,
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgba(255, 99, 132, 0.2)',
    },
  ],
};

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};


const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Container>
      <Grid container spacing={6}>
        <Grid item xs={3}>
          <h2>Analytics</h2>
          <div className={"data-box"}>
            <h4 className={"data-value"}>42.1k</h4>
            <p className={"data-description"}>Followers</p>
          </div>
          <div className={"data-box"}>
            <h4 className={"data-value"}>1M</h4>
            <p className={"data-description"}>Streams</p>
          </div>
          <div className={"data-box"}>
            <h4 className={"data-value"}>4 hours</h4>
            <p className={"data-description"}>Playtime</p>
          </div>
        </Grid>
        <Grid item xs={9}>
          <h2>Overview</h2>
          <div className="data-box-large">
                      <div className="overview">
                          <h4>
                              Your earnings this month
                          </h4>
                          <h2>
                              $6,500 <span>Dai</span>
                          </h2>
                          <p>Update your payment method</p>

            </div>
            <div className="image-wrapper">
              <img src="./img/currency.png" alt="currency image" />
            </div>
            <Button onClick={handleOpen} className={"dark-btn"}>Withdraw Earning</Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="withdraw-box"
              aria-describedby="modal-modal-description"
            >
              <div id={"withdraw-box"}>
                <h4>Withdrawal</h4>
                <TextField
                  id="amount"
                  label="Amount"
                  defaultValue="Hello World"
                                  type="number"
                                  variant="standard"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <Button
                  onClick={() => {
                    alert("clicked");
                  }}
                  variant="contained"
                >
                  Withdraw
                </Button>
              </div>
            </Modal>
                  </div>
                  <div className="chart">
                      {/* <Line data={data} width={100}
	height={50} options={options} /> */}
                  </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
