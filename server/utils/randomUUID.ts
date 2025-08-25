
import { randomUUIDv7 } from "bun";
import { CipherConfig } from "../src/config/envs";


const currentKey = CipherConfig.bcrypt_cipher;
if (!currentKey) {
    console.error("Invalid KEY");
}

export async function EncryptPass(password: string): Promise<string> {
    const hashPass = await Bun.password.hash(password, {
        algorithm: "bcrypt",
        cost: 12,
    })
    return hashPass;
}

export async function VerifyPass(password: string, hash: string): Promise<boolean> {
    const isMatch = await Bun.password.verify(password, hash);
    return isMatch;
}

type UUIDFormat = "hex";
type SegmentLimit = 0 | 1 | 2 | 3 | 4;

export async function UUIDHex(GenType: UUIDFormat = "hex", SegmentLength: SegmentLimit = 2): Promise<string> {
    const id = randomUUIDv7(GenType) || "";
    if (!id) {
        console.error("Something with wrong generating UUID HEX");
    }
    const idSegment = id.split("-")

    return idSegment.slice(SegmentLength, 5).join("-")
}
