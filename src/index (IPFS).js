import fs from "fs";
import path from "path";
import { create } from "ipfs-http-client";

async function ipfsLoad() {
  //   const { create } = await import("ipfs-http-client");
  const file = fs.readFileSync(path.join(__dirname, "cuteCat.png"));
  let ipfs = await create({
    url: "https://api.pinata.cloud/psa",
    repo: "file-path" + Math.random(),
  });
  const { cid } = await ipfs.add(file);
  const url = `https://gateway.pinata.cloud/ipfs/${cid.string}`;
  console.log("THE", url);
}

ipfsLoad();
