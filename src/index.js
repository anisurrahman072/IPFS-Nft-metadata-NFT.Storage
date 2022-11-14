import { NFTStorage } from "nft.storage";
import { filesFromPath } from "files-from-path";
import path from "path";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDAxNmMyYzJGMzlFZWE2MzkxN0NDMjc0RDRCOTEwZGMwRTQ5ZTVFM0EiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY2Njg5MTYwMzI0NCwibmFtZSI6IkFuaXNfRGVtbyJ9.OtJWQxunFy2zbW5iHfBPhPfL9i0nLVOZNFU2srvzoIo";

async function main() {
  const directoryPath = path.join(__dirname, "images");
  const files = filesFromPath(directoryPath, {
    pathPrefix: path.resolve(directoryPath), // see the note about pathPrefix below
    hidden: true, // use the default of false if you want to ignore files that start with '.'
  });

  const storage = new NFTStorage({ token });

  console.log(`storing file(s) from ${path}`);
  const cid = await storage.storeDirectory(files);
  console.log({ cid });

  const status = await storage.status(cid);
  console.log(status);
}
main();
