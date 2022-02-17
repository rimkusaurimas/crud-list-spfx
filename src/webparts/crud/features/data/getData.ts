import { WebPartContext } from "@microsoft/sp-webpart-base";
import {
  SPHttpClient,
  SPHttpClientResponse,
  ISPHttpClientOptions,
} from "@microsoft/sp-http";
import { sp } from "@pnp/sp";
const getData = async (context: WebPartContext, webUrl: string) => {
  sp.setup({
    spfxContext: context,
  });
  const rest_api_url = `${
    webUrl && webUrl !== "" ? webUrl : context.pageContext.web.absoluteUrl
  }/_api/web/lists/GetByTitle('arm_listas')/Items?$select=*,userinis/Title&$expand=userinis`;

  try {
    const response = await context.spHttpClient.get(
      rest_api_url,
      SPHttpClient.configurations.v1
    );
    const responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.log("error in getEmailConfig", error);
    return null;
  }
};

export default getData;
