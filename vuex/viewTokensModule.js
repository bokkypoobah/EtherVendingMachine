const ViewTokens = {
  template: `
  <div>
    <div>
      <b-row>
        <b-col cols="12" md="8">
          <b-card title="Deploy Fixed Supply Token Contract" sub-title="BokkyPooBah's Fixed Supply Token 👊 Factory v1.10">
            <b-form @submit="onSubmit" v-if="show">
              <b-form-group id="symbolInputGroup" label-for="symbolInput" label="Symbol" label-cols="4" description="An uppercase word a few letters long">
                <b-form-input id="symbolInput" type="text" :value.trim="symbol" @input="updateSymbol" required placeholder="example '${DEFAULTSYMBOL}'"></b-form-input>
              </b-form-group>
              <b-form-group id="nameInputGroup" label-for="nameInput" label="Name" label-cols="4" description="A set of mixed case words">
                <b-form-input id="nameInput" type="text" :value.trim="name" @input="updateName" required placeholder="example '${DEFAULTNAME}'"></b-form-input>
              </b-form-group>
              <b-form-group id="decimalsInputGroup" label-for="decimalsInput" label="Decimals" label-cols="4" description="Number of decimal places, between 0 and 18, inclusive">
                <b-form-input id="decimalsInput" type="number" step="1" :value.trim="decimals" @input="updateDecimals" required placeholder="example '${DEFAULTDECIMALS}'"></b-form-input>
              </b-form-group>
              <b-form-group id="totalSupplyInputGroup" label-for="totalSupplyInput" label="Total Supply" label-cols="4" description="A positive number less than or equals to 100,000,000,000,000">
                <b-form-input id="totalSupplyInput" type="number" step="any" :value.trim="totalSupply" @input="updateTotalSupply" required placeholder="example '${DEFAULTTOTALSUPPLY}'"></b-form-input>
              </b-form-group>
              <b-form-group id="deploymentFeeInputGroup" label-for="deploymentFeeInput" label="Deployment Fee" label-cols="4" description="Minimum deployment fee 0.1 ethers">
                <b-form-input id="deploymentFeeInput" type="number" step="0.000000001" :value.trim="deploymentFee" @input="updateDeploymentFee" required placeholder="example '${DEFAULTMINIMUMFEE}'"></b-form-input>
              </b-form-group>
              <b-form-group label="Show Details: " label-cols="4">
                <b-form-radio-group id="showDetails" v-model="showDetails" name="transactionDataTypeComponent">
                  <b-form-radio value="none" v-b-popover.hover.top="'Dont show any details'">None</b-form-radio>
                  <b-form-radio value="functionCall" v-b-popover.hover.top="'For executing using the geth JavaScript console'">Function Call</b-form-radio>
                  <b-form-radio value="javascript" v-b-popover.hover.top="'For executing using the geth JavaScript console'">JavaScript</b-form-radio>
                  <b-form-radio value="formatted" v-b-popover.hover.top="'For displaying the chunks of raw data'">Formatted</b-form-radio>
                  <b-form-radio value="raw" v-b-popover.hover.top="'This raw data can be copied into MyCrypto or MyEtherWallet for deployment'">Raw</b-form-radio>
                </b-form-radio-group>
              </b-form-group>
              <b-form-group id="transactionDataInputGroup" label-cols="4" label-for="transactionDataInput" v-if="showDetails != 'none'" label="Transaction details" :description="getDescription">
                <b-form-textarea id="transactionDataInput" v-model.trim="getTransactionData" plaintext :wrap="showDetails === 'raw' ? 'soft' : 'off'" rows="10" max-rows="20" ></b-form-textarea>
              </b-form-group>
              <b-form-group>
                <b-button type="submit" id="deploy" :disabled="actionDeploy === true" variant="primary">{{ actionDeploy === true ? "Deploying Token Contract ... " : "Deploy Token Contract" }}</b-button>
              </b-form-group>
              <b-form-group>
                <b-button v-show="deploymentTx" :href="explorer + 'tx/' + deploymentTx" variant="success" target="_blank">View transaction {{ deploymentTx }}</b-button>
              </b-form-group>
              <b-form-group>
                <b-button v-show="deploymentTxError" variant="danger">{{ deploymentTxError }}</b-button>
              </b-form-group>
            </b-form>
          </b-card>
        </b-col>
        <b-col cols="12" md="4">
          <connection></connection>
          <br />
          <b-card v-if="show" title="Fixed Supply Token Factory">
            <b-row>
              <b-col cols="4">Factory Address</b-col><b-col class="truncate" cols="8"><b-link :href="explorer + 'address/' + factoryAddress" class="card-link" target="_blank">{{ factoryAddress }}</b-link></b-col>
            </b-row>
            <b-row>
              <b-col cols="4">Minimum fee</b-col><b-col class="truncate" cols="8"><b-link :href="explorer + 'address/' + factoryAddress + '#readContract'" class="card-link" target="_blank">{{ factoryMinimumFeeString }}</b-link> ETH</b-col>
            </b-row>
            <div>Latest deployed token contracts (max {{ factoryDisplayMaxChildren + ' of ' + factoryNumberOfChildren }})</div>
            <b-row no-gutters v-for="(child) in factoryChildren">
              <b-col cols="1">{{ child.number }}</b-col>
              <b-col class="truncate">
                <b-link :href="explorer + 'token/' + child.address" class="card-link" target="_blank">{{ child.symbol + ':' + child.name + ':' + child.decimals + ':' + child.totalSupplyString + ':' + child.address.substring(0, 10) }}</b-link>
              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row>
    </div>
  </div>
  `,
  data: function () {
    return {
      show: true,
    }
  },
  computed: {
    symbol() {
      return store.getters['viewTokens/symbol'];
    },
  },
  methods: {
    updateSymbol (e) {
      this.$store.commit('viewTokens/updateSymbol', e);
    },
    onSubmit(event) {
      event.preventDefault();
      this.$store.commit('deployTokenContract/updateActionDeploy', true);
    },
  },
  mounted() {
    let attributes = [];
    let data = {};

    // The Multiverse
    attributes = [];
    data = {};
    console.log("http://multiverse.gazecoin.io/api/asset/0");
    data.tokenId = 0;
    data.owner = "0xGazeCoinOps123456789";
    data.name = "GazeCoin Multiverse #0 - The Final Parsec";
    data.description = "This is the layout of Amsterdam with the 1234 trackable_entities";
    data.image = "https://ipfs.gazecoin.io/ipfs/Qma789dovfLyiG2UUfdkSHNPAySzrWLX9qVXb44v1moooo";
    data.media = "https://ipfs.gazecoin.io/ipfs/Qma123dovfLyiG2UUfdkSHNPAySzrWLX9qVXb44v1mmmmm (comment: unity package)";
    data.attributes = [];
    data.attributes.push({ trait_type: "asset_type", value: "space" });
    data.attributes.push({ trait_type: "platform_fee", value: "0.01% (comment: of fees earnt by owners)" });
    data.attributes.push({ trait_type: "wallet", value: "0xGazeCoinsMultisig123456789" });
    data.attributes.push({ trait_type: "trackable_entity_53", value: "33 (comment: hyperlink from Amsterdam TE#53 to cube #33)" });
    data.attributes.push({ trait_type: "trackable_entity_54", value: "88 (comment: hyperlink from Amsterdam TE#54 to cube #88)" });
    console.log(JSON.stringify(data, null, 4));

    // Theme #7654
    attributes = [];
    data = {};
    console.log("http://multiverse.gazecoin.io/api/asset/7654");
    data.tokenId = 7654;
    data.owner = "0xGazeCoinOps123456789";
    data.name = "GazeCoin Prebuilt Cube Theme #7654 - Another Lazy Day";
    data.description = "Yeah";
    data.image = "https://ipfs.gazecoin.io/ipfs/Qma6e8dovfLyiG2UUfdkSHNPAySzrWLX9qVXb44v1micon";
    data.media = "https://ipfs.gazecoin.io/ipfs/Qma6e8dovfLyiG2UUfdkSHNPAySzrWLX9qVXb44v1muqcp";
    data.attributes = [];
    data.attributes.push({ trait_type: "asset_type", value: "prebuilt_cube_theme" });
    data.attributes.push({ trait_type: "rental_rate", value: "0.1% (comment: of fees earnt by the owner of rooms using this prebuilt cube)" });
    data.attributes.push({ trait_type: "wallet", value: "0xGazeCoinsMultisig123456789" });
    console.log(JSON.stringify(data, null, 4));

    // Cube #33
    attributes = [];
    data = {};
    console.log("http://multiverse.gazecoin.io/api/asset/33");
    data.tokenId = 33;
    data.owner = "0xBokkyPooBah123456789";
    data.name = "#33 Bokky's Big Bang Bar";
    data.description = "Birthplace Of The Final Parsec";
    data.image = "https://www.bokconsulting.com.au/wp-content/uploads/2018/04/PrincessLeiaPeachExpelsARainbowBigBang2-940x198-1.png";
    data.media = "https://www.bokconsulting.com.au/wp-content/uploads/2018/04/PrincessLeiaPeachExpelsARainbowBigBang2-940x198-1.mp4 (does not exist)";
    data.attributes = [];
    data.attributes.push({ trait_type: "asset_type", value: "prebuilt_cube" });
    data.attributes.push({ trait_type: "prebuilt_cube_theme", value: "7654 (comment: cube rendered using prebuilt_cube theme #7654)" });
    data.attributes.push({ trait_type: "prebuilt_cube_theme_scheme_1", value: "purple" });
    data.attributes.push({ trait_type: "prebuilt_cube_theme_scheme_2", value: "green" });
    data.attributes.push({ trait_type: "wallet", value: "0xBokkysWallet123456789" });
    console.log(JSON.stringify(data, null, 4));

    // Cube #44
    attributes = [];
    data = {};
    console.log("http://multiverse.gazecoin.io/api/asset/44");
    data.tokenId = 44;
    data.owner = "0xBokkyPooBah123456789";
    data.name = "#44 Bokky's Cosmic Experience";
    data.description = "Yes, just come in";
    data.image = "https://www.bokconsulting.com.au/wp-content/uploads/2018/04/PrincessLeiaPeachExpelsARainbowBigBang2-940x198-1.png";
    data.media = "https://www.bokconsulting.com.au/wp-content/uploads/2018/04/PrincessLeiaPeachExpelsARainbowBigBang2-940x198-1.mp4 (does not exist)";
    data.attributes = [];
    data.attributes.push({ trait_type: "asset_type", value: "prebuilt_cube" });
    data.attributes.push({ trait_type: "prebuilt_cube_theme", value: "8765 (comment: cube rendered using prebuilt_cube #8765)" });
    data.attributes.push({ trait_type: "prebuilt_cube_theme_scheme_1", value: "#6610f2;" });
    data.attributes.push({ trait_type: "prebuilt_cube_theme_scheme_2", value: "#fd7e14;" });
    data.attributes.push({ trait_type: "wallet", value: "0xBokkysWallet123456789" });
    console.log(JSON.stringify(data, null, 4));

    // Cat #77 is in cube #33, triggering will link to cube #44
    attributes = [];
    data = {};
    console.log("http://multiverse.gazecoin.io/api/asset/77");
    data.tokenId = 77;
    data.owner = "0xBokkyPooBah123456789";
    data.name = "#77 Princess";
    data.description = "Princess Leia Peach's Vertical Rainbow Lunar Landing";
    data.image = "https://www.bokconsulting.com.au/wp-content/uploads/2018/01/PrincessLeiaPeachsVerticalRainbowLunarLanding.png";
    data.media = "https://www.bokconsulting.com.au/wp-content/uploads/2018/01/PrincessLeiaPeachsVerticalRainbowLunarLanding.mp4 (does not exist)";
    data.attributes = [];
    data.attributes.push({ trait_type: "asset_type", value: "avatar" });
    data.attributes.push({ trait_type: "avatar_location", value: { tokenId: "33 (comment: Princess is hanging out at Bokky's Big Bang Bar)", position: {x: 0, y: 1, z: 2}, rotation: {x: 3, y: 4, z: 5}, scale: {x: 6, y:7, z: 8}}});
    data.attributes.push({ trait_type: "link_to", value: "44 (comment: avatar's hot link to another cube)" });
    data.attributes.push({ trait_type: "wallet", value: "0xBokkysWallet123456789" });
    console.log(JSON.stringify(data, null, 4));
  },
};

const viewTokensModule = {
  namespaced: true,
  state: {
    symbol: "DEFAULTSYMBOL",
    name: "DEFAULTNAME",
  },
};
