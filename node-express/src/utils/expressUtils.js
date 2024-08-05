
const express = require('express');
const router = express.Router();


module.exports.router = router;
module.exports.routerGet = router.get;
// module.exports.routerGet = (url, callback) => {

//   console.warn('url11', url);
//   router.get(url, (req, res) => {

//     console.warn('url', url);

//     const resp = callback(res);
//     res.send(resp);
//   });
// };