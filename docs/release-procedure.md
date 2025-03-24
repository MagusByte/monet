# Release Procedure

1. Ensure everything is commited
2. Ensure everything is tested (`npm run test`)
3. Ensure everything is build (`npm run build`)
4. Merge it to `main` branch
5. Bump the version (this should only be done in the main branch)
   1. Update patch (`npm version major`) (`1.2.3` -> `2.0.0`)
   2. Update patch (`npm version minor`) (`1.2.3` -> `1.3.0`)
   3. Update patch (`npm version patch`) (`1.2.3` -> `1.2.4`)
   4. Update patch (`npm version prerelease`) (`1.2.3` -> `1.2.3-0`)
6. Push it `git push --tags`
7. Go to https://github.com/MagusByte/monet/releases/new to create a new release
   1. Or alternatively send it to npm manually (`npm publish --access public`)
