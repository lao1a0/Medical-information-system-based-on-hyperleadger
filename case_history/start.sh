sudo rm -r ~/explorer/organizations/
sudo cp -r ~/fabric-samples/test-network/organizations/ ~/explorer/
sudo ls  ~/explorer/organizations/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp/keystore/
sudo ls  ~/explorer/organizations/peerOrganizations/org2.example.com/users/Admin@org2.example.com/msp/keystore/
node ./database.js