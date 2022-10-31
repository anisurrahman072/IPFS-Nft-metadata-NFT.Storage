import { NFTStorage, File } from "nft.storage";
import mime from "mime";
import fs from "fs";
import path from "path";
const NFT_STORAGE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDAxNmMyYzJGMzlFZWE2MzkxN0NDMjc0RDRCOTEwZGMwRTQ5ZTVFM0EiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY2Njg5MTYwMzI0NCwibmFtZSI6IkFuaXNfRGVtbyJ9.OtJWQxunFy2zbW5iHfBPhPfL9i0nLVOZNFU2srvzoIo";
import { playerMetaData } from "./p";

async function storeNFT(imagePath, metaData) {
  // load the file from disk
  const image = await fileFromPath(imagePath);

  // create a new NFTStorage client using our API key
  const nftstorage = new NFTStorage({ token: NFT_STORAGE_KEY });

  // call client.store, passing in the image & metadata
  return nftstorage.store({
    id: NFT_STORAGE_KEY,
    ...metaData,
    image,
  });
}

async function fileFromPath(filePath) {
  const content = await fs.promises.readFile(filePath);
  const type = mime.getType(filePath);
  return new File([content], path.basename(filePath), { type });
}

function main() {
  const directoryPath = path.join(__dirname, "images");
  fs.readdir(directoryPath, async function (err, files) {
    if (err) {
      return console.log("Unable to scan directory: " + err);
    }

    await Promise.all(
      files.map(async (file) => {
        let imagePath = path.join(__dirname, `/images/${file}`);

        let fileNamePrefix = file.split(".")[0];
        let metaData = playerMetaData[fileNamePrefix];

        const result = await storeNFT(imagePath, metaData);

        console.log("File Name AFTEER: ", file);
        console.log("#########: ", result);
      })
    );
  });
}

main();
