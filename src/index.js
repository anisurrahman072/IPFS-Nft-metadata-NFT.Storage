// ############### This file successfully NFT uploaded in NFT.Storage ###############
// ############### This file successfully NFT uploaded in NFT.Storage ###############
// ############### This file successfully NFT uploaded in NFT.Storage ###############

import { NFTStorage, File } from "nft.storage";
import mime from "mime";
import fs from "fs";
import path from "path";
const NFT_STORAGE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDAxNmMyYzJGMzlFZWE2MzkxN0NDMjc0RDRCOTEwZGMwRTQ5ZTVFM0EiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY2Njg5MTYwMzI0NCwibmFtZSI6IkFuaXNfRGVtbyJ9.OtJWQxunFy2zbW5iHfBPhPfL9i0nLVOZNFU2srvzoIo";

async function storeNFT(
  imagePath,
  name,
  description,
  attributes,
  external_url
) {
  // load the file from disk
  const image = await fileFromPath(imagePath);

  // create a new NFTStorage client using our API key
  const nftstorage = new NFTStorage({ token: NFT_STORAGE_KEY });

  // call client.store, passing in the image & metadata
  return nftstorage.store({
    id: NFT_STORAGE_KEY,
    name,
    description,
    attributes,
    external_url,
    image,
  });
}

async function fileFromPath(filePath) {
  const content = await fs.promises.readFile(filePath);
  const type = mime.getType(filePath);
  console.log("BEFORE: ", content, path.basename(filePath), type);
  return new File([content], path.basename(filePath), { type });
}

async function main() {
  let imagePath = path.join(__dirname, "avatar.png");
  let name = "Blueliner Avatar";
  let description = "This is blueliner avatar of Jersey City";
  let attributes = [
    {
      trait_type: "Base",
      value: "Jersey City Base",
    },
    {
      trait_type: "Jersey",
      value: "20",
    },
    {
      trait_type: "Game",
      value: "Soccer",
    },
    {
      trait_type: "Age",
      value: "17",
    },
  ];
  let external_url = "https://blueliner.io/";
  const result = await storeNFT(
    imagePath,
    name,
    description,
    attributes,
    external_url
  );
  console.log("ANIS: ", result);
}

main();
