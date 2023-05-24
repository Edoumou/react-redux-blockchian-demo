import React, { useCallback, useEffect, useState } from 'react';
import getWeb3 from './getWeb3';
import Registration from '../src/contracts/Registration.json';
import { load } from '../src/store/index'
import { useDispatch } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import AddUser from './components/AddUser';
import ListUsers from './components/ListUsers';

function App() {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);

  const dispatch = useDispatch();

  const storeAccount = useCallback(async () => {
      let web3Instance = await getWeb3();
      let accounts = await web3Instance.eth.getAccounts();

      let contractInstance = null;
      try {
        const networkId = await web3Instance.eth.net.getId();
        const deployedNetwork = Registration.networks[networkId];
        contractInstance = new web3Instance.eth.Contract(
            Registration.abi,
            deployedNetwork && deployedNetwork.address
        );
      } catch (error) {
          alert(
              `Canot load Contract. Check console`
          );
          console.error(error);
      }

      setWeb3(web3Instance);
      setContract(contractInstance);
      setAccount(accounts[0]);

      let users = await contractInstance.methods.getAllUsers().call({ from: accounts[0] });
      dispatch(load(users));
  }, [dispatch])

  useEffect(() => {
    storeAccount();
    getAccount();
  }, [storeAccount]);

  const getAccount = async () => {
    let web3 = await getWeb3();

    if(web3 !== null || web3 !== undefined) {
      await window.ethereum.on('accountsChanged', async (accounts) => {
        setAccount(accounts[0]);
      })
    }
  }

  return (
    <div>
      <Grid stackable columns={2}>
          <Grid.Row>
            <Grid.Column>
              <AddUser account={account} contract={contract} web3={web3} />
            </Grid.Column>
            <Grid.Column>
              <ListUsers />
            </Grid.Column>
          </Grid.Row>
      </Grid>
      
    </div>
  );
}

export default App;
