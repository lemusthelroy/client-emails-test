var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// .netlify/functions-internal/emails/index.ts
var emails_exports = {};
__export(emails_exports, {
  getEmailFromPath: () => getEmailFromPath,
  handler: () => handler
});
module.exports = __toCommonJS(emails_exports);
var import_fs = __toESM(require("fs"));
var import_path = require("path");
var import_https = __toESM(require("https"));
var getEmailFromPath = (path) => {
  let fileFound;
  import_fs.default.readdirSync(path).forEach((file) => {
    if (fileFound !== void 0) {
      return;
    }
    const fileType = file.split(".").pop();
    const filename = file.replace(/^.*[\\/]/, "").split(".")[0];
    if (filename === "index") {
      if (fileType === "mjml" || fileType === "html") {
        const fileContents = import_fs.default.readFileSync(`${path}/${file}`, "utf8");
        fileFound = { file: fileContents, type: fileType };
      }
    }
  });
  return fileFound;
};
var allowedPreviewEnvironments = ["deploy-preview", "branch-deploy", "dev"];
var getMissingConfig = () => {
  var _a;
  const missingConfig = {};
  let validConfig = true;
  if (!process.env.NETLIFY_EMAILS_PROVIDER) {
    missingConfig.NETLIFY_EMAILS_PROVIDER = true;
    validConfig = false;
  }
  if (!process.env.NETLIFY_EMAILS_PROVIDER_API_KEY) {
    missingConfig.NETLIFY_EMAILS_PROVIDER_API_KEY = true;
    validConfig = false;
  }
  if (((_a = process.env.NETLIFY_EMAILS_PROVIDER) == null ? void 0 : _a.toLowerCase()) === "mailgun") {
    if (!process.env.NETLIFY_EMAILS_MAILGUN_HOST_REGION) {
      missingConfig.NETLIFY_EMAILS_MAILGUN_HOST_REGION = true;
      validConfig = false;
    }
    if (!process.env.NETLIFY_EMAILS_MAILGUN_DOMAIN) {
      missingConfig.NETLIFY_EMAILS_MAILGUN_DOMAIN = true;
      validConfig = false;
    }
  }
  if (!process.env.NETLIFY_EMAILS_SECRET) {
    missingConfig.NETLIFY_EMAILS_SECRET = true;
    validConfig = false;
  }
  return validConfig ? false : missingConfig;
};
var makeRenderTemplateRequest = async (fileFound, parameters) => {
  const renderRequest = {
    template: fileFound.file,
    siteId: process.env.SITE_ID,
    type: fileFound.type,
    showParameterDictionary: false,
    parameters
  };
  return await new Promise((resolve, reject) => {
    const renderReq = import_https.default.request({
      hostname: "netlify-integration-emails.netlify.app",
      path: "/.netlify/functions/render",
      method: "POST",
      headers: {
        "site-id": process.env.SITE_ID,
        "Content-Type": "application/json"
      }
    }, (res) => {
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => {
        const response = JSON.parse(data);
        resolve(__spreadProps(__spreadValues({}, response), { status: res.statusCode ?? 500 }));
      });
    });
    renderReq.on("error", (error) => {
      return reject(error);
    });
    renderReq.write(JSON.stringify(renderRequest));
    renderReq.end();
  });
};
var makeSendEmailRequest = async (mailRequest) => {
  return await new Promise((resolve, reject) => {
    const sendReq = import_https.default.request({
      hostname: "netlify-integration-emails.netlify.app",
      path: "/.netlify/functions/send",
      method: "POST",
      headers: {
        "site-id": process.env.SITE_ID,
        "Content-Type": "application/json"
      }
    }, (res) => {
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => {
        const response = JSON.parse(data);
        const sendEmailResponse = {
          message: response.message,
          status: res.statusCode ?? 500
        };
        resolve(sendEmailResponse);
      });
    });
    sendReq.on("error", (error) => {
      return reject(error);
    });
    sendReq.write(JSON.stringify(mailRequest));
    sendReq.end();
  });
};
var handler = async (event) => {
  var _a;
  console.log(`Email handler received email request from path ${event.rawUrl}`);
  const missingConfig = getMissingConfig();
  const providerApiKey = process.env.NETLIFY_EMAILS_PROVIDER_API_KEY;
  const providerName = process.env.NETLIFY_EMAILS_PROVIDER;
  const emailTemplatesDirectory = process.env.NETLIFY_EMAILS_DIRECTORY ?? "./emails";
  const emailPath = (_a = event.rawUrl.match(/emails\/([A-z-]*)[?]?/)) == null ? void 0 : _a[1];
  if (missingConfig) {
    const missingConfigString = Object.keys(missingConfig).map((key) => {
      if (missingConfig[key]) {
        return key;
      }
      return "";
    }).join(", ");
    console.error(`Email handler detected missing configuration: ${missingConfigString}`);
    if (event.httpMethod === "POST") {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: `The emails integration is not configured correctly. We have detected the following configuration is missing: ${missingConfigString}`
        })
      };
    }
    return {
      statusCode: 200,
      body: `
          <html>
            <head>
            <link rel="stylesheet" href="https://netlify-integration-emails.netlify.app/main.css">
            <script>
              missingConfig = ${JSON.stringify(missingConfig)}
              siteId = ${JSON.stringify(process.env.SITE_ID)}
              templateName = ${JSON.stringify(emailPath)}
            <\/script>
            <script defer src='https://netlify-integration-emails.netlify.app/index.js'><\/script>
            </head>
            <div id='app'></div>
          </html>
          `
    };
  }
  if (event.httpMethod === "GET") {
    const showEmailPreview = allowedPreviewEnvironments.includes(process.env.CONTEXT);
    if (!showEmailPreview) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: `Email previews are not allowed in the ${process.env.CONTEXT} environment`
        }),
        headers: {
          "Content-Type": "text/plain"
        }
      };
    }
    if (!import_fs.default.existsSync(emailTemplatesDirectory)) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: `Email templates directory ${emailTemplatesDirectory} does not exist`
        }),
        headers: {
          "Content-Type": "text/plain"
        }
      };
    }
    let emailTemplate;
    if (emailPath !== void 0) {
      if (!import_fs.default.existsSync((0, import_path.join)(emailTemplatesDirectory, emailPath))) {
        console.log(`Preview path is not a valid email path - preview path received: ${emailPath}`);
        return {
          statusCode: 200,
          body: `
              <html>
                <head>
                <link rel="stylesheet" href="https://netlify-integration-emails.netlify.app/main.css">
                <script>
                  missingTemplate = ${JSON.stringify(true)}
                  siteId = ${JSON.stringify(process.env.SITE_ID)}
                  templateName = ${JSON.stringify(emailPath)}
                  emailDirectory = ${JSON.stringify(emailTemplatesDirectory)}
                <\/script>
                <script defer src='https://netlify-integration-emails.netlify.app/index.js'><\/script>
                </head>
                <div id='app'></div>
              </html>
              `,
          headers: {
            "Content-Type": "text/html"
          }
        };
      }
      emailTemplate = getEmailFromPath((0, import_path.join)(emailTemplatesDirectory, emailPath));
      if (!emailTemplate) {
        console.log(`No email template found for preview path - preview path received: ${emailPath}. Please ensure that an index.mjml or index.html file exists in the email template folder.`);
        return {
          statusCode: 200,
          body: `
              <html>
                <head>
                <link rel="stylesheet" href="https://netlify-integration-emails.netlify.app/main.css">
                <script>
                  missingTemplate = ${JSON.stringify(true)}
                  siteId = ${JSON.stringify(process.env.SITE_ID)}
                  templateName = ${JSON.stringify(emailPath)}
                  emailDirectory = ${JSON.stringify(emailTemplatesDirectory)}
                <\/script>
                <script defer src='https://netlify-integration-emails.netlify.app/index.js'><\/script>
                </head>
                <div id='app'></div>
              </html>
              `,
          headers: {
            "Content-Type": "text/html"
          }
        };
      }
    }
    const validEmailPaths = [];
    import_fs.default.readdirSync(emailTemplatesDirectory).forEach((template) => {
      if (import_fs.default.existsSync((0, import_path.join)(emailTemplatesDirectory, template, "index.html")) || import_fs.default.existsSync((0, import_path.join)(emailTemplatesDirectory, template, "index.mjml"))) {
        validEmailPaths.push(template);
      }
    });
    return {
      statusCode: 200,
      body: `
        <html>
          <head>
          <link rel="stylesheet" href="https://netlify-integration-emails.netlify.app/main.css">
          <script>
            emailPaths =  ${JSON.stringify(validEmailPaths)}
            template = ${JSON.stringify(emailTemplate == null ? void 0 : emailTemplate.file)}
            templateType = ${JSON.stringify(emailTemplate == null ? void 0 : emailTemplate.type)}
            siteId = ${JSON.stringify(process.env.SITE_ID)}
            siteName = ${JSON.stringify(process.env.SITE_NAME)}
            provider = ${JSON.stringify(providerName)}
            emailDirectory = ${JSON.stringify(emailTemplatesDirectory)}
            secret = ${JSON.stringify(process.env.NETLIFY_EMAILS_SECRET)}
            url = ${JSON.stringify(process.env.URL)}
            templateName = ${JSON.stringify(emailPath)}
          <\/script>
          <script defer src='https://netlify-integration-emails.netlify.app/index.js'><\/script>
          </head>
          <div id='app'></div>
        </html>
        `,
      headers: {
        "Content-Type": "text/html"
      }
    };
  }
  if (event.httpMethod === "POST") {
    if (!process.env.NETLIFY_EMAILS_SECRET) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "Secret not set in NETLIFY_EMAILS_SECRET"
        })
      };
    }
    if (event.headers["netlify-emails-secret"] !== process.env.NETLIFY_EMAILS_SECRET) {
      return {
        statusCode: 403,
        body: JSON.stringify({
          message: "Secret does not match"
        })
      };
    }
    if (!import_fs.default.existsSync(emailTemplatesDirectory)) {
      return {
        statusCode: 404,
        body: JSON.stringify({
          message: `Email templates directory ${emailTemplatesDirectory} does not exist`
        })
      };
    }
    if (!event.body) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "Request body required"
        })
      };
    }
    const requestBody = JSON.parse(event.body);
    if (!requestBody.from) {
      console.log("From address is required");
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "From address is required"
        })
      };
    }
    if (!requestBody.to) {
      console.log("To address is required");
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "To address is required"
        })
      };
    }
    if (!emailPath) {
      console.error(`Email path is not specified`);
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "You have not specified the email you wish to send in the URL"
        })
      };
    }
    const fullEmailPath = `${emailTemplatesDirectory}/${emailPath}`;
    const emailPathExists = import_fs.default.existsSync(fullEmailPath);
    if (!emailPathExists) {
      console.error(`Email path does not exist: ${fullEmailPath}`);
      return {
        statusCode: 404,
        body: JSON.stringify({
          message: `Email path ${fullEmailPath} does not exist`
        })
      };
    }
    const email = getEmailFromPath(fullEmailPath);
    if (!email) {
      console.error(`No email file found in directory: ${fullEmailPath}`);
      return {
        statusCode: 404,
        body: JSON.stringify({
          message: `No email file found in directory: ${fullEmailPath}`
        })
      };
    }
    const renderResponseJson = await makeRenderTemplateRequest(email, requestBody.parameters);
    if (renderResponseJson.error ?? !renderResponseJson.html) {
      console.error(`Error rendering email template: ${JSON.stringify(renderResponseJson)}`);
      return {
        statusCode: renderResponseJson.status,
        body: JSON.stringify({
          message: `Error rendering email template${renderResponseJson.error ? `: ${renderResponseJson.error}` : ""}`
        })
      };
    }
    const renderedTemplate = renderResponseJson.html;
    const configuration = {
      providerName,
      apiKey: providerApiKey,
      mailgunDomain: process.env.NETLIFY_EMAILS_MAILGUN_DOMAIN,
      mailgunHostRegion: process.env.NETLIFY_EMAILS_MAILGUN_HOST_REGION
    };
    const request = {
      from: requestBody.from,
      to: requestBody.to,
      cc: requestBody.cc,
      bcc: requestBody.bcc,
      subject: requestBody.subject ?? "",
      html: renderedTemplate,
      attachments: requestBody.attachments
    };
    const { message, status } = await makeSendEmailRequest({
      configuration,
      request
    });
    if (status !== 200) {
      console.error(`Error sending email: ${message}`);
    }
    return {
      statusCode: status,
      body: JSON.stringify({
        message
      })
    };
  }
  return {
    statusCode: 405,
    body: JSON.stringify({
      message: "Method not allowed"
    })
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getEmailFromPath,
  handler
});
//# sourceMappingURL=index.js.map
