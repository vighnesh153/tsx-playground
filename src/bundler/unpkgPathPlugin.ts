import esbuild from "esbuild-wasm";

const unpkgRoot = 'https://unpkg.com';

/**
 * This plugin will map the modules to unpkg instead of searching them in
 * node_modules.
 */
export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin',
    setup: (build: esbuild.PluginBuild) => {

      // Main entry file provided to "esbuild.build" command
      build.onResolve({filter: /^index\.tsx$/}, () => {
        return {
          namespace: 'vighnesh153',
          path: 'index.tsx',
        };
      });

      // Handle relative paths
      build.onResolve({filter: /^.+\//}, (args: esbuild.OnResolveArgs) => {
        return {
          namespace: 'vighnesh153',
          path: new URL(args.path, unpkgRoot + args.resolveDir + '/').href
        };
      });

      // Handle entry point of a module
      build.onResolve({filter: /.*/}, async (args) => {
        return {
          namespace: 'vighnesh153',
          path: `${unpkgRoot}/${args.path}`,
        };
      });
    },
  }
};
