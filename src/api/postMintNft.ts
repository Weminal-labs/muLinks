import { Request, Response } from "express";
import { UniqueChain } from '@unique-nft/sdk';
import { encodeAddress , decodeAddress } from '@polkadot/util-crypto';

export async function postMintNft(req: Request, res: Response): Promise<void> { 
    const { address } = req.body;
    try {
        const sdk = await UniqueChain({
            baseUrl: 'https://rest.unique.network/v2/opal',  
        })
        const decodedAddress = decodeAddress(address);
        const substrateAddress = encodeAddress(decodedAddress);
        console.log(substrateAddress)

        const id: string | number = 4505
        const transaction = await sdk.token.mintNFTs.build({
            collectionId: id,
            tokens: [
                {
                    owner: substrateAddress,
                    data: { image: 'https://gateway.pinata.cloud/ipfs/QmTkhTg5S5zrqJL3UsKtyiFi8fcMT3Cao9uKtadp3Ckh7m'}
                },
              ],
        }, {
            signerAddress: substrateAddress,
            nonce: undefined,  
            mortalLength: undefined
        }
        )
        const payload = {
            transaction: transaction.signerPayloadRaw,
            message: `Constructed transaction to send`,
        };
        res.json(payload);
    }
    catch (error) {
        console.error('Error building transaction:', error);
    }
} 