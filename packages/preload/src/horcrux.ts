import * as path from "path";
import { spawn } from "child_process";
import { exitCode } from "process";

interface Output {
  stdout: Buffer;
  stderr: Buffer;
  exitCode: number | null;
}

type FilePath = string;

async function runBinary(path: FilePath, args: Array<string>): Promise<Output> {
  return new Promise((resolve, reject) => {
    const process = spawn(path, args);

    const stdoutChunks: Buffer[] = [];
    const stderrChunks: Buffer[] = [];

    process.stdout.on("data", (data: Buffer) => {
      stdoutChunks.push(data);
    });

    process.stderr.on("data", (data: Buffer) => {
      stderrChunks.push(data);
    });

    process.on("error", error => {
      reject(error);
    });

    process.on("close", (code: number) => {
      const output: Output = {
        stdout: Buffer.concat(stdoutChunks),
        stderr: Buffer.concat(stderrChunks),
        exitCode: code,
      };
      resolve(output);
    });
  });
}

async function horcrux(args: Array<string>) {
  const binaryPath = path.join(__dirname, "../../../", "bin", "horcrux");
  return await runBinary(binaryPath, args);
}

export async function bind(files: Array<FilePath>) {
  // move all the files to temp directory
  // change pwd to temp
  // then execute horcrux bind
  return await horcrux(["bind"]);
}

export async function split(filePath: FilePath, threshold: number = 3, total: number = 5) {
  return await horcrux(["-n", total.toString(), "-t", threshold.toString(), "split", filePath]);
}
