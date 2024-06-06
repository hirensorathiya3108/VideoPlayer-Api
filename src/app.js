const express = require("express");
const bodyParser = require('body-parser');
const cryptoUtils = require("./utils/CryptoUtils");
const connectDB = require("./db/connect");
const utils = require("./utils/Utils");
const AdServiceRouters = require("./routers/adService");
const MonetizeProductRouters = require("./routers/MonetizeProduct");

const app = express();
const port = process.env.PORT || 8080;

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use(utils.API_COMMON_ROUTE, AdServiceRouters)
app.use(utils.API_COMMON_ROUTE, MonetizeProductRouters)

const start = async () => {
    try {
        await connectDB(cryptoUtils.decryptString(utils.MONGODB_URL));
        app.listen(port, () => {
            console.log(utils.CONNECTION_LIVE_PORT, port);
        });
    } catch (error) {
        console.log(error);
    }
};

// 
// console.log("decryptData =>", cryptoUtils.decryptString("PWubbAnchZLTD84pHTKaUMjXu5fq1tn6vpPLqO2UpxbHucuwRES/aQVKkLo0vFhVLqiiuLUCg9zknpHvFZRxekiNDXl9K2IM3H27q+nNyUexbGKWd81AAQiX6wmajQT4UWEu2mpPBhnpyKj2zci+Dz/IOmgLTWBLJNgWw+y9NIkaLGAT6738zbDMOlj33qn4ja9VTXTLMUHMezb9qlsGc5ykGlYACObGM5LBhkp2OdAFVdusoCh0zq3uLh7g99VJNz+n9g/Ha1jBkh6YNt8WexXZkOpfmTVE2fQGFT6rGNlgFmL0JdgRJIIRt0d+utL8jrM6X0yciuyuc15CFfqzAH81lIH63bucNLoiiGc/RQA5T6zCYP3TtXkaIpU07pF3TqqHlC/6uMw560QDIo+4RV1HiMjiGO8B3sw+m4sLVBqpb0FbhIiuwnIarNq8hoAnMsBdHv9i/vizfF/HM1RbpGbVbRlX/rwxYyD7ndbaOs55fN5tSihCaFRWwcv0onp/PCA4cLX/EwQFFHtN8wmxK9W1o9crJvMo3BeqkYpIEsnb1IBED3slQnky3uY7OkYWQaXNgrzBgBT3hz8LZwBFLURFrDyWLeKsamHoVdflamaA6YyqQ/vnk/jLdYwem73ttvJNkjP17WBlOmCL+3nRqwU22eb0NuPnuGe4IFmaB2RqwKLFraICJCfez690SYDenFLNM5AAfT6waXFvnwjw30tYrg9f1dMDl/84gjqN1eTjxv3dnCJXgjDyKXRwSVOyvQnwM0+lBVkuEpXe07AfSQci5Va6zofKBcfHNHlsfTpFB5oNlUcCCc8qe4knbE3rabOQDqTz3Ve2k1fgvjC5v0cONXjafzHf5Meq1WtmqnF++fvM4nd0ruQ08xOwOLaT"));
// console.log("id =>", cryptoUtils.encryptString("ibnvujdbvjkvbuisbfadfp"));
// console.log("v =>", cryptoUtils.encryptString("1.1.1"));
// console.log("p =>", cryptoUtils.encryptString("documentreader.pdfreader.pdfviewer.docs.ppt"));

start();