# secretstorage-extension README

This is an example VS Code extension to demonstrate an issue with VS Code's SecretStorage API when running in Red Hat OpenShift Dev Spaces.

This extension implements 3 different methods to store, get, and delete secrets using VS Code's SecretStorage API. Each method can be invoked with a VS Code command and the output will be printed to the `secretstorage-extension` output channel.

## Steps to recreate
1. Build VSIX locally.
    1. Run `npm ci`
    1. Run `npm run package`
1. Install VSIX in VS Code running on Red Hat OpenShift Dev Spaces.
    1. In RedHat OpenShift Dev Spaces, create an "Empty Workspace".
    1. In the workspace VS Code, open the Command Palette.
    1. Run the command "Extensions: Install from VSIX".
    1. Click the "Show Local" button and find the VSIX file on your local machine.
1. Recreate issue.
    1. With `secretstorage-extension` installed, open the Command Palette and run one of the following commands:
        - `secretstorage-extension.allSettled` - issue occurs
        - `secretstorage-extension.awaitPromiseWithLoop` - issue occurs
        - `secretstorage-extension.awaitPromiseNoLoop` - issue does not occur
        > **Note:** The issue only occurs on the first calls to SecretStorage so you can only run one command per workspace. You'll need to create a new workspace to try another command.
    1. The `secretstorage-extension` output channel will open and logs will be printed.

## Logs
### `secretstorage-extension.allSettled`
The issue occurs when attempting to use `SecretStorage.get` for the first time.
```
Congratulations, your extension "secretstorage-extension" is now active!
Using Promise.allSettled...
SecretStorage.store 0 fulfilled
SecretStorage.store 1 fulfilled
SecretStorage.store 2 fulfilled
SecretStorage.get 0 fulfilled: undefined
SecretStorage.get 1 fulfilled: undefined
SecretStorage.get 2 fulfilled: pass2
SecretStorage.delete 0 fulfilled
SecretStorage.delete 1 fulfilled
SecretStorage.delete 2 fulfilled
```

### `secretstorage-extension.awaitPromiseWithLoop`
The issue occurs when attempting to use `SecretStorage.get` for the first time.
```
Congratulations, your extension "secretstorage-extension" is now active!
Using await Promise with loop...
SecretStorage.store 0 fulfilled
SecretStorage.store 1 fulfilled
SecretStorage.store 2 fulfilled
SecretStorage.get 0 fulfilled: undefined
SecretStorage.get 1 fulfilled: undefined
SecretStorage.get 2 fulfilled: pass2
SecretStorage.delete 0 fulfilled
SecretStorage.delete 1 fulfilled
SecretStorage.delete 2 fulfilled
```

### `secretstorage-extension.awaitPromiseNoLoop`
The issue does not occur.
```
Congratulations, your extension "secretstorage-extension" is now active!
Using await Promise without loop...
SecretStorage.store 0 fulfilled
SecretStorage.store 1 fulfilled
SecretStorage.store 2 fulfilled
SecretStorage.get 0 fulfilled: pass0
SecretStorage.get 1 fulfilled: pass1
SecretStorage.get 2 fulfilled: pass2
SecretStorage.delete 0 fulfilled
SecretStorage.delete 1 fulfilled
SecretStorage.delete 2 fulfilled
```