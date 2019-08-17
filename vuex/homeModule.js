const Home = {
  template: `
    <div>
      <h3>Welcome to the Ether Vending Machine</h3>
      <br />
      <div>
        <b-row>
          <b-col cols="12" md="8">
            <b-card title="Please make a selection">
              <b-list-group>
                <b-list-group-item to="/deployTokenContract">Deploy BokkyPooBah's Fixed Supply Token 👊 Contract</b-list-group-item>
                <b-list-group-item to="/gazeCoinBuilder">GazeCoin Builder</b-list-group-item>
                <!-- <b-list-group-item to="/viewTokens">View Tokens</b-list-group-item>
                <b-list-group-item to="/page2">Exchange Tokens</b-list-group-item>
                <b-list-group-item to="/page2">Trade Put/Call Options</b-list-group-item> -->
              </b-list-group>
            </b-card>
          </b-col>
        </b-row>
      </div>
    </div>
  `,
};
