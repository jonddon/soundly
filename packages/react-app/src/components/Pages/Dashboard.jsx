import { useMoralisQuery } from "react-moralis";
import { Container, Grid, Button, Modal, TextField } from "@material-ui/core";

import React, { useEffect, useState } from "react";
import Moralis from 'moralis';
import { useMoralis } from 'react-moralis';
import "./css/Dashboard.scss";
import { Line } from 'react-chartjs-2';
import SuperfluidSDK from '@superfluid-finance/js-sdk';
import { Web3Provider } from '@ethersproject/providers';

const data = {
  labels: ['1', '2', '3', '4', '5', '6'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      fill: false,
      backgroundColor: 'rgb(255, 255, 255)',
          borderColor: 'rgba(255, 99, 132, 0.2)',
      maintainAspectRatio: false
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

const sf = new SuperfluidSDK.Framework({
      ethers: new Web3Provider(window.ethereum),
      tokens: ['fDAI']
});

const Dashboard = () => {
  const { data, error, isLoading } = useMoralisQuery("GameScore");
  const [open, setOpen] = useState(false);
  const [score, setScore] = useState(0);
  const [userBal, setUserBal] = useState(null)
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const { user } = useMoralis();
  let num = 0;
  // const bob = sf.user({ address: user.get("ethAddress"), token: daix.address });
 

  const musicStat = async () => {
    console.log('checking')
        const query = new Moralis.Query("Music");
        // query.limit(1);
         query.equalTo('artistAddress', user.get("ethAddress"));
        
        const results = await query.find();
        // alert("Successfully retrieved " + results.length + " scores.");
        console.log("these are the results", results);
        // Do something with the returned Moralis.Object values
        for (let i = 0; i < results.length; i++) {
            const object = results[i];
            // console.log("details", await query.get(object.attributes.played))
          num = num + object.attributes.played;
            // console.log(object.attributes.played);
        alert(object.id + ' - ' + object.get('name') );
        }
    setScore(num)
  }

  const getBalance = async () => {
    await sf.initialize();
    // const superUser = sf.user({
    //   address: user.get("ethAddress"),
    //   token: sf.tokens.fDAIx.address
    // });
    const userBal = (await sf.cfa.getNetFlow({ superToken: sf.tokens.fDAIx.address, account: user.get("ethAddress") })).toString();
    setUserBal(userBal);
  }
  useEffect(() => {
    console.log('checking in effect')
    musicStat();
    getBalance();
    
  },[])


  // useEffect(() => {
  //   getMusic();
  // });
  
  return (
    <Container>
      {console.log('insode rhe component')}
      <Grid container spacing={6}>
        <Grid item xs={3}>
          <button onClick={musicStat}>Check stat</button>
          <h2>Analytics</h2>
          <div className={"data-box"}>
            <h4 className={"data-value"}>{score}</h4>
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
                    Your earnings
                </h4>
                <h2>
                    {userBal}<span>Dai</span>
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
                      <Line data={data}
	options={options} />
                  </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
