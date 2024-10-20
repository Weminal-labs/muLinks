import { title } from "process";
import { BASE_URL } from "../utilis/config";
import { Request, Response } from "express";

export async function getMintNft(req: Request, res: Response): Promise<void> {
  try {
    const baseHref = `${BASE_URL}/api/actions/mint-nft`;
    const payload = {
      icon: "https://peach-realistic-spider-498.mypinata.cloud/ipfs/QmQoZ2jBfmCB7C1aR5ZsRdDJ3mcB5iD4Ln8mczgSNeft3Q",
      description: "Mint your own nft",
      title: "Actions Mint NFT",
      links: {
        actions: [{ label: "Mint", href: `${baseHref}/mint` }],
      },
    };
    res.json(payload);
  } catch (err) {
    res
      .status(400)
      .json({ error: (err as Error).message || "An unknown error occurred" });
  }
}
