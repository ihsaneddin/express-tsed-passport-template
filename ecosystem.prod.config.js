require('dotenv').config();
module.exports = {
    apps : [
        {
          name: "xrp-signer",
          script: "./dist/index.js",
          kill_timeout : 10000,
          // instances  : 2,
          // exec_mode  : "cluster"
        }
   ]
};