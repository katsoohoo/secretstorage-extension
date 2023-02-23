// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below

import { commands, ExtensionContext, OutputChannel, SecretStorage, window } from "vscode";

let outputChannel: OutputChannel;
let secretStorage: SecretStorage;

async function allSettled() {
	outputChannel.appendLine('Using Promise.allSettled...');

	// Store secrets
    const storePromises = [];
    storePromises.push(secretStorage.store('test0', 'pass0'));
    storePromises.push(secretStorage.store('test1', 'pass1'));
    storePromises.push(secretStorage.store('test2', 'pass2'));
    const storeRes = await Promise.allSettled(storePromises);
    for (const [index, result] of storeRes.entries()) {
        if (result.status === 'fulfilled') {
            outputChannel.appendLine(`SecretStorage.store ${index} fulfilled`);
        } else {
            outputChannel.appendLine(`SecretStorage.store ${index} rejected: ${result.reason}`);
        }
    }

	// Get secrets
    const getPromises = [];
    getPromises.push(secretStorage.get('test0'));
    getPromises.push(secretStorage.get('test1'));
    getPromises.push(secretStorage.get('test2'));
    const getRes = await Promise.allSettled(getPromises);
	for (const [index, result] of getRes.entries()) {
        if (result.status === 'fulfilled') {
            outputChannel.appendLine(`SecretStorage.get ${index} fulfilled: ${result.value}`);
        } else {
            outputChannel.appendLine(`SecretStorage.get ${index} rejected: ${result.reason}`);
        }
    }

	// Delete secrets
    const deletePromises = [];
    deletePromises.push(secretStorage.delete('test0'));
    deletePromises.push(secretStorage.delete('test1'));
    deletePromises.push(secretStorage.delete('test2'));
    const deleteRes = await Promise.allSettled(deletePromises);
	for (const [index, result] of deleteRes.entries()) {
        if (result.status === 'fulfilled') {
            outputChannel.appendLine(`SecretStorage.delete ${index} fulfilled`);
        } else {
            outputChannel.appendLine(`SecretStorage.delete ${index} rejected: ${result.reason}`);
        }
    }

	outputChannel.appendLine('');
}

async function awaitPromiseWithLoop() {
	outputChannel.appendLine('Using await Promise with loop...');

	// Store secrets
    const storePromises = [];
    storePromises.push(secretStorage.store('test0', 'pass0'));
    storePromises.push(secretStorage.store('test1', 'pass1'));
    storePromises.push(secretStorage.store('test2', 'pass2'));
	for (let index = 0; index < storePromises.length; index++) {
		try {
			await storePromises[index];
			outputChannel.appendLine(`SecretStorage.store ${index} fulfilled`);
		} catch(e) {
			outputChannel.appendLine(`SecretStorage.store ${index} rejected: ${e}`);
		}
	}

	// Get secrets
    const getPromises = [];
    getPromises.push(secretStorage.get('test0'));
    getPromises.push(secretStorage.get('test1'));
    getPromises.push(secretStorage.get('test2'));
	for (let index = 0; index < getPromises.length; index++) {
		try {
			const result = await getPromises[index];
			outputChannel.appendLine(`SecretStorage.get ${index} fulfilled: ${result}`);
		} catch(e) {
			outputChannel.appendLine(`SecretStorage.get ${index} rejected: ${e}`);
		}
	}

	// Delete secrets
    const deletePromises = [];
    deletePromises.push(secretStorage.delete('test0'));
    deletePromises.push(secretStorage.delete('test1'));
    deletePromises.push(secretStorage.delete('test2'));
	for (let index = 0; index < deletePromises.length; index++) {
		try {
			await deletePromises[index];
			outputChannel.appendLine(`SecretStorage.delete ${index} fulfilled`);
		} catch(e) {
			outputChannel.appendLine(`SecretStorage.delete ${index} rejected: ${e}`);
		}
	}

	outputChannel.appendLine('');
}

async function awaitPromiseNoLoop() {
	outputChannel.appendLine('Using await Promise without loop...');

	// Store secrets
	try {
		await secretStorage.store('test0', 'pass0');
		outputChannel.appendLine(`SecretStorage.store 0 fulfilled`);
	} catch (e) {
		outputChannel.appendLine(`SecretStorage.store 0 rejected: ${e}`);
	}
	try {
		await secretStorage.store('test1', 'pass1');
		outputChannel.appendLine(`SecretStorage.store 1 fulfilled`);
	} catch (e) {
		outputChannel.appendLine(`SecretStorage.store 1 rejected: ${e}`);
	}
	try {
		await secretStorage.store('test2', 'pass2');
		outputChannel.appendLine(`SecretStorage.store 2 fulfilled`);
	} catch (e) {
		outputChannel.appendLine(`SecretStorage.store 2 rejected: ${e}`);
	}

	// Get secrets
	try {
		const result0 = await secretStorage.get('test0');
		outputChannel.appendLine(`SecretStorage.get 0 fulfilled: ${result0}`);
	} catch (e) {
		outputChannel.appendLine(`SecretStorage.get 0 rejected: ${e}`);
	}
	try {
		const result1 = await secretStorage.get('test1');
		outputChannel.appendLine(`SecretStorage.get 1 fulfilled: ${result1}`);
	} catch (e) {
		outputChannel.appendLine(`SecretStorage.get 1 rejected: ${e}`);
	}
	try {
		const result0 = await secretStorage.get('test2');
		outputChannel.appendLine(`SecretStorage.get 2 fulfilled: ${result0}`);
	} catch (e) {
		outputChannel.appendLine(`SecretStorage.get 2 rejected: ${e}`);
	}

	// Delete secrets
	try {
		await secretStorage.delete('test0');
		outputChannel.appendLine(`SecretStorage.delete 0 fulfilled`);
	} catch (e) {
		outputChannel.appendLine(`SecretStorage.delete 0 rejected: ${e}`);
	}
	try {
		await secretStorage.delete('test1');
		outputChannel.appendLine(`SecretStorage.delete 1 fulfilled`);
	} catch (e) {
		outputChannel.appendLine(`SecretStorage.delete 1 rejected: ${e}`);
	}
	try {
		await secretStorage.delete('test2');
		outputChannel.appendLine(`SecretStorage.delete 2 fulfilled`);
	} catch (e) {
		outputChannel.appendLine(`SecretStorage.delete 2 rejected: ${e}`);
	}

	outputChannel.appendLine('');
}

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export async function activate(context: ExtensionContext) {

	// Create output channel for logs
	outputChannel = window.createOutputChannel(context.extension.packageJSON.name);
	outputChannel.appendLine('Congratulations, your extension "secretstorage-extension" is now active!');

	secretStorage = context.secrets;
	// await allSettled();
	// await awaitPromise();

	let allSettledCommand = commands.registerCommand('secretstorage-extension.allSettled', async () => {
		outputChannel.show(true);
		await allSettled();
	});
	context.subscriptions.push(allSettledCommand);

	let awaitPromiseWithLoopCommand = commands.registerCommand('secretstorage-extension.awaitPromiseWithLoop', async () => {
		outputChannel.show(true);
		await awaitPromiseWithLoop();
	});
	context.subscriptions.push(awaitPromiseWithLoopCommand);

	let awaitPromiseNoLoopCommand = commands.registerCommand('secretstorage-extension.awaitPromiseNoLoop', async () => {
		outputChannel.show(true);
		await awaitPromiseNoLoop();
	});
	context.subscriptions.push(awaitPromiseNoLoopCommand);
}

// This method is called when your extension is deactivated
export function deactivate() {}
