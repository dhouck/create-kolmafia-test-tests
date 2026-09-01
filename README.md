# create-kolmafia-test-tests

Testing the test PR (and its github actions)

# Development

First turn your TypeScript files into something KoLmafia can understand by running

```bash
yarn run build
```

Then you can automatically create symlinks to your built files by running

```bash
yarn run install-mafia
```

When you're developing you can have your files automatically rebuild by keeping

```bash
yarn run watch
```

running in the background. If you've already built symlinks, your up-to-date script can be run instantly by entering `create-kolmafia-test-tests` into the KoLmafia CLI.

Here is a sentence.  Here is another sentence separated by two spaces.

* Here is a list.
* It uses asterisks for bullets.
  - This nested lists uses hyphens though
  - I donʼt think other things are supported?
