import { getTokenFromByRefreshToken } from "@/api/tokenAuth";

export default async function(error:any):Promise<void>{
  if (error.response) {
    console.log(error.response.data.error);
    if (error.response.data.error.errors[0].message === 'Invalid Credentials') {
      console.log("発火");

      await getTokenFromByRefreshToken();
    }
  }
}