import { Request, Response } from "express";
import { UniqueChain } from '@unique-nft/sdk';
import { encodeAddress , decodeAddress , blake2AsU8a} from '@polkadot/util-crypto';
import { hexToU8a , stringToU8a , u8aConcat  } from '@polkadot/util'
export async function postMintNft(req: Request, res: Response): Promise<void> { 
    
    const { address } = req.body;   
    const a8u = hexToU8a(address)
    const data = stringToU8a("evm:");
    const res_ = blake2AsU8a(u8aConcat(data, a8u));
    const output = encodeAddress(res_, 42);
    try {
        const sdk = await UniqueChain({
            baseUrl: 'https://rest.unique.network/v2/opal',  
        })
        const id: string | number = 4505
        const transaction = await sdk.token.mintNFTs.build({
            collectionId: id,
            tokens: [
                {
                    owner: output,
                    data: { image: 'https://gateway.pinata.cloud/ipfs/QmTkhTg5S5zrqJL3UsKtyiFi8fcMT3Cao9uKtadp3Ckh7m'}
                },
              ],
        }, {
            signerAddress: output,
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