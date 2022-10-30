import fs from "fs";
import path from "path";
import { NFTStorage, File, Blob } from "nft.storage";
import { type } from "os";

async function ff() {
  const NFT_STORAGE_TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDAxNmMyYzJGMzlFZWE2MzkxN0NDMjc0RDRCOTEwZGMwRTQ5ZTVFM0EiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY2Njg5MTYwMzI0NCwibmFtZSI6IkFuaXNfRGVtbyJ9.OtJWQxunFy2zbW5iHfBPhPfL9i0nLVOZNFU2srvzoIo";
  const client = new NFTStorage({ token: NFT_STORAGE_TOKEN });

  //   const image = fs.readFileSync(path.join(__dirname, "cuteCat.png"));

  // const image = new File(["Hi"], "nft.png", {
  //   type: "image/png",
  // });

  const nft = {
    image: new File(["This is an NFT Image"], "car.png", "image/png"),
    name: "Storing the World's Most Valuable Virtual Assets with NFT.Storage",
    description: "The metaverse is here. Where is it all being stored?",
    properties: {
      type: "blog-post",
      authors: [{ name: "Anis" }],
    },
  };

  const metadata = await client.store(nft);

  console.log("NFT data stored!");
  console.log("Metadata URI: ", metadata.url);
}
ff();
