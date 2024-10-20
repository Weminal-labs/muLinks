import { BASE_URL } from "../utilis/config";
import { Request, Response } from "express";

export async function getTransferMOVE(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const baseHref = `${BASE_URL}/api/actions/transfer-move`;

    const payload = {
      title: "Actions Example - Transfer Move",
      icon: "https://peach-realistic-spider-498.mypinata.cloud/ipfs/QmQoZ2jBfmCB7C1aR5ZsRdDJ3mcB5iD4Ln8mczgSNeft3Q",
      description: "Transfer MOVE to another MOVE wallet",
      links: {
        actions: [
          { label: "Send 1 MOVE", href: `${baseHref}?amount=1` },
          { label: "Send 5 MOVE", href: `${baseHref}?amount=5` },
          { label: "Send 10 MOVE", href: `${baseHref}?amount=10` },
          {
            label: "Send MOVE",
            href: `${baseHref}?amount={amount}`,
            parameters: [
              {
                name: "amount",
                label: "Enter the amount of MOVE to send",
                required: true,
              },
            ],
          },
        ],
      },
    };
    res.json(payload);
  } catch (err) {
    res
      .status(400)
      .json({ error: (err as Error).message || "An unknown error occurred" });
  }
}
