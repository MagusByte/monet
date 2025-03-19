# Release Procedure

1. Ensure everything is commited
2. Ensure everything is tested (`npm run test`)
2. Ensure everything is build (`npm run build`)
3. Bump the version
   1. Update patch (`npm version major`) (`1.2.3` -> `2.0.0`)
   2. Update patch (`npm version minor`) (`1.2.3` -> `1.3.0`)
   3. Update patch (`npm version patch`) (`1.2.3` -> `1.2.4`)
   4. Update patch (`npm version prerelease`) (`1.2.3` -> `1.2.3-0`)
4. Push it
5. Send to npm
