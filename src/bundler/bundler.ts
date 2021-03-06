/**
 * @author Vighnesh Raut <rvighnes@amazon.com>
 */

import esbuild from "esbuild-wasm";
import { unpkgPathPlugin } from "./unpkgPathPlugin";
import {fetchPlugin} from "./fetchPlugin";

const esbuildOptions: esbuild.BuildOptions & {write: false} = {
  // Different entry points will lead to different output files.
  // build script only works on input files and not string inputs
  entryPoints: ['index.tsx'],

  // All the dependencies and their dependencies should be bundled in
  // a single file
  bundle: true,

  // Don't write to any file and keep the output in memory buffers
  write: false,

  // Replace global identifiers with constant expressions
  define: {
    'process.env.NODE_ENV': '"production"',
    global: 'window',
  },
};

let initialized = false;

export const bundle = async (inputCode: string) => {
  if (!initialized) {
    await esbuild.initialize({wasmURL: 'https://unpkg.com/esbuild-wasm@0.14.23/esbuild.wasm'});
    initialized = true;
  }

  try {
    const buildResult = await esbuild.build({
      ...esbuildOptions,

      // To map the modules to be fetched from unpkg
      plugins: [
        // Maps the paths to unpkg
        unpkgPathPlugin(),

        // Fetches the module content from unpkg
        fetchPlugin(inputCode)
      ],
    });

    return {
      outputCode: buildResult.outputFiles[0].text,
      error: '',
    };
  } catch (error: any) {
    return {
      outputCode: '',
      error: error?.message || 'Something went wrong',
    };
  }
};
